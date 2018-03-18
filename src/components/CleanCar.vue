// 洗车页面整理

<template>
  <div>
    <div id="carstop" v-show="avtivePage == 1">
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

    <div id="carpay" v-show="avtivePage == 2">
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
              <img src="http://p3xltibgs.bkt.clouddn.com/icon_WeChatpay 2.png" alt="" class="img-icon_quick">
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
          <span class="yellow" @click="goPayMonthCard">购买月卡</span>洗车无限次</div>
      </div>
    </div>
    <div id="caritem" v-show="avtivePage == 3">
      <div class="box">
        <div class="header clearfix">
          <img src="http://p3xltibgs.bkt.clouddn.com/icon02.png" class="img-icon02">
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
              <p>6.请收好后视镜，以免洗车时损坏；</p>
        </div>
        <div class="tac footer">
          <a href="#" class="common-btn" v-bind:class="{none: btnActive}" @click="isCleanCarFun">我已确认
            <span v-if="btnActive">( {{time}}s )</span>
          </a>
        </div>
      </div>
    </div>
    <div id="cleancar" v-show="avtivePage == 4">
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
              <p>6.请收好后视镜，以免洗车时损坏；</p>
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

  export default {
    data() {
      return {


        avtivePage: 1, // 决定当前页面1停车页2支付页3确认停车页4洗车过程页5洗车结束页

        isCleanCar: false, // 是否可以洗车

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
        orderId: 0, // 订单id

        cleanCarTime: 0, // 倒计时
        cleanCarTimeText: '', // 倒计时


        orderType: '', // 洗车订单
        orderAddress: '', // 洗车地址
        orderPayTime: '', // 订单时间
        payAmount: '', // 订单时间
        payTypeText: '', // 订单时间

        time: 9,
        btnActive: true,


      };
    },
    watch: {

    },
    mounted: function () {
      if (this.$route.query.orderId) {
        this.$store.state.orderId = this.$route.query.orderId;
      } else {
        this.$store.state.orderId = null;
      }


      this.deviceId = JSON.parse(localStorage.getItem('deviceId'));
      this.isUserOrder();
    },
    methods: {
      stopCarOk: function () {
        if (this.$route.query.orderId) {
          this.avtivePage = 3;
          this.timeOut();
        } else {
          this.avtivePage = 2
          this.getCarClass();
        }
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

      // 检查客户是否存在订单
      isUserOrder: function () {
        var self = this,
          url = this.$api.deviceorder,
          params = {
            deviceId: this.deviceId,
          },
          succeed = function (res) {
            // 如果存在订单进行跳转
            if (res.data.data.workingOrderId > 0) {
              self.$store.state.orderId = res.data.data.workingOrderId;
              self.isCarStatus();
            } else if (res.data.data.pendingOrderId > 0) {
              self.$mint.MessageBox.confirm('订单已支付，是否继续洗车？').then(action => {
                self.avtivePage = 3;
                self.timeOut();
                self.$store.state.orderId = res.data.data.pendingOrderId;
              });
            } else {
              self.isCarWasherNormal();
            }
          };
        self.$axiosGet(url, params, succeed);
      },

      // 检查洗车机状态是否正常
      isCarWasherNormal: function () {
        var self = this,
          url = this.$api.devicestatus,
          params = {
            deviceId: this.deviceId,
          },
          succeed = function (res) {
            if (res.data.data.isFree == 1) {
              self.isStopRight();
            } else {
              self.$mint.MessageBox('洗车机被占用');
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      // 检查客户是否到位
      isStopRight: function () {
        var self = this,
          url = this.$api.carready,
          params = {
            deviceId: this.deviceId,
          },
          succeed = function (res) {
            if (res.data.data == 1) {
              self.isCleanCar = true;
            } else {
              self.$mint.MessageBox(res.data.message);
              self.isCleanCar = false;
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      // 查询洗车状态
      isCarStatus: function () {
        var self = this,
          url = this.$api.washstatus,
          params = {
            orderId: self.$store.state.orderId,
          },
          succeed = function (res) {
            self.getCleanCarStatus(self.$store.state.orderId);
          };
        self.$axiosGet(url, params, succeed);
      },

      goPayMonthCard: function () {
        this.$router.push({
          path: '/CardIndex'
        })
      },
      // 洗车机可用项目
      getCarClass: function () {
        var self = this,
          url = this.$api.deviceservice,
          params = {
            deviceId: this.deviceId,
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
        console.log(type)
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
            deviceId: this.deviceId,
            payType: type,
            couponId: type == 1 ? this.payClassActvie : '',
            cardId: type == 2 ? this.payClassActvie : '',
          },
          succeed = function (res) {
            self.$store.state.orderId = res.data.data.orderId;
            if (self.payType != 4) {
              self.avtivePage = 3;
              self.timeOut();
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
                self.avtivePage = 3;
                self.timeOut();
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
      // 跳转洗车页
      isCleanCarFun: function () {
        if (this.btnActive) {
          return false;
        }
        var self = this;
        this.$mint.MessageBox.confirm('是否开始洗车？').then(action => {
          var url = this.$api.docw,
            params = {
              orderId: self.$store.state.orderId,
            },
            succeed = function (res) {
              self.getCleanCarStatus(self.$store.state.orderId);
            };
          this.$axiosGet(url, params, succeed);
        });
      },
      // 获取洗车状态
      getCleanCarStatus: function () {
        var self = this,
          url = this.$api.washstatus,
          params = {
            orderId: self.$store.state.orderId,
          },
          succeed = function (res) {
            self.avtivePage = 4;
            self.cleanCarTime = res.data.data.leftTime;
            var int = setInterval(function () {
              self.cleanCarTimeText = self.$formatTime(self.cleanCarTime)
              self.$set([self.cleanCarTimeText], 'cleanCarTimeText', self.cleanCarTimeText)
              if (self.cleanCarTime % 5 == 0) {
                self.getOrderStatus();
              }
              if (self.cleanCarTime == 0) {
                clearInterval(int)
              }
              self.cleanCarTime--;
            }, 1000)
            int();
          };
        self.$axiosGet(url, params, succeed);
      },
      getOrderStatus: function () {
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
            } else if (es.data.data.washStatus == 3) {
              self.$mint.MessageBox('洗车机故障');
            }
          };
        self.$axiosGet(url, params, succeed);
      },

    }
  }

</script>