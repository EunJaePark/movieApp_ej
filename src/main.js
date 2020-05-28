import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// MainConts에서 input에 입력한 검색어를 MovieConts로 전달해주기 위한 이벤트버스.
export const eventbus = new Vue({
  methods: {
    passSearchTxt(searchText, check) {
      console.log('이벤트버스 함수 실행되나!!!!');
      
      this.$emit('sendSearch', searchText, check)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
