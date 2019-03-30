@MyClassDecorator
class MyClass {
	constructor(){
		this.type="myClass"
	}
	@readonly
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