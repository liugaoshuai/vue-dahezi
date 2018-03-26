<template>
    <div class="">
        <div id="cardindex">
            <div class="card-cleantype">
                <a href="javascript:void(0)" class="fs14" @click="getCardList(item.id,item.name)" v-for="(item,index) in cardClassArr" :class="{active: active == item.id,first: index == 0,last: index == cardClassArr.length-1}">{{item.name}}</a>
            </div>
            <div v-show="cardArrTest.length>0" class="clearfix">
                <h3 class="common-title">请选择次卡</h3>
                <div class="pay card-item-next" v-for="(item,index) in cardArrTest" :key="item.id" @click="goDetail(item)">
                    <img src="http://p3xltibgs.bkt.clouddn.com/bg01.png" alt="">
                    <img src="http://p3xltibgs.bkt.clouddn.com/logo_small.png" alt="" class="img-logo_small item-logo">
                    <p class="item-num">{{item.limitCount}}<span class="fs14">次</span></p>
                    <p class="item-price">¥{{item.salePrice}}</p>
                    <p class="item-date">有效期：365天</p>
                </div>
            </div>
            <div v-show="cardMonthArrTest.length>0">
                <h3 class="common-title">请选择年卡</h3>
                <div class="card-item-month" v-for="(item,index) in cardMonthArrTest" :key="item.id" @click="goDetail(item)">
                    <img src="http://p3xltibgs.bkt.clouddn.com/bg04.png" alt="" class="item-bg">
                    <img src="http://p3xltibgs.bkt.clouddn.com/logo_small.png" alt="" class="img-logo_small item-logo">
                    <p class="item-name">{{item.serviceName}}</p>
                    <p class="item-price">
                        <span class="fs14">¥</span>{{item.salePrice}}</p>
                    <p class="item-date">有效期：365天 不限次数</p>
                </div>
            </div>
        </div>

        <div id="cardfooter">
            <div class="item-bk" @click="goCardIndex">
                <img src="http://p3xltibgs.bkt.clouddn.com/icon_cardactive.png" alt="" class="img-footer">
                <div class="fs12">办卡</div>
            </div>
            <div class="item-wd" @click="goMyIndex">
                <img src="http://p3xltibgs.bkt.clouddn.com/icon_wode.png" alt="" class="img-footer">
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
                cardDetailObj: {},
                paymentNum: 290,
                cardClassArr: [],
                cardArr: [],

                cardArrTest: [], // 次卡
                cardMonthArrTest: [], // 年卡
                active: '',


            };
        },
        mounted: function () {
            this.getCardClass();
            Util.getLogin(this);
        },
        methods: {
            goMyIndex: function () {
                this.$router.push({ path: '/MyIndex' })
            },
            goCardIndex: function () {
                this.$router.push({ path: '/CardIndex' })
            },
            goDetail: function (item) {
                var urlItem = encodeURIComponent(JSON.stringify(item))
                this.$router.push({
                    path: '/CardDetail', query: {
                        urlItem: urlItem,
                    }
                })
            },
            getCardClass: function () {
                var self = this;
                var url = this.$api.getservice,
                    params = {
                    },
                    succeed = function (res) {
                        self.cardClassArr = res.data.data;
                        if (self.cardClassArr[0].id) {
                            self.getCardList(self.cardClassArr[0].id);
                        }

                    };
                self.$axiosGet(url, params, succeed);
            },
            getCardList: function (id,name) {
                if(name == "打蜡洗车"){
                    this.$mint.MessageBox('洗车机运行中');
                    return false;
                }
                this.active = id
                var self = this;
                var url = this.$api.getcards,
                    params = {
                        serviceId: id,
                        type: 3,
                    },
                    succeed = function (res) {
                        self.cardArrTest = res.data.data;
                    };
                self.$axiosGet(url, params, succeed);

                var url1 = this.$api.getcards,
                    params1 = {
                        serviceId: id,
                        type: 2,
                    },
                    succeed1 = function (res) {
                        self.cardMonthArrTest = res.data.data;
                    };
                self.$axiosGet(url1, params1, succeed1);
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
                    alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
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