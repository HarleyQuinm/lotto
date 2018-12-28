import Vue from 'vue'
import Router from 'vue-router'
import lottopage from '@/components/lottoPage'
import login from '@/components/login'
import register from '@/components/register'
import realname from '@/components/realname'
import address from '@/components/address'
import mine from '@/components/mine'
import winner from '@/components/winner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lottopage',
      component: lottopage
    },
    {
      path:'/login',
      name:'login',
      component:login
    },{
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/realname',
      name:'realname',
      component:realname
    },
    {
      path:'/address',
      name:'address',
      component:address
    },
    {
      path:'/mine',
      name:'mine',
      component:mine
    },
    {
      path:'/winner',
      name:'winner',
      component:winner
    }
  ]
})
