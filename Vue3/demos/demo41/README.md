# 实现解析三种联合类型 template

parse.ts
```ts
import { NodeTypes } from "./ast"

const enum TagType {
    TagStart,
    TagEnd
}

interface ParserContext {
    source:string
}

export function baseParse(content:string){
    const context = createParserContext(content)
    return createRoot(parseChildren(context, []))
}

function parseChildren(context:ParserContext, ancestors){
    const nodes:any[] = []

    while(!isEnd(context, ancestors)){
        let node
        const s = context.source
        if(s.startsWith('{{')){
            node = parseInterplation(context)
        } else if(s[0] === '<'){
            if(/[a-z]/i.test(s[1])){
               node = parseElement(context, ancestors)
            }
        }
    
        if(!node){
            node = parseText(context)
        }
    
        nodes.push(node)
    }

    return nodes
}

function isEnd(context, ancestors){
    // 2、当前遇到结束标签的时候
    const s = context.source
    if(s.startsWith('</')){
        for(let i = ancestors.length -1; i >= 0; i--){
            const tag = ancestors[i].tag
            if(startsWithEndTagOpen(s, tag)){
                return true
            }
        }
    }
    // 1、source 有值的时候
    return !s
}

function parseText(context:any){
    let endIndex = context.source.length
    let endTokens = ['<','{{']
    for(const endToken of endTokens){
        const index = context.source.indexOf(endToken)
        if(index !== -1 && endIndex > index){
            endIndex = index
        }
    }

    const content = parseTextData(context, endIndex)
    return {
        type: NodeTypes.TEXT,
        content,
    }   
}

function parseTextData(context, length){
    // 1.获取当前内容
    const content = context.source.slice(0, length)
    // 推进
    advaceBy(context, content.length)
    return content
}

function parseElement(context: ParserContext, ancestors:any[]) {
    const element:any = parseTag(context, TagType.TagStart)
    ancestors.push(element)
    element.children  = parseChildren(context, ancestors)
    ancestors.pop()
    
    if(startsWithEndTagOpen(context.source,element.tag)){
        parseTag(context, TagType.TagEnd)
    } else {
        if(context.source){
            throw new Error(`缺少结束标签：${element.tag}`)
        }
    }
    
    return element
}

function startsWithEndTagOpen(source,tag){
    return source.startsWith("</") && source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() 
}


function parseTag(context:ParserContext, type: TagType){
    // 解析 tag

    // 删除处理好的代码
    const match = /^<\/?([a-z]*)/i.exec(context.source)

    let tag = ''
    if (match){
        tag = match[1]
        advaceBy(context,match[0].length)
        advaceBy(context,1)
    }
    
    if(type === TagType.TagEnd){
        return
    }

    return {
        type: NodeTypes.ELEMENT,
        tag: tag
    }
}



function parseInterplation(context:ParserContext){

    const openDelimiter = '{{'

    const closeDelimiter = '}}'

    const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

    advaceBy(context, openDelimiter.length)

    const rawContentLength = closeIndex - openDelimiter.length

    const rawContent = parseTextData(context,rawContentLength)

    const content = rawContent.trim()

    advaceBy(context, rawContentLength + closeDelimiter.length)

    return {
        type: NodeTypes.INTERPOLATION,
        content:{
            type:NodeTypes.SIMPLE_EXPRETION,
            content,
        }
    }
}

function advaceBy(context:ParserContext, length:number){
    context.source = context.source.slice(length)
}

function createParserContext(content:string):ParserContext{
    return {
        source:content
    }
}

function createRoot(children){
    return {
        children,
    }
}


```
parse.spec.ts
```ts
    describe('hello world',()=>{
        const ast = baseParse("<div>hi,{{message}}</div>")
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.ELEMENT,
            tag: 'div',
            children:[
                {
                    type: NodeTypes.TEXT,
                    content: 'hi,' 
                },
                {
                    type: NodeTypes.INTERPOLATION,
                    content: {
                        type: NodeTypes.SIMPLE_EXPRETION,
                        content: 'message'
                    }
                }
            ]
        })
    })

    test('Nesteds element',()=>{
        const ast = baseParse("<div><p>hi</p>{{message}}</div>")
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.ELEMENT,
            tag: 'div',
            children:[
                {
                    type: NodeTypes.ELEMENT,
                    tag: 'p',
                    children:[
                        {
                            type:NodeTypes.TEXT,
                            content:'hi'
                        }
                    ]
                },
                {
                    type: NodeTypes.INTERPOLATION,
                    content: {
                        type: NodeTypes.SIMPLE_EXPRETION,
                        content: 'message'
                    }
                }
            ]
        })
    })

    test('should throw error when lack end tag',()=>{
        expect(()=>{
            baseParse('<div><span></div>')
        }).toThrow('缺少结束标签：span');
    })
```

## Run

```bash
yarn install
```

```bash
yarn test --watch
```


