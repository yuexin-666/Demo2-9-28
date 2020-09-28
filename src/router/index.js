import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import("../views/Home.vue")
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
   {
    path: '/demo',
    name: 'demo',
    component: ()=>import("../views/demo.vue")
  }, {
    path: '/demo2',
    name: 'demo2',
    component: ()=>import("../views/demo2.vue")
  }, {
    path: '/demo3',
    name: 'demo3',
    component: ()=>import("../views/demo3.vue")
  }, {
    path: '/toDolist2',
    name: 'toDolist2',
    component: ()=>import("../views/toDolist2.vue")
  }, {
    path: '/toDolist1',
    name: 'toDolist1',
    component: ()=>import("../views/toDolist1.vue")
  }, {
    path: '/liuyan',
    name: 'liuyan',
    component: ()=>import("../views/liuyan.vue")
  }, {
    path: '/axios',
    name: 'axiosDemo',
    component: ()=>import("../views/axiosDemo.vue")
  }, {
    path: '/news',
    name: 'news',
    component: ()=>import("../views/news.vue")
  }, {
    path: '/ElementDemo',
    name: 'ElementDemo',
    component: ()=>import("../views/ElementDemo.vue")
  }, {
    path: '/shopping',
    name: 'shopping',
    component: ()=>import("../views/shopping.vue")
  }, {
    path: '/demo4',
    name: 'demo4',
    component: ()=>import("../views/demo4.vue")
  }, {
    path: '/gouwuche',
    name: 'gouwuche',
    component: ()=>import("../views/gouwuche.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
