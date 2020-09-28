<template>
  <div>
    <h3>贴吧</h3>
    <div 
        v-for="(item,index) in list" :key="index"
        class="p2"
        ><p><span>{{item.name}}</span><span>{{item.title}}</span></p>
        <span>{{time | filterTime}}</span>
        <span class="p1" @click="del(index)">X</span>
        </div>
  <p>昵称: <input type="text" v-model="value"></p>
    <textarea cols="30" rows="10" v-model="val"></textarea>
    <span>{{length}}/50</span>
    <button @click="add">发帖</button>
    <input type="checkbox" checked="isShow" id="">
  </div>
</template>

<script>
export default {
data(){
  return {
    list:[],
    value:'',
    val:'',
    length:0,
    isShow:true,
    time:new Date()
  }
},
created(){
  let list = localStorage.list
  if(list){
    this.list = JSON.parse(list)
  }
},
watch:{
  val(newVal,oldVal){
        if(newVal.length > 50){
          this.val = oldVal
          console.log("111")
        }
        this.length = newVal.length
  }
},
filters:{
  filterTime(val) {
      //过滤时间
      var d = new Date(); //现在时间
      var g = new Date(val); //发表时间
      var c = (d - g) / 1000; //得到的值是毫秒数,1秒等于1000毫秒，故除以1000得到秒数
      var str = ""; //暂存数据
      if (c >= 0 && c < 60 * 5) {
        str = "刚刚";
      } else if (c >= 60 * 5 && c < 60 * 30) {
        str = "5分钟前";
      } else if (c >= 60 * 30 && c < 60 * 60) {
        str = "30分钟前";
      } else if (c >= 60 * 60 && c < 60 * 60 * 12) {
        str = "1小时前";
      } else if (c >= 60 * 60 * 12 && c < 60 * 60 * 24) {
        str = "12小时前";
      } else if (c >= 60 * 60 * 24 && c < 60 * 60 * 24 * 2) {
        str = "1天前";
      } else if (c >= 60 * 60 * 24 * 2 && c < 60 * 60 * 24 * 5) {
        str = "2天前";
      } else if (c >= 60 * 60 * 24 * 5 && c < 60 * 60 * 24 * 10) {
        str = "5天前";
      } else if (c >= 60 * 60 * 24 * 10 && c < 60 * 60 * 24 * 15) {
        str = "10天前";
      } else if (c >= 60 * 60 * 24 * 15 && c < 60 * 60 * 24 * 30) {
        str = "15天前";
      } else if (c >= 60 * 60 * 24 * 30 && c < 60 * 60 * 24 * 30 * 2) {
        str = "1月前";
      } else if (c >= 60 * 60 * 24 * 30 * 2 && c < 60 * 60 * 24 * 30 * 3) {
        str = "2月前";
      } else {
        str = "很久";
      }
      return str;
    }
  
},
methods:{
  add(){
    let obj = {
      name:this.value,
      title:this.val
    }
    this.list.push(obj)
    this.val = ''
    this.value = ''
    this.save()
  },
  del(index){
    let rel = window.confirm('确定要删除么')
        if(rel){
            this.list.splice(index,1)
        }
        this.save()
  },
  save(){
    localStorage.list = JSON.stringify(this.list)
  },
  
}
}
</script>

<style scoped>
.p2{
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>