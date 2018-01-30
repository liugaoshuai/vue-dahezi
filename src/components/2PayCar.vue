<template>
    <div class="app">
        <div class="box">
            <div class="box-header mgb10 pd10 bgbai">
                <h3 class="common-title">请选择洗车项目</h3>
                <ul class="box-header-class clearfix">
                    <li class="tac mgr10" v-for="item in cardClassList" @click="getPayClass(item.id,item.salePrice)" v-bind:class="{commonBg: cardClassActvie == item.id}"
                        :key="item.id">
                        <p class="fs16" v-text="item.name">{{item.name}}</p>
                        <p class="fs12" v-text="item.description?item.description:'洗车项目说明'">{{item.description?item.description:'洗车项目说明'}}</p>
                        <p class="fs24" v-text="'¥' + item.salePrice"></p>
                    </li>
                </ul>
            </div>
            <div class="box-content mgb10 pd10 bgbai">
                <h3 class="common-title">请选择支付方式</h3>
                <ul class="box-content-class clearfix">
                    <li class="pd10 mgr10" v-if="ciCard.name" @click="payClassClick(1,ciCard.id)" v-bind:class="{commonBg: payClassActvie == 1}">
                        <p class="fs14">{{ciCard.typeCN}}</p>
                        <p class="fs16 mgt10">{{ciCard.name}}</p>
                        <i class="img imgurl03"></i>
                        <p class="fs12">有效期</br>{{ciCard.expireTimeCN}}</p>
                    </li>
                    <li class="pd10 mgr10" v-if="yueCard.name" @click="payClassClick(2,yueCard.id)" v-bind:class="{commonBg: payClassActvie == 2}">
                        <p class="fs14">{{yueCard.typeCN}}</p>
                        <p class="fs16 mgt10">{{yueCard.name}}</p>
                        <i class="img imgurl03"></i>
                        <p class="fs12">有效期</br>{{yueCard.expireTimeCN}}</p>
                    </li>
                    <li class="pd10 mgr10" v-if="juanCard.name" @click="payClassClick(3,juanCard.id)" v-bind:class="{commonBg: payClassActvie == 3}">
                        <p class="fs14">{{juanCard.typeCN}}</p>
                        <p class="fs16 mgt10">{{juanCard.name}}</p>
                        <i class="img imgurl03"></i>
                        <p class="fs12">有效期</br>{{juanCard.endDateCN}}</p>
                    </li>
                    <li class="pd10 mgr10" @click="payClassClick(4,0)" v-bind:class="{commonBg: payClassActvie == 4}">
                        <p class="fs14">支付</p>
                        <p class="fs14">
                            <i class=""></i>
                        </p>
                        <p class="fs16 mgt10">微信支付</p>
                        <i class="img imgurl02"></i>
                    </li>
                </ul>
            </div>
            <div class="box-footer pdb10">
                <div class="fs14 mgb20">还需要支付
                    <span class="fs24 mgl10">¥{{payNum}}</span>
                </div>
                <div class="fs12">点击确认下单，即已同意
                    <span class="color-yellow">《大盒子服务协议》</span>
                </div>
                <div class="common-btn mgt10" @click="getPay">确认下单</div>
                <div class="fs12 mgt10">
                    <span class="color-yellow">购买月卡</span>洗车无限次</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cardClassList: [],
                ciCard: {},
                yueCard: {},
                juanCard: {},

                cardClassActvie: '',
                payClassActvie: '',
                payClassId: '',
                payCardId: '',
                

                payNum: 0,
            };
        },
        mounted: function () {
            this.getCarClass();
        },
        methods: {
            // 洗车机可用项目
            getCarClass: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/scan/deviceservice.json',
                    params = {
                        deviceId: 1002,
                    },
                    succeed = function (res) {
                        self.cardClassList = res.data.data;
                        self.getPayClass(res.data.data[0].id, res.data.data[0].salePrice)
                    };
                self.$axiosGet(url, params, succeed);
            },
            // 获取可用支付方式
            getPayClass: function (id, p) {
                console.log(id, p)
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/couponcard/querymatches.json',
                    params = {
                        serviceId: id,
                        price: p
                    },
                    succeed = function (res) {
                        if (res.data.status == 0) {
                            self.payNum = p;
                            self.ciCard = res.data.data.countCard ? res.data.data.countCard : {};
                            self.yueCard = res.data.data.timeCardList ? res.data.data.timeCardList : {};
                            self.juanCard = res.data.data.coupon ? res.data.data.coupon : {};
                            self.cardClassActvie = id;
                        } else {
                            self.$mint.MessageBox('提示', res.data.message);
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
            // 支付方式选择
            payClassClick: function (key,id) {
                this.payClassActvie = key;
                // 计算支付金额
                this.payNum = 0;
                this.payClassId = id;
            },
            // 支付
            getPay: function () {
                var pType;
                switch (this.payClassActvie) {
                    case 1:
                        pType = 2;
                        break;
                    case 2:
                        pType = 2;
                        break;
                    case 3:
                        pType = 1;
                        break;
                    case 4:
                        pType = 3;
                        break;
                    default:
                        break;
                }

                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/scan/cwpay.json',
                    params = {
                        serviceId: this.cardClassActvie,
                        deviceId: 1002,
                        payType: pType,
                        couponId: this.payClassActvie==3?this.payClassId:'',
                        cardId:  this.payClassActvie==1 || this.payClassActvie==2?this.payClassId:'',
                    },
                    succeed = function (res) {
                        self.$router.push({path: '/AttentionMatters', query: {orderId: res.data.data.orderId}})
                    };
                self.$axiosGet(url, params, succeed);
            },
        }
    }
</script>

<style scoped>
    .box-footer {
        padding-top: 2rem;
        background: #fff;
        text-align: center;
    }

    .box-header-class li {
        float: left;
        width: 40%;
        border-radius: 0.5rem;
        padding: 1rem 0;
        -moz-box-shadow: 1px 1px 1px #d3d3d3;
        -webkit-box-shadow: 1px 1px 1px #d3d3d3;
        box-shadow: 1px 1px 1px #d3d3d3;
    }

    .box-content-class li {
        text-align: center;
        float: left;
        border-radius: 0.5rem;
        -moz-box-shadow: 1px 1px 1px #d3d3d3;
        -webkit-box-shadow: 1px 1px 1px #d3d3d3;
        box-shadow: 1px 1px 1px #d3d3d3;
    }
</style>