<template>
    <div>
        <input type="text" v-model="kw" @keydown.enter="add">
        <button @click="add">添加</button>
        <div>
            <h4>未完成</h4>
            <ul>
                <li v-for="(item,index) in todoList" 
                :key="index" 
                v-show="item.isShow==false">
                    <input type="checkbox" 
                    @click.prevent="clickChecked(item,true)">
                    <span class="span" @dblclick="edit(item,index)" v-if="updateIndex!=index">{{item.title}}</span>
                    <input type="text" v-if="updateIndex==index" v-model="item.title"

                    >
                    <span @click="del(index)">X</span>
                </li>
            </ul>
        </div>
        <div>
            <h4>已完成</h4>
            <ul>
                <li v-for="(item,index) in todoList" 
                :key="index" 
                v-show="item.isShow==true">
                     <input type="checkbox" 
                     @click.prevent="clickChecked(item,false)" checked>
                    <span class="span" @dblclick="edit(item,index)" v-if="updateIndex!=index">{{item.title}}</span>
                    <input type="text" v-model="item.title" v-if="updateIndex==index"
                    
                    >
                    <span @click="del(index)">X</span>
                </li>
            </ul>
        </div>
        <div>
            <h4>全部任务</h4>
            <ul>
                <li v-for="(item,index) in todoList" :key="index">
                     <input type="checkbox" 
                     @click="clickChecked(item,item.isShow=!item.isShow)"
                     :checked="item.isShow==true"
                     >
                    <span class="span" @dblclick="edit(item,index)" v-if="updateIndex!=index">{{item.title}}</span>
                     <input type="text" v-model="item.title" v-if="updateIndex==index">
                    <span @click="del(index)">X</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            kw:'',//输入文本框的内容
            todoList:[],//存放输入文本框的内容
            updateIndex:-1,//记录更新的下标
            temp:'',//存放修改时的初始值
        }
    },
    methods: {
        add(){//添加
            // 判断输入文本框的内容不能为空
            if(this.kw.trim()==""){
                return
            }
            // 添加
            this.todoList.push({
                title:this.kw,//输入文本框的内容
                isShow:false//复选框的初始状态
            })
            // 添加后，清空
            this.kw="";
        },
        clickChecked(item,state){//点击改变复选框的状态
            item.isShow=state;
        },
        edit(item,index){//双击修改
           this.updateIndex=index;//保存更改的下标
           this.temp=item.title;//保存更新时的初始数据
        },
        del(index){//删除数据
            this.todoList.splice(index,1)
        }
    },
}
</script>
<style scoped>
.span{
    display: inline-block;
    width: 200px;
    margin-left: 10px;
}
</style>