import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "./dashboard/Dashboard"

Vue.use(Router)
Vue.config.devtools = false

export default new Router({
  mode: 'history',
 // base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'Dashboard B2B',
      component: Dashboard
    }
  ]
})
