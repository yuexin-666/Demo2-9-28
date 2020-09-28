<template>
  <div news-body>
      <div class="news-title">{{title}}
           <img :src="imageUrls[0] | filterImg">
      </div>
      <div class="news-msg">
          <span>{{posterScreenName}}</span><span>{{commentCount}}</span><span>{{publishDate}}</span>
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
    },
    filters:{
        filterImg(url){
            if(url.startsWith(" ")){
                return "https://inews.gtimg.com/newsapp_ls/0/12042394653_295195/0"
            }else{
                return url
            }
        }
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
    display: flex;
    justify-content: space-between;
}
.news-title img{
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