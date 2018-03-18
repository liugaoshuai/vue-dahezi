import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import CleanCar from '@/components/CleanCar'
import CardIndex from '@/components/CardIndex'
import CardDetail from '@/components/CardDetail'
import OrderPay from '@/components/OrderPay'
import MyIndex from '@/components/MyIndex'
import MyCard from '@/components/MyCard'
import MyOrder from '@/components/MyOrder'
import ExchangeCode from '@/components/ExchangeCode'
import Dahezi from '@/components/Dahezi'
import CarNumber from '@/components/CarNumber'
import MyPhone from '@/components/MyPhone'

import NewStopCar from '@/components/NewStopCar'
import NewPay from '@/components/NewPay'
import NewIsStopCar from '@/components/NewIsStopCar'
import NewCleaningCar from '@/components/NewCleaningCar'


Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'NewStopCar',
      component: NewStopCar
    }, {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/CleanCar',
      name: 'CleanCar',
      component: CleanCar
    }, {
      path: '/CardIndex',
      name: 'CardIndex',
      component: CardIndex
    }, {
      path: '/CardDetail',
      name: 'CardDetail',
      component: CardDetail
    }, {
      path: '/OrderPay',
      name: 'OrderPay',
      component: OrderPay
    }, {
      path: '/MyIndex',
      name: 'MyIndex',
      component: MyIndex
    }, {
      path: '/MyCard',
      name: 'MyCard',
      component: MyCard
    }, {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    }, {
      path: '/ExchangeCode',
      name: 'ExchangeCode',
      component: ExchangeCode
    }, {
      path: '/Dahezi',
      name: 'Dahezi',
      component: Dahezi
    }, {
      path: '/CarNumber',
      name: 'CarNumber',
      component: CarNumber
    }, {
      path: '/MyPhone',
      name: 'MyPhone',
      component: MyPhone
    }, {
      path: '/NewStopCar',
      name: 'NewStopCar',
      component: NewStopCar
    }, {
      path: '/NewPay',
      name: 'NewPay',
      component: NewPay
    }, {
      path: '/NewIsStopCar',
      name: 'NewIsStopCar',
      component: NewIsStopCar
    }, {
      path: '/NewCleaningCar',
      name: 'NewCleaningCar',
      component: NewCleaningCar
    },
  ]
})
