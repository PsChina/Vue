# devtool
 它用于改变 webpack 打包时的模式。

 模式不一样会使得 打包的速度不一样 当然结果也会不一样 (不是说效果不一样而是运行耗时不一样) 比如 eval 会使得生成的代码运行时更加耗时 但是打包的时候省时。

## demo

```js

module.exports = {
    entry:'./entry.js'
    //...
    //...
    devtool:'eval'  
    /*
    devtool	                      构建	重构建	  生产环境	  特性
    eval	                      +++	  +++	    no	    生成后的代码
    cheap-eval-source-map	      +	      ++	    no	    转换过的代码（仅限行）
    cheap-source-map	          +	      o	        yes	    转换过的代码（仅限行）
    cheap-module-eval-source-map  o	      ++	    no	    原始源码（仅限行）
    cheap-module-source-map	      o	      -	        yes	    原始源码（仅限行）
    eval-source-map	              --	  +	        no	    原始源码
    source-map	                  --	  --	    yes	    原始源码
    inline-source-map	          --	  --	    no	    原始源码
    hidden-source-map	          --	  --	    yes	    原始源码
    nosources-source-map	      --	  --	    yes	    无源码内容  
    详情 请查阅
    http://www.css88.com/doc/webpack/configuration/devtool/

    开发环境推荐 eval (速度快)

    生产环境推荐 source-map (完整的source-map)
    */
}

```
 