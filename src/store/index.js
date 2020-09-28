import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[],
  },
  mutations: {
    addcart(state,goods){
      let rel = true
      state.cartList.map(item=>{
        if(item.goods.id == goods.id){
          item.num++
          rel = false
        }
      })
      if(rel){
        state.cartList.push({
          goods,
          num:1
        })
      }
    },
    prevGoods(state,goods){
      state.cartList.map(item=>{
        if(item.goods.id == goods.id){
          item.num --
        }
      })
    }
  },
  getters:{
    price(state){
        let titol = 0
        state.cartList.map(item=>{
          titol += item.goods.originalPrice*item.num *100
        })
        return titol
    }
  },
  actions: {
  },
  modules: {
  }
})
