<template>
  <div id="caritem">
    <div class="box">
      <div class="header clearfix">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon02.png" class="icon_warn">
        <span class="">请按照机器语音提示</br>检查车辆情况</span>
      </div>
      <div class="middle">
        <h3>请确认以下注意事项</h3>
        <ul class="middle-item clearfix">
          <li>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_stopgear.png" alt="">
            </br>
            <span>挂P/空挡</span>
          </li>
          <li>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_handbrake.png" alt="">
            </br>
            <span>拉手刹</span>
          </li>
          <li>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_rearviewmirror.png" alt="">
            </br>
            <span>收后视镜</span>
          </li>
          <li>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_wiper.png" alt="">
            </br>
            <span>关雨刮</span>
          </li>
          <li>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_antenna2.png" alt="">
            </br>
            <span>收天线</span>
          </li>
          <li>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_carwindow.png" alt="">
            </br>
            <span>关车窗</span>
          </li>
        </ul>
        <h3>洗车注意事项</h3>
        <p>1.请将车停在黄线内，并回正方向盘，以免发生刮擦；</p>
        <p>2.洗车期间，严禁打开车窗或车门；</p>
        <p>3.请勿倒车进入大盒子，以免影响洗车效果；</p>
        <p>4.洗车期间，请坐在车内或站在大盒子2米外；</p>
        <p>5.车辆尺寸：高度
          <2.3米，宽度<2.48米，长度<5.0米；</p>
            <p>6.请收好超长加装件，以免洗车时损坏；</p>
      </div>
      <div class="tac footer">
        <a href="javascript:void(0);" class="common-btn" v-bind:class="{none: btnActive}" @click="isCleanCarFun">我已确认
          <span v-if="btnActive">( {{time}}s )</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from '../script/util.js';


  export default {
    data() {
      return {
        time: 3,
        btnActive: true,
      };
    },
    watch: {
      
    },
    mounted: function () {
      this.timeOut();
    },
    methods: {

      stopCarOk() {
        // 确定停车判断是否存在已支付订单
        // 如果已支付跳转注意事项 未支付跳转支付页
        this.$goRouter('./NewPay')
      },
      // 倒计时
      timeOut: function () {
        var self = this;
        var int = setInterval(function () {
          self.time--;
          self.$set([self.time], 'time', self.time)
          if (self.time == 0) {
            self.btnActive = false;
            clearInterval(int)
          }
        }, 1000);
      },
      // 跳转洗车页
      isCleanCarFun: function () {
        if (this.btnActive) {
          return false;
        }
        let orderId = JSON.parse(localStorage.getItem('orderId'));
        if (!orderId) {
          this.$mint.MessageBox('订单不存在');
        }
        var self = this;
        this.$mint.MessageBox.confirm('是否开始洗车？').then(action => {
          var url = this.$api.docw,
            params = {
              orderId: orderId,
            },
            succeed = function (res) {
              self.$goRouter('./NewCleaningCar')
            };
          this.$axiosGet(url, params, succeed);
        });
      },
    }
  }

</script>