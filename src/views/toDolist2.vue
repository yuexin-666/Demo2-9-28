<template>
  <div>
    <input type="text" v-model.trim="inputVal" @keydown.enter="add" />

    <h3>正在进行中</h3>
    <ul>
      <li v-for="(item,index) in list1" :key="index" v-show="!item.isSuc">
        <input type="checkbox" @click.prevent="changeType(item,true)" />
        <span @dblclick="edit(item,index)" 
        v-if="changeIndex!=index">{{item.title}}</span>
        <input
          type="text"
          v-model="item.title"
          v-if="changeIndex==index"
          @keydown.enter="changeIndex=-1" 
          @blur="changeIndex=-1"
        />
        <button @click="del(index)">删除</button>
      </li>
    </ul>

    <h3>已完成</h3>
    <ul>
      <li v-for="(item,index) in list1" :key="index" v-show="item.isSuc">
        <input type="checkbox" checked @click="changeType(item,false)" />
        <span>{{item.title}}</span>
        <button @click="del(item,index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: "",
      list1: [],
      changeIndex: -1,
      tempValue: ""
    };
  },
  created() {
    let list1 = localStorage.list1;
    if (list1) {
      this.list1 = JSON.parse(list1);
    }
  },
  methods: {
    add() {
      if (this.inputVal.trim() == "") {
        return;
      }
      this.list1.push({
        title: this.inputVal,
        isSuc: false
      });

      this.inputVal = "";
      this.save();
    },
    changeType(item, state) {
      item.isSuc = state;
      this.save();
    },
    edit(item, index) {
      this.changeIndex = index;
      this.tempValue = item.title;
    },
    del(index) {
      this.list1.splice(index, 1);
      this.save();
    },
    save() {
      localStorage.list1 = JSON.stringify(this.list1);
    }
  }
};
</script>

<style scoped>
span {
  display: inline-block;
  width: 300px;
}
</style>