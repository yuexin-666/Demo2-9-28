<template>
  <div>
    <input type="text" v-model="inputValue" @keydown.enter="add" />
    <h2>未完成{{no}}</h2>
    <ul>
      <li v-for="(item,index) in list" :key="index" v-show="!item.isShow">
        <input type="checkbox" @click.prevent="setState(item,true)" />
        <span @click="upDate(index)" class="info">{{item.goods}}</span>
        <button @click="del(index)">删除</button>
      </li>
    </ul>
    <h2>已完成{{yes}}</h2>
    <ul>
      <li v-for="(item,index) in list" :key="index" v-show="item.isShow">
        <input type="checkbox" checked @click="setState(item,false)" />
        <span class="info" @click="upDate(index)">{{item.goods}}</span>
        <button @click="del(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      list: [],
    };
  },
  computed: {
    yes() {
      let num = 0;
      this.list.map((item) => {
        if (item.isShow) {
          num++;
        }
      });
      return num;
    },
    no() {
      let num = 0;
      this.list.map((item) => {
        if (!item.isShow) {
          num++;
        }
      });
      return num;
    },
  },
  methods: {
    add() {
      let obj = {
        goods: this.inputValue,
        isShow: false,
      };
      this.list.push(obj);
      this.inputValue = "";
    },
    del(index) {
      this.list.splice(index, 1);
    },
    setState(item, state) {
      item.isShow = state;
    },
    upDate(index) {
      let rel = window.prompt("修改:");
      if (rel) {
        this.list.splice(index, 1, { goods: rel });
      }
    },
  },
};
</script>

<style scoped>
.info {
  display: inline-block;
  width: 300px;
}
</style>