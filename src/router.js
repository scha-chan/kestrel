import Vue from 'vue'
import Router from 'vue-router'
import Login from './login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Base',
      component: () => import('./Base.vue'),
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/dashboard/Dashboard')
      },{
        path: 'list',
        name: 'List',
        component: () => import('@/list/ListWrapper')
      }]
    }
  ]
})
