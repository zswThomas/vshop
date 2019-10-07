import Vue from 'vue'
import App from './App'
import {Button} from 'mint-ui'
import router from './router'
import store from './store'
// 加载mockSever即可
import './mock/mockSever'
// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button>
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router,
  store
})
