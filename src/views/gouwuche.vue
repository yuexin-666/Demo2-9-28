<template>
  <div>
    <cartList
      v-for="(item,index) in list"
      :key="index"
      :imgurl="item.mainPic"
      :title="item.title"
      :price="item.originalPrice"
      :addnum="0"
      @oncarts="add(item)"
      @subcarts="prev(item)"
    ></cartList>

    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-swipe-cell
          v-for="(item,index) in $store.state.cartList"
          :key="index">
        <van-card
          :price="item.goods.originalPrice"
          :desc="item.goods.desc"
          :title="item.goods.title"
          :thumb="item.goods.mainPic"
          :num="item.num"
        />
        <template #right>
          <van-button square text="删除" type="danger" @click="del(index)" class="delete-button" />
        </template>
      </van-swipe-cell>

      <div style="height:50px"></div>
      <van-submit-bar :price="$store.getters.price" button-text="提交订单" />
    </van-popup>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" @click="showPopup" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import cartList from "@/components/GoodsCard";
export default {
  components: {
    cartList,
  },
  data() {
    return {
      list: [],
      show: false,
    };
  },
  created() {
    this.$axios
      .get("http://api.kudesoft.cn/tdk/goods", {
        params: {
          pageSize: 10,
        },
      })
      .then((res) => {
        // console.log(res.data.data.data.list)
        this.list = res.data.data.data.list;
      });
  },
  methods: {
    add(item) {
      this.$store.commit("addcart", item);
    },
    prev(item) {
      this.$store.commit("prevGoods", item);
    },
    showPopup() {
      this.show = true;
    },
    del(index){
        console.log(index)
        this.$store.state.cartList.splice(index,1)
    }
  },
};
</script>

<style scoped>
goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100px;
  }
</style>