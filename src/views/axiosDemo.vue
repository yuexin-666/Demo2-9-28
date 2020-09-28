<template>
  <div>
    <div class="box">
      <div class="left">
        <div v-for="(item,index) in list1" :key="index" @click="change(item)" class="bbb">
          <img :src="item.cpic" width="50px" height="50px" />
          <p>{{item.cname}}</p>
        </div>
      </div>

      <div class="right">
        <div v-for="(item,index) in list" :key="index" class="aaa">
          <img :src="item.scpic" width="50px" height="50px" />
          <p>{{item.subcname}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list1: [],
      list: [],
      list2:[],
      pageId: 1,
      id: 1
    };
  },
  created() {
    axios
      .get("http://api.kudesoft.cn/tdk/category", {})
      .then(res => {
        this.list1 = res.data.data.data;
        this.list = this.list1[0].subcategories;
        
      })
      .catch(err => {console.log(err)});

      axios.get('http://api.kudesoft.cn/tdk/goods',{}).then(res=>{
          this.list2=res.data.data.data.list
        //   console.log(res.data.data.data.list);
          
      }).catch(err=>{console.log(err)})
  },
  methods: {
    change(item) {
      this.list = item.subcategories;
      this.id = this.cid;
    }
  }
};
</script>

<style scoped>
.box {
  display: flex;
}
.aaa {
  display: flex;
  flex-direction: column;
  height: 100px;
  margin: 0px 20px;
}
.left {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
}
.bbb{
    width: 100px;
    height: 100px;
}
.right {
  width: 600px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
}
</style>