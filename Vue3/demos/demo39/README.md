# 实现解析 element


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
    return createRoot(parseChildren(context))
}

function parseChildren(context:ParserContext){
    const nodes:any[] = []
    let node
    const s = context.source
    if(s.startsWith('{{')){
        node = parseInterplation(context)
    } else if(s[0] === '<'){ // 判断是否是<开头
        if(/[a-z]/i.test(s[1])){ // 如果即是<开头第二个字符又是字母那么判定为元素
           node = parseElement(context) // 开始解析元素
        }
    }
    nodes.push(node)


    return nodes
}

// 解析元素
function parseElement(context: ParserContext) {
    const element = parseTag(context, TagType.TagStart)
    parseTag(context, TagType.TagEnd)
    return element
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
        tag: 'div'
    }
}



function parseInterplation(context:ParserContext){
    // 折叠
}

function advaceBy(context:ParserContext, length:number){
    // 折叠
}

function createParserContext(content:string):ParserContext{
    // 折叠
}

function createRoot(children){
    // 折叠
}
```


## Run

```bash
yarn install
```

```bash
yarn test --watch
```


