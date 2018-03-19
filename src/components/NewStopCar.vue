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
        <a href="#" class="common-btn none" v-show="!isCleanCar">车辆尚未停车到位</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from '../script/util.js';


  export default {
    data() {
      return {
        isCleanCar: true, // 是否可以洗车
      };
    },
    watch: {
    },
    mounted: function () {
      Util.getLoginTest(this);
    },
    methods: {

      stopCarOk() {
        // 确定停车判断是否存在已支付订单
        // 如果已支付跳转注意事项 未支付跳转支付页
        this.$goRouter('./NewPay')
      },
    }
  }

</script>