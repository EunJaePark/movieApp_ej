import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: () => import('../views/MainPage.vue')
    },
    {
      path: '/movie',
      component: () => import('../views/MoviePage.vue')
    },
    {
      path: '/inform',
      component: () => import('../views/InformPage.vue')
    }
  ]
})


