## Set
Set是es6提供的一种数据结构 他是一个集合 也就是说里面不会存在两个相同的值 即便你添加了2次或者更多。
```js
let set = new Set([1,2,3,4,5,5])
console.log(set) // Set(5) {1, 2, 3, 4, 5}
```

## 如何遍历

```js
let set = new Set([1,2,3,4,5,5])
for(let value of set){   // 也可以用 forEach 遍历
    console.log(value)
}
// 1
// 2
// 3
// 4
// 5
// 所以如果要数组去重的话可以考虑用set

// 去除数组的重复成员
[...new Set(array)]
```

## Map
Map提供了一种 值-值 对 的对应关系

我们知道 js 对象 提供了一种 键值对的关系 key-value { key:value }

value 可以是任意对象

但是 key 只能是字符串。

例如:
```js
let ccc = {}

let CCC = {
	[ccc]:'ccc'
}

console.log(CCC) 
//{[object Object]: "ccc"}
```

但是Map 提供了 值值对

```js
let a = {a:'a'};
let b = {b:'b'};

let map = new Map([  // 第一个数是存放将要创建 map 的数据的容器
        [a,b] //这个数组表示 map内的第一个元素
    ])

console.log(map)

/*
Map(1) {{…} => {…}}
size:1
__proto__:Map
[[Entries]]:Array(1)
0:{Object => Object}
key:{a: "a"}
value:{b: "b"}
*/


```
## 设置值值对

```js
let a = {a:'a'};
let b = {b:'b'};

let map = new Map();
map.set(a,b) //为以创建的 map 追加值值对

```

## 更具键来获取值

```js
    let a = {a:'a'};
    let b = {b:'b'};
    let map = new Map([[a,b]])
    map.get(a) // {b:'b'}
```

## 删除map 中的某个对应关系
```js
    map.delete(a);
```

## 判断map 内是否含有某个 键
```js
    let a = {a:'a'};
    let b = {b:'b'};
    let map = new Map([[a,b]])
    map.has(a) // true
    map.has(b) // false
    map.delete(a)
    map.has(a) // true
```

## 获取成员总数

```js
    map.size(); 
```

## WeakSet && WeakMap
被存入 Map 和 Set 的数据会被强引用 所以他们的 引用计数 会加一
也就是说他们使用起来将会是安全的 但是 如果不及时释放的话 会造成内存泄漏 或者循环引用之类的问题

那么es6 引入了 WeakSet 和 WeakMap 也就是说 存入 WeakSet 和 WeakMap 的数据 会被弱引用 引用计数不会加一 

所以 他们随时有可能从 WeakSet 和 WeakMap 中消失 也就是说 从WeakSet和WeakMap中获取的数据他们是不保险的。但是他们不需要你手动管理内存 以及能帮你解决一些 循环引用的问题





