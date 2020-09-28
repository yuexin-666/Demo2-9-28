<template>
  <div class="news-body">
      <div class="news-title">{{title}}</div>
      <div class="news-img">
          <img v-for="(item,index) in imageUrls" v-show="index < 3" :key="index" :src="item">
      </div>
      <div class="news-msg">
          <span>{{posterScreenName}}</span>
          <span>{{commentCount}}</span>
          <span>{{publishDate}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        imageUrls:Array,
        publishDate:Number,
        posterScreenName:String,
        commentCount:String
    }
}
</script>

<style scoped>
.news-body{
    width: 100%;
    margin: 10px 0px;
    padding: 0px 10px;
    box-sizing: border-box;
}
.news-title{
    font-size: 16px;
    text-align: left;
}
.news-img{
    display: flex;
    justify-content: space-between;
}
.news-img img{
        width: 111px;
        height: 73px;
}
.news-msg{
    text-align: left;
}
.news-msg span{
    margin-right: 10px;
}
</style>>

</style>