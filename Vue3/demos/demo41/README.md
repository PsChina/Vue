# 实现解析三种联合类型 template

parse.ts
```ts
function parseChildren(context:ParserContext){
    const nodes:any[] = []

    while(!isEnd(context)){
        let node
        const s = context.source
        if(s.startsWith('{{')){
            node = parseInterplation(context)
        } else if(s[0] === '<'){
            if(/[a-z]/i.test(s[1])){
               node = parseElement(context)
            }
        }
    
        if(!node){
            node = parseText(context)
        }
    
        nodes.push(node)
    }

    return nodes
}

function isEnd(context){
    // 2、当前遇到结束标签的时候
    const s = context.source
    if(s.startsWith('</div')){ // 暂时伪实现
        return true
    }
    // 1、source 有值的时候
    return !s
}

function parseText(context:any){
    let endIndex = context.source.length
    let endToken = '{{'
    const index = context.source.indexOf(endToken) 
    if(index !== -1 ){
        endIndex = index
    }

    const content = parseTextData(context, endIndex)
    return {
        type: NodeTypes.TEXT,
        content,
    }   
}

function parseElement(context: ParserContext) {
    const element:any = parseTag(context, TagType.TagStart)

    const children = parseChildren(context)

    if(children[0]){
        element.children = children
    }

    parseTag(context, TagType.TagEnd)
    return element
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
```

## Run

```bash
yarn install
```

```bash
yarn test --watch
```


