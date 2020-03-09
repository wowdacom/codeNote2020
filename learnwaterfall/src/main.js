import Vue from 'vue'
import App from './App.vue'
import store from './store'
import waterfall from "vue-waterfall2";

Vue.use(waterfall);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
