# 实现解析插值功能
ast.ts
```ts
export const enum NodeTypes {
    INTERPOLATION,
    SIMPLE_EXPRETION,
} 
```

parse.ts
```ts
import { NodeTypes } from "./ast"

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
    if(context.source.startsWith('{{')){
        node = parseInterplation(context)
    }
    nodes.push(node)


    return nodes
}

function parseInterplation(context:ParserContext){

    const openDelimiter = '{{'

    const closeDelimiter = '}}'

    const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

    advaceBy(context, openDelimiter.length)

    const rawContentLength = closeIndex - openDelimiter.length

    const rawContent = context.source.slice(0, rawContentLength)

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

## Run

```bash
yarn install
```

```bash
yarn test --watch
```


