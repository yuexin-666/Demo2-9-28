<template>
  <div>
      <h3>鼠标事件</h3>
      <div class="mouse-body">
          <b>鼠标单击</b>
          <div class="mouse-div" @click="click1"></div>
          <b>鼠标双击</b>
          <div class="mouse-div" @dblclick="click2"></div>
          <b>鼠标按下</b>
          <div class="mouse-div" @mousedown="click3"></div>
          <b>鼠标抬起</b>
          <div class="mouse-div" @mouseup="click4"></div>
          <b>鼠标移动</b>
          <div class="mouse-div" @mousemove="click5">{{num}}</div>

          <!-- over,和out 会触发事件冒泡 -->
      </div>

      <hr>
        <h3>键盘事件</h3>
      <div>
          <input type="text" @keydown.13="key" v-model="msg">
          <p v-for="(item,index) in array" :key="index">{{item}}</p>
      </div>
      <h3>事件修饰符</h3>
      <div>
          <input type="checkbox" @click.prevent="clickbox"> 
          <!-- .prevent阻止事件默认行为 -->
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            num:0,
            msg:"",
            array:[]
        }
    },
    methods:{
        click1(){
            console.log("鼠标单击...")
        },
        click2(){
            console.log("鼠标双击...")
        },
        click3(){
            console.log("鼠标按下...")
        },
        click4(){
            console.log("鼠标抬起...")
        },click5(){
            this.num++
        },
        key(){
           this.array.push(this.msg)
           this.msg="  "
        },
        clickbox(){
            console.log("e.....")
        }
    }
}
</script>

<style>
    .mouse-body{
        display: flex;
        flex-direction: column;
        align-items: center;
}
    .mouse-div{
        width: 150px;
        height: 150px;
        border: 1px solid black;
    }
</style>