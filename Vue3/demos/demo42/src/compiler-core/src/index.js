// 一个匹配 ab[cd] 的有限状态机
function match_ab_c_or_d_index(str){
    const result = []
    let i, startIndex, endIndex
    // 等待 a 的状态
    function waitForA(char){
        if(char === 'a'){
            startIndex = i
            return waitForB
        }
        return waitForA
    }
    // 等待 b 的状态
    function waitForB(char){
        if(char === 'b'){
            return waitForC
        }
        // 不是 b 看看字符是不是 a 所以直接调用以免字符丢失
        return waitForA(char)
    }
    // 等待 c 或者 d 的状态
    function waitForC(char){
        if(char === 'c' || char === 'd'){
            endIndex = i
            return end 
        }
        // 不是 c 和 d 看看字符是不是 a 所以直接调用以免字符丢失
        return waitForA(char)
    }

    // 结束状态
    function end(){
        return end
    }

    // 设置状态机初始状态
    let currentState = waitForA

    // 开始遍历分析字符串
    for(i = 0; i < str.length; i++){
        const char = str[i]
        // 查看当前状态得到下一个状态
        let nextState = currentState(char)
        currentState = nextState
        // 查看是否匹配成功达到结束状态
        if(currentState === end){
            // 保存匹配到的开始索引和结束索引
            result.push({
                start:startIndex,
                end:endIndex
            })
            // 匹配成功将状态设置为初始状态继续匹配剩下的字符串
            currentState = waitForA
        }
    }
    // 当字符串遍历完毕后返回分析结果
    return result
}

// 测试一波
const result =  match_ab_c_or_d_index('111ababcbckkk,abd,123abc')

// 输出结果
console.log(result)


// 通用版
function generatorMatchFunc(pattern){
    const res = []
    let states = [], startIndex,endIndex, resultIndex
    for(let i = 0; i < pattern.length; i++){
        const patternChar = pattern[i]
        const state = function(char){
            if(i === 0){
                startIndex = resultIndex
            }
            if(i === pattern.length - 1){
                endIndex = resultIndex
            }
           return char === patternChar
        }
        states.push(state)
    }
    let currentStateIndex = 0
    return function(str){
        for(resultIndex = 0; resultIndex < str.length; resultIndex++){
            const char = str[resultIndex]
            const func = states[currentStateIndex]
            let nextIndexFlag = false
            if(func instanceof Function){
                nextIndexFlag = func(char)
            }
            currentStateIndex = nextIndexFlag ? currentStateIndex + 1 : 0
            currentStateIndex = currentStateIndex < 0 ? 0 : currentStateIndex
            if(currentStateIndex === 0){
                currentStateIndex = states[0](char) ? 1 : 0
            }
            if(currentStateIndex === pattern.length){
                res.push({
                    start:startIndex,
                    end:endIndex
                })
                currentStateIndex = 0
            }
        }
        return res
    }
}


const matchABC = generatorMatchFunc('abc')

 
let res =  matchABC('abc---abc-ababc--abc')

console.log('通用版 res=>',res)