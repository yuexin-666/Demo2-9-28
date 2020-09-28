<template>
     <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="list-top">
          <div>
            <span style="margin-right:10px">{{item.nikeName}}</span>
            <span>{{item.time | filterTime}}</span>
          </div>
          <div class="list-start" @click="addStart(item)">点赞{{item.start}}</div>
        </div>
        <div style="text-align:left">{{item.text}}</div>
        <div class="list-sc"><button @click="del(item,index)">删除</button></div>
      </li>
    </ul>
</template>

<script>

export default {
    props:{
        list:Array,
    
    },
    filters:{
      filterTime(val){
          let data = new Date()
        
         let y = data.getUTCFullYear();
         let m = data.getMonth()+1;
         let d=data.getDay();
         let h=data.getHours();
         let mm=data.getMinutes();
         let s=data.getSeconds();

         let time=`${y}年${m}月${d}日${h}：${mm}：${s}`;
         return time
      },
      filterTime2(old){
           let data = new Date();
           let now = data.getTime();
           let time = now - old
           console.log(time)
           let str = ""
           if(time>0&&time<1000*60){
               str ="刚刚"
           }else if(time>1000&&time<1000*60*2){
             str="一分钟前"
           }else if(time>1000*3&&time<1000*60*4){
             str="两分钟前"
           }else if(time>1000*6&&time<1000*60*7){
             str="五分钟前"
           }else{
             str="很久之前"
           }
           return str
      }
  },
  methods:{
       del(item,index){
        let rel = window.confirm(`确定要删除 ${item.nikeName} 的留言内容么`)
        if(rel){
            this.list.splice(index,1)
        }
        this.$emit("save")
    },
    addStart(item){
        item.start++
        this.$emit("save")
    },
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: center;
}
ul li {
  width: 50%;
  border-bottom: 1px solid #000;
  margin: 10px 0px;
}
.list-top {
  display: flex;
  justify-content: space-between;
}
.list-sc {
  cursor: pointer;
  text-align: right;
}
.list-start {
  cursor: pointer;
}
.list-start:hover {
  color: red;
}
</style>