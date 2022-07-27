# 实现解析 

parse.ts
```ts
function parseChildren(context:ParserContext){
    const nodes:any[] = []
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


    return nodes
}

function parseText(context:any){
    const content = parseTextData(context, context.source.length)
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
```

## Run

```bash
yarn install
```

```bash
yarn test --watch
```


