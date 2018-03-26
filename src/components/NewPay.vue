// 洗车页面整理

<template>
  <div id="carpay">
      <h3 class="common-title">请选择洗车项目</h3>
      <div class="clearfix content">
        <div class="card" v-for="(item,index) in cardClassList" @click="getPayClass(item.id,item.salePrice)" :key="item.id" v-if="index<2">
          <div class="card-item" v-bind:class="{active: cardClassActvie == item.id}">
            <p class="fs16" v-text="item.name"></p>
            <p class="fs12" v-text="item.description?item.description:'洗车项目说明'"></p>
            <p class="fs24 mgt10" v-text="'¥' + item.salePrice"></p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <h3 class="common-title">请选择支付方式</h3>
      <div class="clearfix content">
        <div class="pay wechat" @click="payClassClick(payClassWechat.type, payClassWechat.id)">
          <div class="card-item" v-bind:class="{active: payClassActvie == payClassWechat.id}">
            <p class="fs12" v-text="payClassWechat.typeCN"></p>
            <p class="fs16 ovhd fwb" v-text="payClassWechat.name"></p>
            <div>
              <img src="http://p3xltibgs.bkt.clouddn.com/icon_WeChatpay2.png" alt="" class="img-icon_quick">
            </div>
            <div class="card-wechat">
              <img src="http://p3xltibgs.bkt.clouddn.com/icon_WeChatpay.png" alt="" class="img-icon_wechat">
            </div>
          </div>
        </div>
        <div class="pay" v-for="(item,index) in payClassList" :key="item.id" @click="payClassClick(item.type, item.id)">
          <div class="card-item" v-bind:class="{active: payClassActvie == item.id}">
            <p class="fs12" v-text="item.typeCN"></p>
            <p class="fs16 ovhd fwb" v-text="item.name"></p>
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_quick_default.png" alt="" class="img-icon_quick" v-show="payClassActvie != item.id">
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_quick_active.png" alt="" class="img-icon_quick" v-show="payClassActvie == item.id">
            <p class="fs12" v-show="item.expireTimeCN">有效期</br>{{item.expireTimeCN}}</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="footer">
        <div class="fs14 mgb20">还需要支付
          <span class="fs24 mgl10">¥{{payNum}}</span>
        </div>
        <div class="fs12">点击确认下单，即已同意
          <span class="yellow" @click="$goRouter('./Dahezi')">《大盒子服务协议》</span>
        </div>
        <div class="common-btn" @click="getPay">确认下单</div>
        <div class="fs12 mgt10">
          <span class="yellow" @click="$goRouter('./CardIndex')">购买年卡</span>洗车无限次</div>
      </div>
    </div>
</template>

<script>
  import Util from '../script/util';


  export default {
    data() {
      return {
        deviceId: null,

        cardClassList: [], // 门店洗车项目
        cardClassActvie: null, // 选择的门店项目
        payClassWechat: {
          id: 0,
          name: '微信支付',
          typeCN: '微信',
          expireTimeCN: '',
          salePrice: '',
          type: 4,
        }, // 微信支付
        payClassList: [], // 支付洗车项目
        payClassActvie: null, // 当前选中项

        payNum: '', // 支付价格
      };
    },
    watch: {
      
    },
    mounted: function () {
          this.getCarClass();
    },
    methods: {

      // 洗车机可用项目
      getCarClass: function () {
          let deviceId = JSON.parse(localStorage.getItem('deviceId'));
        var self = this,
          url = this.$api.deviceservice,
          params = {
            deviceId: deviceId,
          },
          succeed = function (res) {
            self.cardClassList = res.data.data;
            self.cardClassActvie = res.data.data[0].id;
            self.payNum = res.data.data[0].salePrice;
            self.getPayClass(res.data.data[0].id, res.data.data[0].salePrice)
          };
        self.$axiosGet(url, params, succeed);
      },
      // 获取可用支付方式
      getPayClass: function (id, p) {
        this.cardClassActvie = id;
        this.payNum = p;
        var self = this,
          url = this.$api.querymatches,
          params = {
            serviceId: id,
            price: p
          },
          succeed = function (res) {
            if (res.data.status == 0) {
              self.payClassActvie = 0;
              self.payType = 4;
              self.payClassList = []
              for (var key in res.data.data) {
                if (res.data.data[key]) {
                  self.payClassList.push(res.data.data[key]);
                }
              }
            } else {
              self.$mint.MessageBox('提示', res.data.message);
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      // 支付方式选择
      payClassClick: function (type, id) {
        this.payType = type;
        this.payClassActvie = id;
        // 如果选择不是微信支付 支付金额为0
        if (type != 4) {
          this.payNum = 0;
        } else {
          var arr = this.cardClassList;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == this.cardClassActvie) {
              this.payNum = arr[i].salePrice;
              break;
            }
          }
        }
      },
      // 支付 
      getPay: function () {
          let deviceId = JSON.parse(localStorage.getItem('deviceId'));
        
        // 1用劵2用卡4微信

        // 31卡 4微信 2用劵
        var type = 0;
        switch (this.payType) {
          case 1:
            type = 2;
            break;
          case 3:
            type = 2;
            break;
          case 4:
            type = 4;
            break;
          default:
            type = 1;
            break;
        }

        var self = this,
          url = this.$api.cwpay,
          params = {
            serviceId: this.cardClassActvie,
            deviceId: deviceId,
            payType: type,
            couponId: type == 1 ? this.payClassActvie : '',
            cardId: type == 2 ? this.payClassActvie : '',
          },
          succeed = function (res) {
                            localStorage.setItem('orderId', JSON.stringify(res.data.data.orderId));
            if (self.payType != 4) {
              self.$goRouter('./NewIsStopCar')
            } else {
              self.getWeiXinPay(res.data.data)
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      // 微信支付
      getWeiXinPay: function (data) {
        var self = this,
          url = this.$api.prepayinfo,
          params = {
            payOrderId: data.payOrderId,

          },
          succeed = function (res) {
            onBridgeReady(res.data.data)
          };
        self.$axiosGet(url, params, succeed);


        function onBridgeReady(obj) {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": obj.appId, //公众号名称，由商户传入     
              "timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数     
              "nonceStr": obj.nonceStr, //随机串     
              "package": obj.package,
              "signType": obj.signType, //微信签名方式：     
              "paySign": obj.paySign //微信签名 
            },
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                self.$goRouter('./NewIsStopCar')
              } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
            }
          );
        }
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },
    }
  }

</script>