// 洗车页面整理

<template>
  <div id="carstop">
    <div class="box">
      <div class="header clearfix">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon02.png" class="img-icon02">
        <span class="">请观察前方大圆镜</br>确认车辆停在黄线内并拉手刹</span>
      </div>
      <div class="middle">
        <div class="middle-item">
          <img src="http://p3xltibgs.bkt.clouddn.com/img_parking.png" class="img-parking">
        </div>
        <div class="middle-item">
          <img src="http://p3xltibgs.bkt.clouddn.com/icon04.png" class="img-icon04">
        </div>
        <div class="middle-item">
          <img src="http://p3xltibgs.bkt.clouddn.com/icon_handbrake.png" class="img-handbrake">
        </div>
      </div>
      <div class="tac">
        <a href="#" class="common-btn" v-show="isCleanCar" @click="stopCarOk">我已拉手刹</a>
        <a href="#" class="common-btn none" v-show="!isCleanCar" v-text="btnText"></a>
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
    watch: {},
    mounted: function () {
      Util.getLogin(this);
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
        // 确定停车判断是否存在已支付订单
        // 如果已支付跳转注意事项 未支付跳转支付页
        this.$goRouter('./NewPay')
      },
    }
  }

</script>
