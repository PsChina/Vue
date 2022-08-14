# 实现transfrom功能

index.js
```js
export function transform(root, options){
    const context = createTransformContext(root, options)
    // 1. 遍历 - 深度优先搜索
    traverseNode(root, context)
    // 2. 修改 text content
}

function createTransformContext(root:any, options:any):any{
    const context = {
        root,
        nodeTransforms:options.nodeTransforms || []
    }
    return context
}


function traverseNode(node:any, context:any){
    const { nodeTransforms } = context
    for(const transform of nodeTransforms) {
        transform(node) 
    }
    traversChildren(node, context)
}

function traversChildren(node, context){
    const children = node.children
    if(children){
        for(let i = 0; i < children.length; i++){
            const node = children[i]
            traverseNode(node, context)
        }
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


