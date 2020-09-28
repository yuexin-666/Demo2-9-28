<template>
  <div>
    <input type="text" v-model.trim="inputValue" @keydown.enter="add">
    <h3>正在进行{{noList.length}}</h3>
    <ul>
      <li
            v-for="(item,index) in noList" 
            :key="index"
            v-show="!item.isTrue"
        >
        <input type="checkbox" @click.prevent="setState(item,true)">
        <span class="sp1" v-if="showIndex!=index" @dblclick="changeIndex(item,index)">
          {{item.text}}
          </span>
        <input type="text" v-model="item.text" v-if="showIndex==index" @blur="showIndex=-1" @keydown.enter="showIndex=-1" @keydown.esc="back(item)">
        <button @click="del(item)">删除</button>
        </li>
    </ul>
    <h3>已完成{{yesList.length}}</h3>
    <ul>
      <li
            v-for="(item,index) in yesList" 
            :key="index"
            v-show="item.isTrue"
        >
        <input type="checkbox" checked @click="setState(item,false)">
        <span class="sp1">
          {{item.text}}
          </span>
        <button @click="del(item)">删除</button>
        </li>
    </ul>

    <hr>

    <h3>筛选</h3>
    <select v-model="sel">
      <option value="">请选择</option>
      <option value="1">所有任务</option>
      <option value="3">正在进行</option>
      <option value="2">已完成</option>
    </select>
    <ul>
      <li v-for="(item,index) in showList" :key="index">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
      return {
        inputValue:'',
        list:[],
        showIndex:-1,
        historyVal:'',
        sel:'',
        showList:[]
      }
    },
    watch:{
      sel(val){
         if(val == '1'){
          this.showList = this.list
        }else if(val == '2'){
          this.showList = this.yesList
        }else if(val == '3'){
          this.showList = this.noList
        }else {
          this.showList = []
        }
      }
    },
    computed:{
      yesList(){
       return this.list.filter(item=>{
          return item.isTrue
        })
      },
      noList(){
       return this.list.filter(item=>{
          return !item.isTrue
        })
      }
    },
    created(){
      let list = localStorage.demo
      if(list){
        this.list = JSON.parse(list)
      }
    },
    methods:{
      add(){
        if(this.inputValue.trim()=='') return
        let obj = {
          text:this.inputValue,
          isTrue:false
        }
        this.list.push(obj)
        this.inputValue = ''
        this.save()
      },
      setState(item,state){
        item.isTrue = state
        this.save()
      },
      changeIndex(item,index){
        this.historyVal=item.text
        this.showIndex = index
      },
      back(item){
        item.text = this.historyVal
        this.showIndex = -1
      },
      del(item){
       let index= this.list.indexOf(item)
       this.list.splice(index,1)
        this.save()
      },
      save(){
        localStorage.demo = JSON.stringify(this.list)
      }
    }
}
</script>

<style scoped>
  .sp1{
    display: inline-block;
    width: 200px;
  }
  ul li{
    margin: 10px 0px;
  }
</style>