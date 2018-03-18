<template>
  <div id="cleancar">
    <div class="box">
      <div class="header clearfix mgb20">
        <a href="tel:13777864743">
          <img src="http://p3xltibgs.bkt.clouddn.com/icon_customerservice.png" alt="" class="left">
        </a>
        <div class="right" @click="$goRouter('./CardIndex')">
          <img src="http://p3xltibgs.bkt.clouddn.com/icon_buycard.png" alt="">
          <span>购卡</span>
        </div>
        <div class="status">
          <span class="status-a">
            <span class="status-b">
              <span class="fs14 status-c" v-if="cleanCarTimeText">时间剩余</br>{{cleanCarTimeText}}</span>
              <span class="fs14 status-c carcleaned" v-else>洗车已完成</span>
            </span>
          </span>
        </div>
      </div>
      <div class="line"></div>
      <div class="middle" v-show="cleanCarTime > 0">
        <h3>洗车注意事项</h3>
        <p>1.请将车停在黄线内，并回正方向盘，以免发生刮擦；</p>
        <p>2.洗车期间，严禁打开车窗或车门；</p>
        <p>3.请勿倒车进入大盒子，以免影响洗车效果；</p>
        <p>4.洗车期间，请坐在车内或站在大盒子2米外；</p>
        <p>5.车辆尺寸：高度
          <2.3米，宽度<2.48米，长度<5.0米；</p>
            <p>6.请收好超长加装件，以免洗车时损坏；</p>
      </div>
      <div class="over" v-show="cleanCarTime == 0">
        <div class="pdtb20">
          <img src="http://p3xltibgs.bkt.clouddn.com/logo.png" alt="" class="img-logo">
        </div>
        <p class="fs16 mgt10">{{orderType}}</p>
        <p class="fs16 mgt10">
          <img src="http://p3xltibgs.bkt.clouddn.com/icon07.png" alt="" class="img-map">{{orderAddress}}</p>
        <p class=" mgt10">
          <span class="fs24">¥{{payAmount}}</span>
          <span class="fs12">{{payTypeText}}</span>
        </p>
        <a class="common-btn mgt10" href="javascript:void(0)" @click="$mint.MessageBox('洗车已完成，请缓慢驶离。');">祝您一路顺风，下周见！</a>
        <p class="fs12 mgt10">{{orderPayTime}}</p>
      </div>

    </div>
  </div>

  </div>
</template>

<script>
  import Util from '../script/util';


  export default {
    data() {
      return {
        deviceId: null,

        cleanCarTime: 1, // 倒计时
        cleanCarTimeText: '', // 倒计时


        orderType: '', // 洗车订单
        orderAddress: '', // 洗车地址
        orderPayTime: '', // 订单时间
        payAmount: '', // 订单时间
        payTypeText: '', // 订单时间
      };
    },
    watch: {
      
    },
    mounted: function () {
      Util.isCarWasherNormal(this);
          Util.isStopRight(this);
      this.getCleanCarStatus();
    },
    methods: {
      // 获取洗车状态
      getCleanCarStatus: function () {
        if(!this.$store.state.orderId){
          this.$mint.MessageBox('订单不存在');
        }
        var self = this,
          url = this.$api.washstatus,
          params = {
            orderId: self.$store.state.orderId,
          },
          succeed = function (res) {
            if (res.data.data.washStatus == 2) {
              self.cleanCarTime = 0;
              self.cleanCarTimeText = "";
              self.orderType = res.data.data.order.itemName;
              self.orderAddress = res.data.data.storeAddress;
              self.orderPayTime = res.data.data.order.payTimeCNDT;
              self.payAmount = res.data.data.order.payAmount;
              self.payTypeText = res.data.data.order.payTypeCN;
            } else if (es.data.data.washStatus == 1) {
              self.cleanCarTime = res.data.data.leftTime;
              var int = setInterval(function () {
                self.cleanCarTimeText = self.$formatTime(self.cleanCarTime)
                self.$set([self.cleanCarTimeText], 'cleanCarTimeText', self.cleanCarTimeText)
                if (self.cleanCarTime % 5 == 0) {
                  self.getCleanCarStatus();
                }
                if (self.cleanCarTime == 0) {
                  clearInterval(int)
                }
                self.cleanCarTime--;
              }, 1000)
              int();
            } else if (es.data.data.washStatus == 3) {
              self.$mint.MessageBox('洗车机故障');
            }
          };
        self.$axiosGet(url, params, succeed);
      },
    }
  }

</script>