import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FinishStop from '@/components/FinishStop' // 完成洗车
import SelectCar from '@/components/SelectCar' // 选择车辆

import Payment from '@/components/Payment' // 订单支付


import CommonEntry from '@/components/CommonEntry' // 停车确认
import Login from '@/components/Login' // 停车确认
import OrderPay from '@/components/OrderPay' // 停车确认

import MyIndex from '@/components/MyIndex' // 停车确认
import MyOrder from '@/components/MyOrder' // 停车确认
import MyCard from '@/components/MyCard' // 停车确认
import MyMessage from '@/components/MyMessage' // 停车确认

import StopCar from '@/components/1StopCar' // 停车确认
import PayCar from '@/components/2PayCar' // 支付洗车
import AttentionMatters from '@/components/3AttentionMatters' // 注意事项
import CleaningCar from '@/components/4CleaningCar' // 洗车中
import MyPlateNumber from '@/components/5MyPlateNumber' // 停车确认
import CardIndex from '@/components/6CardIndex' // 办卡首页
import CardDetail from '@/components/7CardDetail' // 办卡详情

import Dahezifuwuxieyi from '@/components/agreement/Dahezifuwuxieyi' // 办卡详情















Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/AttentionMatters',
      name: 'AttentionMatters',
      component: AttentionMatters
    },{
      path: '/CleaningCar',
      name: 'CleaningCar',
      component: CleaningCar
    },{
      path: '/FinishStop',
      name: 'FinishStop',
      component: FinishStop
    },{
      path: '/PayCar',
      name: 'PayCar',
      component: PayCar
    },{
      path: '/SelectCar',
      name: 'SelectCar',
      component: SelectCar
    },{
      path: '/StopCar',
      name: 'StopCar',
      component: StopCar
    },{
      path: '/Payment',
      name: 'Payment',
      component: Payment
    },{
      path: '/CardIndex',
      name: 'CardIndex',
      component: CardIndex
    },{
      path: '/CardDetail',
      name: 'CardDetail',
      component: CardDetail
    },{
      path: '/CommonEntry',
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
    }
  ]
})
