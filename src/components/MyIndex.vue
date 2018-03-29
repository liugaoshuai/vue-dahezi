<template>
  <div id="myindex">
    <div class="header">
      <div class="header-bg">
        <div class="header-img">
          <img :src="wechatHeaderImge" alt="" v-if="wechatHeaderImge">
          <img src="http://p3xltibgs.bkt.clouddn.com/img_Headportrait.png" alt="" v-else>
        </div>
        <span>{{wechatName}}</span>
      </div>
      <h3 class="common-title tac">您已洗车{{cleanCarNum}}次</h3>
    </div>

    <div class="content">
      <div class="content-item" @click="goMyCard">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_card.png" alt="" class="img-myicon">
        <span class="fs12">我的卡劵</span>
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Arrow.png" alt="" class="img-rightmyicon">
      </div>
      <div class="content-item" @click="goExchangeCode">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Discountcode.png" alt="" class="img-myicon">
        <span class="fs12">兑换码</span>
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Arrow.png" alt="" class="img-rightmyicon">
      </div>
      <div class="content-item" @click="goMyOrder">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Myorder.png" alt="" class="img-myicon">
        <span class="fs12">我的订单</span>
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Arrow.png" alt="" class="img-rightmyicon">
      </div>
      <div class="content-item" @click="goMyCar">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_mycar.png" alt="" class="img-myicon">
        <span class="fs12">我的车辆</span>
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Arrow.png" alt="" class="img-rightmyicon">
      </div>
      <div class="content-item" @click="goMyPhone">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_phone.png" alt="" class="img-myicon">
        <span class="fs12">我的手机</span>
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Arrow.png" alt="" class="img-rightmyicon">
      </div>
      <a class="content-item" href="tel:13777864743">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Customerservice.png" alt="" class="img-myicon">
        <span class="fs12">我的客服</span>
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_Arrow.png" alt="" class="img-rightmyicon">
      </a>
    </div>
    <div id="cardfooter">
      <div class="item-bk" @click="goCardIndex">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_newcard.png" alt="" class="img-footer">
        <div class="fs12">办卡</div>
      </div>
      <div class="item-wd" @click="goMyIndex">
        <img src="http://p3xltibgs.bkt.clouddn.com/icon_wodeactive.png" alt="" class="img-footer">
        <div class="fs12">我的</div>
      </div>
      <div class="item-smxc" @click="saoyisao">
        <div>
          <img src="http://p3xltibgs.bkt.clouddn.com/icon_scancode.png" alt="">
        </div>
        <p class="fs12">扫码洗车</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from '../script/util.js';

  export default {
    data() {
      return {
        cleanCarNum: 0, // 洗车次数
        wechatHeaderImge: '',
        wechatName: '',
      };
    },
    mounted: function () {
      Util.getLogin(this);
      this.getUserMsg();
      this.getUserinfo();
    },
    methods: {
      getUserinfo: function () {
        var self = this,
          url = this.$api.userinfo,
          params = {},
          succeed = function (res) {
            if (res.data.status == 0) {
              self.cleanCarNum = res.data.data.washCount
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      getUserMsg: function () {
        var self = this,
          url = 'http://test.yixiutong.cn/wxcw/customer/info.json',
          params = {},
          succeed = function (res) {
            self.wechatHeaderImge = res.data.data.headImgUrl;
            self.wechatName = res.data.data.nickname;
          };
        self.$axiosGet(url, params, succeed);
      },
      goExchangeCode: function () {
        this.$router.push({
          path: '/ExchangeCode'
        })
      },
      goMyIndex: function () {
        this.$router.push({
          path: '/MyIndex'
        })
      },
      goCardIndex: function () {
        this.$router.push({
          path: '/CardIndex'
        })
      },
      goMyOrder: function (item) {
        this.$router.push({
          path: './MyOrder',
        })
      },
      goMyCar: function () {
        this.$router.push({
          path: './CarNumber',
        })
      },
      goMyCard: function (item) {
        this.$router.push({
          path: './MyCard',
        })
      },
      goMyPhone: function () {
        this.$router.push({
          path: './MyPhone',
        })
      },
      saoyisao: function () {
        var newUrl = location.href;
        var oldUrl = location.href.split('#')[0];
        var self = this;
        var url = this.$api.getjsapisign,
          params = {
            url: oldUrl,
          },
          succeed = function (res) {
            wx.config({
              // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              debug: false,
              // 必填，公众号的唯一标识
              appId: res.data.data.appid,
              // 必填，生成签名的时间戳
              timestamp: res.data.data.timestamp,
              // 必填，生成签名的随机串
              nonceStr: res.data.data.noncestr,
              // 必填，签名，见附录1
              signature: res.data.data.signature,
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              jsApiList: ['scanQRCode']
            });
          };
        self.$axiosGet(url, params, succeed);


        wx.error(function (res) {
          alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });

        wx.ready(function () {
          wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {

            }
          });

          wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
          });

        });
      }

    }
  }

</script>
