<template>
  <div>
      <input type="text" v-model.trim="inputValue" @keydown.enter="add">
      <h3>正在进行{{noList.length}}</h3>
      <ul>
          <li v-for="(item,index) in noList" :key="index" v-show="!item.isSuc">
              <input type="checkbox" @click.prevent="setState(item,true)">
              <span 
                        class="item-title" 
                        @dblclick="edit(item,index)" 
                        v-if="changIndex!=index">
                  {{item.title}}
                  </span>
                  
              <input type="text" v-model="item.title" 
              v-if="changIndex==index" 
              @keydown.enter="changIndex=-1" 
              @blur="changIndex=-1" 
              @keydown.esc="back(item)" />
              <button @click="del(index)">删除</button>
              </li>
      </ul>

      <h3>已经完成{{yesList.length}}</h3>
      <ul>
          <li v-for="(item,index) in yesList" :key="index" v-show="item.isSuc">
              <input type="checkbox" checked @click="setState(item,false)">
              <span class="item-title">{{item.title}}</span>
              <button @click="del(index)">删除</button>
              </li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            inputValue:"",
            list:[],
            changIndex:-1,
            tempValue:""
        }
    },
    created(){
        let list = localStorage.list;
        if(list){
            this.list = JSON.parse(list)
        }
    },
    computed:{

        yesList(){
            return this.list.filter(item=>{
                return item.isSuc
            })
        },
        noList(){
            return this.list.filter(item=>{
                return !item.isSuc
            })
        }
    },
    methods:{
        add(){
            //非空校验
            if(this.inputValue.trim()==""){
                return
            }
            let obj = {
                title:this.inputValue,
                isSuc:false  //完成状态 默认为 未完成
            }
            this.list.push(obj)
            this.inputValue=""

            this.save();
        },
        //设置完成的状态
        setState(item,state){
            item.isSuc=state;

            this.save()
        },
        edit(item,index){ //双击设置为编辑状态
            this.changIndex=index
            this.tempValue=item.title
        },
        del(index){
            this.list.splice(index,1)
            
                this.save()
        },
        back(item){
                item.title = this.tempValue
                this.changIndex=-1

                this.save()
        },
        save(){
            localStorage.list=JSON.stringify(this.list)
        }
    }

}
</script>

<style>
    ul li{
        list-style: none;
        margin: 15px 0px;
    }

    .item-title{
        display: inline-block;
        width: 200px;
    }
</style>