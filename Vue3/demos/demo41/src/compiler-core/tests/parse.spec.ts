import { NodeTypes } from '../src/ast'
import { baseParse } from '../src/parse'

describe('Parse',()=>{
    describe('interpolation',()=>{
        test('simple interpolation',()=>{
            const ast = baseParse('{{message }}')

            expect(ast.children[0]).toStrictEqual({
                type: NodeTypes.INTERPOLATION,
                content: {
                    type: NodeTypes.SIMPLE_EXPRETION,
                    content: 'message'
                }
            })
        })
    })

    describe('element',()=>{
        it('simple element div',()=>{
            const ast = baseParse('<div></div>')

            expect(ast.children[0]).toStrictEqual({
                type: NodeTypes.ELEMENT,
                tag: 'div'
            })
        })
    })


    describe('text',()=>{
        it('simple text',()=>{
            const ast = baseParse('some text')

            expect(ast.children[0]).toStrictEqual({
                type: NodeTypes.TEXT,
                content: 'some text'
            })
        })
    })


    describe('hello world',()=>{
        const ast = baseParse("<div>hi,{{message}}</div>")
        expect(ast.children[0]).toStrictEqual({
            type: NodeTypes.ELEMENT,
            tag: 'div',
            children:[
                {
                    type: NodeTypes.TEXT,
                    content: 'hi,' 
                },
                {
                    type: NodeTypes.INTERPOLATION,
                    content: {
                        type: NodeTypes.SIMPLE_EXPRETION,
                        content: 'message'
                    }
                }
            ]
        })
    })

})