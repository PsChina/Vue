function decompositionPrimeFactor(n){ // 用 js 写分解质因数
    if(Number.isInteger(n)){
        const primeFactorArr = [];
        for(let x=2; x<n; x++) {
            if(n%x===0){
                primeFactorArr.push(x)
                n/=x
                x-- // 寻找所有相同质因数
            }
        }
        if(1<n) primeFactorArr.push(n) // 1 不是质数
        return function(duplicateRemoval){ 
            if(duplicateRemoval){ // 是否去除重复因数
                const singlePrimeFactorArr = []
                for(const primeFactor of primeFactorArr){ // 数组去重
                    if(singlePrimeFactorArr.indexOf(primeFactor)===-1){
                        singlePrimeFactorArr.push(primeFactor)
                    }
                }
                return singlePrimeFactorArr // 返回去重后的质因数
            }else{ // 返回所有质因数
                return primeFactorArr
            }
        }
    }
    return ()=>[]
}

function euler(n){ // 欧拉函数(φ)
    /**
     * 任意给定正整数n，请问在小于等于n的正整数之中，有多少个与n构成互质关系？
     */
    let factors = decompositionPrimeFactor(n)(true) // 求去重后的质因数
    let eulerVal = n
    for(let factor of factors){ // 遍历这个数的质因数
        eulerVal *= (1-1/factor) // 通过欧拉函数公式φ(n)=n(1-1/p)(1-1/q)...(1-1/pr)求出函数值
    }
    return eulerVal
}

// alt + 42709 === φ
/**
 * 欧拉函数公式推导简介
 * 1、
 * ------------------------------------------------------
 * 当n为某个质数(p)的k次方时 （n=p^k,其中p是质数，k是正整数）
 * 
 * φ(n)=p^k*(1-1/p)
 * ------------------------------------------------------
 * 例如 8 = 2^3 
 * 其中 p=2 k=3 
 * => φ(8) = 2^(3-1) 
 * => 2^3(1-1/2) = 4 
 * [1,3,5,7] 这4个数与 8 互质。
 * 证明：
 * 可以发现 1-8中 2 4 6 8 与 8 不构成互质 原因是他们都是质因数 p 的倍数
 * 所以我们只需要把质因数p的倍数去掉就好了 2=1*p 4=2*p 6=3*P 8=4*P
 * 所以 若 n 为某个质数p的k次方 则不与n互质的数有 1*p、2*p、...、p^(k-1)*p  有p^(k-1)个与n不互质的数剩下的因为没有公因数p而互质
 * 而比小于等于n的正整数有n个，也就是 p^k个。 减去不互质的 p^(k-1)个 得到 φ(n)=p^k-p^(k-1) = p^k*(1-1/p)
 * 
 * 所以 当n为某个质数(p)的k次方时 φ(n)=p^k*(1-1/p)
 * 
 * 2、（未验证）
 * ------------------------------------------------------
 * 当n可以表示为某2个互质的数的积时 （n=p*q）
 * φ(n)=φ(p*q)=φ(p)φ(q)
 * φ(n)=p*(1-1/p)*q(1-1/q)
 * ------------------------------------------------------
 * 如果a与p互质(a<p)，b与q互质(b<q)，c与p*q互质(c<p*q)，则c与数对 (a,b) 是一一对应关系。由于a的值有φ(p)种可能，b的值有φ(q)种可能，则数对 (a,b) 有φ(p)φ(q)种可能，而c的值有φ(p*q)种可能，所以φ(p*q)就等于φ(p)φ(q)。
 * 
 * 3、
 * ------------------------------------------------------
 * 任意一个大于一的正整数都能用一连串的质因数相乘表示 [ n=(p1^k1)*(p2^k2)*(p3^k3)...(pr^kr) ]
 * φ(n)=φ((p1^k1)*(p2^k2)*(p3^k3)...(pr^kr))=φ(p1^k1)φ(p2^k2)φ(p3^k3)...φ(pr^kr) // 根据2得到
 * =(p1^k1)*(p2^k2)*(p3^k3)...(pr^kr)*(1-1/p1)(1-1/p1)...(1-1/pr) // 根据1得到
 * =n(1-1/p1)(1-1/p1)...(1-1/pr) <=欧拉函数
 * ------------------------------------------------------
 * 
 */


// 定义寻找最大公约数的函数

// function gcd(a, b){ // 更相减损术
//    let max = Math.max(a, b)
//    let min = Math.min(a, b)
//    let r = max - min
//     if(r === min) {
//         return r
//     } else {
//         return gcd(r, min)
//     }
// }

function gcd(a, b){ // 辗转相除法 ( 欧几里德算法 )
    let max = Math.max(a, b)
    let min = Math.min(a, b)
    let r = max % min
    if(r === 0) {
        return min
    } else {
        return gcd(r, min)
    }
}

// 定义获取整数 n 中的 1 到 n 与 n 互质的所有数的函数。
function getPerNumberOfEuler(n){
    const relativelyPrimes = []
    for(let i = 1; i < n; i++){ // 由于 n 与 n 本身的最大公约数除了 1 还有 n  本身，所以不考虑 n 。
        if(gcd(i,n)===1){
            relativelyPrimes.push(i)
        }
    }
    return relativelyPrimes
}