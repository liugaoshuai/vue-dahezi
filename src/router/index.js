import Vue from 'vue'
import Router from 'vue-router'

import CommonEntry from '@/components/CommonEntry' // 
import Login from '@/components/Login' // 


import StopCar from '@/components/1StopCar' // 停车确认
import PayCar from '@/components/2PayCar' // 支付洗车
import AttentionMatters from '@/components/3AttentionMatters' // 注意事项
import CleaningCar from '@/components/4CleaningCar' // 洗车中
import MyPlateNumber from '@/components/5MyPlateNumber' // 停车确认
import CardIndex from '@/components/6CardIndex' // 办卡首页
import CardDetail from '@/components/7CardDetail' // 办卡详情
import MyIndex from '@/components/8MyIndex' // 我的首页
import MyOrder from '@/components/9MyOrder' // 我的订单
import MyCard from '@/components/10MyCard' // 我的卡卷
import MyMessage from '@/components/11MyMessage' // 个人资料
import OrderPay from '@/components/12OrderPay' // 订单支付
import ExchangeCode from '@/components/13ExchangeCode' // 订单支付







import Dahezifuwuxieyi from '@/components/agreement/Dahezifuwuxieyi' // 办卡详情















Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AttentionMatters',
      name: 'AttentionMatters',
      component: AttentionMatters
    },{
      path: '/CleaningCar',
      name: 'CleaningCar',
      component: CleaningCar
    },{
      path: '/PayCar',
      name: 'PayCar',
      component: PayCar
    },{
      path: '/StopCar',
      name: 'StopCar',
      component: StopCar
    },{
      path: '/CardIndex',
      name: 'CardIndex',
      component: CardIndex
    },{
      path: '/CardDetail',
      name: 'CardDetail',
      component: CardDetail
    },{
      path: '/',
      name: 'CommonEntry',
      component: CommonEntry
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: '/MyPlateNumber',
      name: 'MyPlateNumber',
      component: MyPlateNumber
    },{
      path: '/OrderPay',
      name: 'OrderPay',
      component: OrderPay
    },{
      path: '/MyIndex',
      name: 'MyIndex',
      component: MyIndex
    },{
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    },{
      path: '/MyCard',
      name: 'MyCard',
      component: MyCard
    },{
      path: '/MyMessage',
      name: 'MyMessage',
      component: MyMessage
    },{
      path: '/agreement/Dahezifuwuxieyi',
      name: 'Dahezifuwuxieyi',
      component: Dahezifuwuxieyi
    },{
      path: '/ExchangeCode',
      name: 'ExchangeCode',
      component: ExchangeCode
    }
  ]
})
