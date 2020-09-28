<template>
  <div>
    <div>
      <input
        type="text"
        v-model.trim="kw"
        @keydown.enter="search"
        @focus="showList=true"
        @blur="showList=false"
        @keydown.up="up"
        @keydown.down="down"
      />
      <button @click="search">搜索</button>
      搜索记录:
      <span
        v-for="(item,index) in historyList"
        :key="index"
        @click="itemSearch(item)"
        class="span1"
      >{{item}}</span>
      <div class="history" v-if="showList">
        <p
          v-for="(item,index) in historyList"
          :key="index"
          :class="{'active':index==activeIndex}"
        >{{item}}</p>
      </div>
    </div>
    <div v-for="(item,index) in newsList" :key="index">
      <newsCard1
        v-if="item.imageUrls !=null && item.imageUrls.length >=3"
        :title="item.title"
        :imageUrls="item.imageUrls"
        :publishDate="item.publishDate"
        :posterScreenName="item.posterScreenName"
        :commentCount="item.commentCount"
      ></newsCard1>

      <newsCard2
        v-if="item.imageUrls !=null && item.imageUrls.length >0 &&item.imageUrls.length <3"
        :title="item.title"
        :imageUrls="item.imageUrls"
        :publishDate="item.publishDate"
        :posterScreenName="item.posterScreenName"
        :commentCount="item.commentCount"
      ></newsCard2>
    </div>
    <el-button
      type="primary"
      :loading="isLoading"
      @click="showMoreNews"
      v-show="isShow"
    >{{loadingMsg}}</el-button>
  </div>
</template>

<script>
import newsCard1 from "@/components/newsCard1";
import newsCard2 from "@/components/newsCard2";
export default {
  components: {
    newsCard1,
    newsCard2
  },
  data() {
    return {
      kw: "",
      newsList: [],
      historyList: [],
      list: [],
      showList: false,
      page: 2,
      activeIndex: -1,
      loadingMsg: "点击加载更多",
      isLoading: false,
      isShow:false
    };
  },
  created() {
    let list = localStorage.historyList;
    if (list) {
      this.historyList = JSON.parse(list);
    }
  },
  methods: {
    search() {
      if (this.activeIndex > -1) {
        this.kw = this.historyList[this.activeIndex];
      }

      this.$axios
        .get("http://api.kudesoft.cn/news/list", {
          params: {
            kw: this.kw
          }
        })
        .then(res => {
          this.newsList = res.data.result.data;
        });

      this.showList = false;

      if (!this.historyList.includes(this.kw)) {
        this.historyList.push(this.kw);
        this.save();
      }
      this.isShow = true
    },
    showMoreNews() {
      this.page++;
      this.isLoading = true;
      this.loadingMsg = "加载中";
      this.$axios
        .get("http://api.kudesoft.cn/news/list", {
          params: {
            kw: this.kw,
            page: this.page
          }
        })
        .then(res => {
          this.list = res.data.result.data;
          // console.log(this.list)
          this.newsList = [...this.newsList, ...this.list];
          console.log(this.newsList);
          this.loadingMsg = "点击加载更多";
          this.isLoading = false;
        });
    },
    save() {
      localStorage.historyList = JSON.stringify(this.historyList);
    },
    up() {
      if (this.activeIndex == 0) {
        this.activeIndex = this.historyList.length;
      }
      this.activeIndex--;
    },
    down() {
      if (this.activeIndex == this.historyList.length - 1) {
        this.activeIndex = -1;
      }
      this.activeIndex++;
    },
    itemSearch(item) {
      this.kw = item;
      this.search();
    }
  }
};
</script>

<style scoped>
.history {
  width: 200px;
  height: 300px;
  position: absolute;
  top: 120px;
  left: 300px;
  border: 1px solid #000;
  background-color: #eee;
  color: #000;
}
.active {
  background-color: #999;
  color: #eee;
}
.span1 {
  cursor: pointer;
  margin-right: 10px;
}
</style>