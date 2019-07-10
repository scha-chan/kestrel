import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard B2B',
      component: () => import('@/dashboard/Dashboard')
    },{
      path: '/:field/:status/:endpoint',
      name: 'Endpoint Details',
      props: true,
      component: () => import('@/details/Details')
    }
  ]
})
