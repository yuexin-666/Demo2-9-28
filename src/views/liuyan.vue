<template>
  <div>
    <h2>留言板</h2>
    <p>
      昵称:
      <input type="text" v-model.trim="nikeName" />
    </p>
    <p>
      内容:
      <textarea name id cols="30" rows="3" v-model.trim="text"></textarea>
      <span :class="style">{{length}}/{{maxLength}}</span>
    </p>
    <input type="button" value="提交" @click="add" />

    <hr />

    <liuyanList :list="list" @save="save"></liuyanList>
  </div>
</template>

<script>
import liuyanList from "@/components/liuyanList";
export default {
  components: {
    liuyanList
  },
  data() {
    return {
      nikeName: "",
      text: "",
      list: [],
      nowTime: "",
      length: 0,
      maxLength: 20,
      style: "default"
    };
  },
  created() {
    let liuyan = localStorage.liuyan;
    if (liuyan) {
      this.list = JSON.parse(liuyan);
    }
  },
  watch: {
    text(newVal,oldVal) {
      if (newVal.length > this.maxLength) {
        this.text = oldVal
        this.style = "red"
      } else if (newVal.length < this.maxLength) {
        this.style = "default"
      }
      this.length = newVal.length
    }
  },
  methods: {
    add() {
      if (this.nikeName.trim() == "") {
        alert("昵称不能为空");
        return;
      }
      if (this.text.trim() == "") {
        alert("内容不能为空");
        return;
      }
      this.list.push({
        nikeName: this.nikeName,
        text: this.text,
        time: new Date().getTime(),
        start: 0
      });
      (this.nikeName = ""), (this.text = "");
      this.save();
    },
    save() {
      localStorage.liuyan = JSON.stringify(this.list);
    }
  }
};
</script>

<style scoped>
.red{
  color: red;
}
.default{
  color: #000;
}
</style>