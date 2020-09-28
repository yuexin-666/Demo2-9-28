<template>
  <div>
     <div>
          <h3>v-if案例:</h3>
      <input type="text" v-model="num">
      <p>
          查询结果：
          <span v-if="num>=90 && num<=100">优秀</span>
          <span v-else-if="num>=80 && num<=89">良好</span>
          <span v-else-if="num>=60 && num<=79">中等</span>
          <span v-else-if="num>=0 && num<=59">不及格</span>
          <span v-else>输入有误</span>
      </p>
     </div>
    <hr>
      
      <div>
          <h3>v-show:案例</h3>
          <button @click="show">显示</button>
            <p v-show="isShow">1234421</p>
      </div>
      <hr>

      <div>
          <h3>v-bind:案例</h3>
          <!-- lazy 修饰符 当失去焦点的时候才会执行 -->
          <input type="text" v-model.lazy="url">
          <a :href="url" v-bind:title="t" target="_blank">跳转</a>
      </div>
      <hr>
  </div>
</template>

<script>
export default {
    data(){
        return{
            num:0,
            isShow:true,
            url:"",
            t:"腾讯"
        }
    },
    watch:{//侦听器
        url(newVal,oldVal){
            if(newVal.endsWith("qq.com")){
                this.t="腾讯"
            }else if(newVal.endsWith("taobao.com")){
                this.t="淘宝"
            }else if(newVal.endsWith("jd.com")){
                this.t="京东"
            }else{
                this.t=""
            }
        }
    },
    methods:{
        show(){
            this.isShow=!this.isShow
        }
    }
}
</script>

<style>

</style>