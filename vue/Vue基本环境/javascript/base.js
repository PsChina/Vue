export default function app (Vue){
    let vm = new Vue({
        el:'#app',
        data(){
            return{
                msg:'Hello Webpack & Vue!'
            }
        },
        methods:{
            click(){
                console.log('click did run')
            }
        },
        created(){
            this.$http({url:'http://localhost:8080/ceshi',method:'GET'})
            .then((result)=>{
                console.log(result.data)
            },(error)=>{
                console.log(error)
            })
        }
    })  
}




