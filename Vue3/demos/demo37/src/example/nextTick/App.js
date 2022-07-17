import { h, ref, getCurrentInstance, nextTick } from "../../../lib/guide-mini-vue.esm.js";
export const App = {
  name: "App",
  setup() {
    const count = ref(0)
    const instance = getCurrentInstance()
    function onClick(){
      for(let i = 0; i < 100; i++){
        console.log('update')
        count.value = i
      }
      console.log(instance)
      debugger
      nextTick(()=>{
        console.log(instance)
      })
    }
    return {
      count,
      onClick
    };
  },
  render() {
    return h("div", { id: "root" }, [
      h('div',{},'count:'+this.count),
      h('button',{
        onClick:this.onClick
      },'click')
    ]);
  },
};
