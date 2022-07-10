# 更新 element 的 children - 双端对比 diff 算法（3）

实现删除多余节点和更新老节点的功能


最长递增子序列
```ts
// 最长递增子序列
function LIS(nums) {
    // 初始化动态规划容器，获取数据总长度
    const dp = [1], { length } = nums
    // 如果数据不存在返回空数组
    if (!length) {
        return []
    }
    // 定义最大子序列所在的动态规划数组中的位置
    let maxIndex = 0
    // 定义子序列动态规划容器
    const subArrayDP = [[nums[0]]]
    // 开始遍历整个数组
    for (let i = 1; i < length; i++) {
        // 获取当前数据
        const item = nums[i]
        // 初始化动态规划数据默认当前数据不递增当前递增数列长度为1
        dp[i] = 1
        // 定义当前动态规划数组默认递增子序列为本身
        subArrayDP[i] = [item]
        // 定义查找最长递增序列的索引默认为当前序列为最大序列
        let _maxIndex = i
        // 开始查找当前的数和之前的所有数所能组成的最大递增子序列
        for (let j = 0; j < i; j++) {
            // 获取子序列中的每一个元素
            const subArrItem = nums[j]
            // 当 当前元素比子元素大说明最长子序列可能增大了一
            if (item > subArrItem) {
                // 当当前子序列确实比外层循环的当前序列大时更新
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1
                    _maxIndex = j
                }
            }
        }
        // 更新最大长度dp索引
        if (dp[i] > dp[maxIndex]) {
            maxIndex = i
        }
        // 更新子序列动态规划数组
        if (_maxIndex !== i) {
            subArrayDP[i] = [...subArrayDP[_maxIndex], item]
        }
    }
    // 返回最大递增子序列
    return subArrayDP[maxIndex]
};
```

课程提供版本
```js
function getSequence(arr){
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for(i = 0;i < len; i++){
    const arrI = arr[i]
    if(arrI !== 0){
      j = result[result.length - 1]
      if(arr[j] < arr[i]){
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while(u < v){
        c = (u + v) >> 1
        if(arr[result[c]] < arrI){
          u = c + 1
        } else {
          v = c
        }
      }
      if(arrI < arr[result[u]]){
        if(u > 0){
          p[i] = result[u - 1]
        }
        result[u] = 1
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while(u-- > 0){
    result[u] = v
    v = p[v]
  }
  return result
}
```

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


