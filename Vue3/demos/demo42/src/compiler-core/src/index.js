function match_ab_c_or_d_index(str){
    const result = []
    let i,startIndex,endIndex;
    function waitForA(char){
        if(char === 'a'){
            startIndex = i
            return waitForB
        }
        return waitForA
    }

    function waitForB(char){
        if(char === 'b'){
            return waitForC
        }
        return waitForA(char)
    }

    function waitForC(char){
        if(char === 'c' || char === 'd'){
            endIndex = i
            return end 
        }
        return waitForA(char)
    }

    function end(){
        return end
    }

    let currentState = waitForA

    for(i = 0; i < str.length; i++){
        const char = str[i]
        let nextState = currentState(char)
        currentState = nextState
        if(currentState === end){
            console.log(startIndex, endIndex)
            result.push({
                start:startIndex,
                end:endIndex
            })
            currentState = waitForA
        }
    }
    return result
}

const result =  match_ab_c_or_d_index('111ababcbckkk,abd,123abc')

console.log(result)