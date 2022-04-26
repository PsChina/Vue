import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
export default {
    input: './src/index.ts', // 配置入口
    output: [ // 配置出口
        // 1. cjs -> commonjs
        // 2. esm
        {
            format: 'cjs',
            file: pkg.main
        },
        {
            format: 'es',
            file: pkg.module
        }
    ],
    plugins: [ // 转换ts  @rollup/plugin-typescript
        typescript()
    ]
}