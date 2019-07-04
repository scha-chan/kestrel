import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueResource from "vue-resource"
import VueJsonp from 'vue-jsonp'
import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue)
Vue.use(VueJsonp)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
