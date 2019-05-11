@MyClassDecorator
class MyClass {
	constructor(){
		this.type="myClass"
	}
	@readonly
	@logHello
	getType(){
		return this.type
	}
}

function MyClassDecorator(target){
	target.isMyClass = function(val){
        return val instanceof target
    }
	target.prototype.author = 'PsChina'
}

function readonly(target, key, discriptor){
	console.log(target,key,discriptor)
	discriptor.writable = false
	return discriptor
}

const a = new MyClass()

console.log(MyClass.isMyClass(a), a , a.author)

a.getType = function(){
	return undefined
}

console.log(a.getType.toString())

function logHello(target, key, discriptor){
	const oldFn = target[key]
    target[key] = function(...rest){
        console.log('Hello')
        return oldFn.call(this,...rest)
    }
    return target
}

console.log(a.getType())