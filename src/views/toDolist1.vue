<template>
  <div>
      <select v-model="sel">
          <option :value="0">请选择</option>
          <option :value="1">所有任务</option>
          <option :value="2">正在进行</option>
          <option :value="3">已经完成</option>
      </select>

        搜索:
        <input type="text" v-model="kw" @keydown.enter="srarch">

        <h3>任务列表</h3>
        <ul>
            <li v-for="(item,index) in showList" :key="index">{{item.title}}</li>
        </ul>
  </div>
      
</template>

<script>
export default {
    data(){
        return{
            sel:"0",
            kw:"",
            list:[],
            showList:[]
        }
    },
    created(){
        let list = localStorage.list
        if(list){
            this.list=JSON.parse(list)
        }
    },
    watch:{
        sel(val){
            this.showList=[]
            switch(val){
                case 0:
                    this.showList=[]
                break;

                case 1:
                    this.showList=this.list
                break;

                case 2:
                    this.list.map(item=>{
                        if(!item.isSuc){
                            this.showList.push(item)
                        }
                    })
                break;

                case 3:
                    this.list.map(item=>{
                        if(item.isSuc){
                            this.showList.push(item)
                        }
                    })
                break;
            }
        }
    },
    methods:{
        srarch(){
            this.showList=[]
            
            this.list.map(item=>{
                if(item.title.includes(this.kw)){
                    this.showList.push(item)
                }
            })
        }
    }
}
</script>

<style>

/* 
  data(){
         return{
             sel:'0',  //下拉框选中的值
             kw:'', //搜索关键词
             list:[],
             showList:[]
         }
     },
     created(){
         let list = localStorage.list
         if(list){
             this.list = JSON.parse(list)
         }
     },
     watch:{
         sel(val){
             console.log(val)
             this.showList=[]
             switch(val){
                    case 0 :
                        this.showList=[]
                     break;

                     case 1 :
                         this.showList=this.list
                     break;

                     case 2 :
                         this.list.map(item=>{
                             if(!item.isSuc){
                                 this.showList.push(item)
                             }
                         })
                     break;

                     case 3 :
                         this.list.map(item=>{
                             if(item.isSuc){
                                 this.showList.push(item)
                             }
                         })
                     break;
             }
         }
     },
     methods:{
         srarch(){
             this.showList=[]

             this.list.map(item=>{
                 if(item.title.includes(this.kw)){
                     this.showList.push(item)
                 }
             })
         }
     } */
</style>