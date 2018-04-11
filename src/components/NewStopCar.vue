// 洗车页面整理

<template>
  <div id="carstop">
    <div class="box">
      <div class="header clearfix">
        <img src="../../static/icon_warn.png" class="icon_warn">
        <span class="">请观察前方大圆镜</br>确认车辆停在黄线内并拉手刹</span>
      </div>
      <div class="middle">
        <div class="middle-item">
          <img src="../../static/img_parking.png" class="img_parking">
        </div>
        <div class="middle-item">
          <img src="../../static/icon_arrow_bottom.png" class="icon_arrow_bottom">
        </div>
        <div class="middle-item">
          <img src="../../static/icon_handbrake.png" class="icon_handbrake">
        </div>
      </div>
      <div class="tac">
        <a href="javascript:void(0);" class="common-btn" v-show="isCleanCar" @click="stopCarOk">我已拉手刹</a>
        <a href="javascript:void(0);" class="common-btn none" v-show="!isCleanCar" v-text="btnText"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from '../script/util.js';

  export default {
    data() {
      return {
        isCleanCar: false, // 是否可以洗车
        btnText: '车辆尚未停车到位',
      };
    },
    mounted: function () {
      let url = window.location.href;
      let jSessionId = Util.getQueryString('jSessionId', url);
      let deviceId = Util.getQueryString('deviceId', url);
      if (deviceId) {
        localStorage.setItem('deviceId', JSON.stringify(deviceId));
      }
      if (jSessionId) {
        localStorage.setItem('jSessionId', JSON.stringify(jSessionId));
      }
      
      this.isCarWasherNormal();
    },
    methods: {

      // 检查客户是否存在订单
      isUserOrder() {
        let deviceId = JSON.parse(localStorage.getItem('deviceId'));
        var self = this,
          url = self.$api.deviceorder,
          params = {
            deviceId: deviceId,
          },
          succeed = function (res) {
            // 正在洗车
            if (res.data.data.workingOrderId > 0) {
              self.$mint.MessageBox.confirm('存在正在洗车的订单，是否继续洗车？').then(action => {
                localStorage.setItem('orderId', JSON.stringify(res.data.data.workingOrderId));
                self.$router.push({
                  path: '/NewCleaningCar'
                })
                return false;
              });
            }
            if (res.data.data.pendingOrderId > 0) {
              self.$mint.MessageBox.confirm('订单已支付，是否继续洗车？').then(action => {
                localStorage.setItem('orderId', JSON.stringify(res.data.data.pendingOrderId));
                self.$router.push({
                  path: '/NewIsStopCar'
                })
                return false;
              });
            }
            self.isCleanCar = true;
          };
        self.$axiosGet(url, params, succeed);
      },
      // 检查洗车机状态是否正常
      isCarWasherNormal() {
        let deviceId = JSON.parse(localStorage.getItem('deviceId'));

        var self = this,
          url = this.$api.devicestatus,
          params = {
            deviceId: deviceId,
          },
          succeed = function (res) {
            if (res.data.data.isFree == 0) {
              if (res.data.data.workingOrderId > 0) {
                self.$mint.MessageBox.confirm('存在正在洗车的订单，是否继续洗车？').then(action => {
                  localStorage.setItem('orderId', JSON.stringify(res.data.data.workingOrderId));
                  self.$router.push({
                    path: '/NewCleaningCar'
                  })
                  return false;
                });
              } else {
                self.$mint.MessageBox('洗车机运行中');
                self.btnText = "洗车机运行中";
                return false;
              }

            }
            self.isStopRight()
          };
        self.$axiosGet(url, params, succeed);
      },
      // 检查车辆是否停好
      isStopRight() {
        let deviceId = JSON.parse(localStorage.getItem('deviceId'));
        var self = this,
          url = this.$api.carready,
          params = {
            deviceId: deviceId,
          },
          succeed = function (res) {
            if (res.data.data != 1) {
              var t = setTimeout(self.isStopRight(), 3000)
            } else {
              self.isUserOrder();
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      stopCarOk() {
        this.$goRouter('./NewPay')
      },
    }
  }

</script>