interface printer {
    print():void
}


class A implements printer {
    constructor(){
        console.log('You Initialize a instance a')
    }
    print(){
        
    }
}

export default A