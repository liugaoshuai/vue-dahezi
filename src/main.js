// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

import './style/reset.css'
import './style/common.css'

// axios
import axios from 'axios'
Vue.prototype.$mint = axios

Vue.use(MintUI)

import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    wId: '',
    orderId: '', // 订单id
  }
})
import Methods from './script/common.js'
Vue.use(Methods);

import mint from 'mint-ui';
Vue.prototype.$mint = mint
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
