
const instance = Symbol('instance');
class MyInstance {
    constructor() {
        const inst = MyInstance[instance];
        if (inst) {
            return inst;
        }
        MyInstance[instance] = this;
    }
}

export default MyInstance;