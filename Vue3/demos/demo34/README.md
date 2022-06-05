# 更新 element 的 children - 双端对比 diff 算法（2）

实现删除多余节点和更新老节点的功能

```ts
let s1 = i
let s2 = i
const toBePatched = e2 - s2 + 1
let patched = 0
const keyToNewIndexMap = new Map()
for(let i = s2; i <= e2; i++){
    const nextChild = c2[i]
    keyToNewIndexMap.set(nextChild.key, i)
}

for(let i = s1; i <= e1; i++){
    const prevChild = c1[i]
    if(patched >= toBePatched){
        hostRemove(prevChild.el)
        continue
    }
    let newIndex
    if(prevChild.key){
        newIndex = keyToNewIndexMap.get(prevChild.key)
    } else {
        for(let j = s2; j <= e2; j++){
            if(isSomeVNodeType(prevChild, c2[j])){
                newIndex = j
                break
            }
        }
    }
    if(newIndex === undefined){ // 老节点在新节点里面不存在
        hostRemove(prevChild.el)
    } else { // 老节点在新节点里面存在故是更新逻辑，不需要锚点
        patch(prevChild, c2[newIndex],container,parentComponent,null)
        patched++
    }
}
```

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


