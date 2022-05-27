# 更新 element 的 children - 双端对比 diff 算法（1）

```ts
    function patchKeyedChildren(c1,c2,container,parentComponent,parentAnchor){
        let i = 0
        const l2 = c2.length
        let e1 = c1.length - 1
        let e2 = l2 - 1

        function isSomeVNodeType(n1,n2){
            return n1.type === n2.type && n1.key === n2.key
        }
        // 左侧
        while(i <= e1 && i<= e2){
            const n1 = c1[i]
            const n2 = c2[i]
            if(isSomeVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,parentAnchor)
            } else {
                break
            }
            i++
        }
        console.log('i=>',i)
        // 右侧
        while(i <= e1 && i <= e2){
            const n1 = c1[e1]
            const n2 = c2[e2]
            if(isSomeVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,parentAnchor)
            } else {
                break
            }
            e1--
            e2--
        }
        console.log('e1=>',e1,'e2=>',e2)

        // 新的比老的多
        if(i > e1){ 
            // 当出现 i 大于 e1 的时候
            // 有可能是 i 增加 e1 减小 也就是 元素新增在右边
            // 也有可能是 i 不增加即等于0 但是 e1 减小到为负数 元素增加在左边
            if(i <= e2){
                const nextPos = e2 + 1
                let anchor = nextPos < l2 ? c2[nextPos].el : null
                while(i<=e2){
                    patch(null, c2[i], container, parentComponent, anchor)
                    i++
                }
               
            }
        } else if(i > e2){ // 老的比新的多
            while(i <= e1){
                hostRemove(c1[i].el)
                i++
            }
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


