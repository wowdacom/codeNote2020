import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ScrollMagic from 'scrollmagic'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.prototype.$sm = ScrollMagic

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
