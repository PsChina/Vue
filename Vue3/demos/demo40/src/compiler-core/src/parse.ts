import { NodeTypes } from "./ast"

const enum TagType {
    TagStart,
    TagEnd
}

interface ParserContext {
    source:string
}

export function baseParse(content:string){
    const context = createParserContext(content)
    return createRoot(parseChildren(context))
}

function parseChildren(context:ParserContext){
    const nodes:any[] = []
    let node
    const s = context.source
    if(s.startsWith('{{')){
        node = parseInterplation(context)
    } else if(s[0] === '<'){
        if(/[a-z]/i.test(s[1])){
           node = parseElement(context)
        }
    }

    if(!node){
        node = parseText(context)
    }

    nodes.push(node)


    return nodes
}

function parseText(context:any){
    const content = parseTextData(context, context.source.length)
    return {
        type: NodeTypes.TEXT,
        content,
    }   
}

function parseTextData(context, length){
    // 1.获取当前内容
    const content = context.source.slice(0, length)
    // 推进
    advaceBy(context, content.length)
    return content
}

function parseElement(context: ParserContext) {
    const element = parseTag(context, TagType.TagStart)
    parseTag(context, TagType.TagEnd)
    return element
}


function parseTag(context:ParserContext, type: TagType){
    // 解析 tag

    // 删除处理好的代码
    const match = /^<\/?([a-z]*)/i.exec(context.source)

    let tag = ''
    if (match){
        tag = match[1]
        advaceBy(context,match[0].length)
        advaceBy(context,1)
    }
    
    if(type === TagType.TagEnd){
        return
    }

    return {
        type: NodeTypes.ELEMENT,
        tag: 'div'
    }
}



function parseInterplation(context:ParserContext){

    const openDelimiter = '{{'

    const closeDelimiter = '}}'

    const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

    advaceBy(context, openDelimiter.length)

    const rawContentLength = closeIndex - openDelimiter.length

    const rawContent = parseTextData(context,rawContentLength)

    const content = rawContent.trim()

    advaceBy(context, rawContentLength + closeDelimiter.length)

    return {
        type: NodeTypes.INTERPOLATION,
        content:{
            type:NodeTypes.SIMPLE_EXPRETION,
            content,
        }
    }
}

function advaceBy(context:ParserContext, length:number){
    context.source = context.source.slice(length)
}

function createParserContext(content:string):ParserContext{
    return {
        source:content
    }
}

function createRoot(children){
    return {
        children,
    }
}


interface Person {
    name: string;
    age: number;
} 

interface Guang {
    name: string;
    age: number;
    hobbies: string[]
}


let printHobbies: (guang: Guang) => void;

printHobbies = (guang) => {
    console.log(guang.hobbies);
}

let printName: (person: Person) => void;

printName = (person) => {
    console.log(person.name);
}
