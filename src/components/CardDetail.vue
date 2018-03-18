<template>
    <div id="carddetail">
        <div class="card-item-month">
            <img src="http://p3xltibgs.bkt.clouddn.com/bg04.png" alt="" class="item-bg">
            <img src="http://p3xltibgs.bkt.clouddn.com/logo_small.png" alt="" class="img-logo_small item-logo">
            <p class="item-name">{{cardDetailObj.serviceName}}</p>
            <p class="item-price">
                <span class="fs14">¥</span>{{cardDetailObj.salePrice}}</p>
            <p class="item-date">有效期：30天 不限次数</p>
        </div>
        <div class="fs12">
            <h3 class="common-title">会员权益</h3>
            <div class="agreement" v-show="cardDetailObj.type == 1">
                <p>【全年打不样】</p>
                <p>7x24小时营业，扫码洗车，无推销，有效期内无限次。买卡立即生效。</p>
                <p class="mgt10">【全国通用】</p>
                <p>全国大盒子站点通用。</p>
                <p class="mgt10">【注意事项】</p>
                <p>洗车期间，请按提示操作，以免发生意外。</p>
                <p>购买月/季/年卡需绑定手机号，不可转借他人，否则大盒子有权停卡；</p>
                <p>车辆要求：</p>
                <p>1. 高＜2.3米，宽＜2.4米，长＜5.5米</p>
                <p>2. 漆面与车身无破损</p>
                <p>3. 无额外加装，如导流板、出租车标牌、车顶架等</p>
                <p>4. 无法清洗敞篷车、开放空间的载货车</p>
                <p>5. 无法清洗装有长天线的车辆</p>
            </div>
            <div class="agreement" v-show="cardDetailObj.type == 2">
                <p>【全年打不样】</p>
                <p>7x24小时营业，扫码洗车，无推销。买卡立即生效。</p>
                <p class="mgt10">【全国通用】</p>
                <p>全国大盒子站点通用。</p>
                <p class="mgt10">【注意事项】</p>
                <p>洗车期间，请按提示操作，以免发生意外。</p>
                <p>车辆要求：</p>
                <p>1. 高＜2.3米，宽＜2.4米，长＜5.5米</p>
                <p>2. 漆面与车身无破损</p>
                <p>3. 无额外加装，如导流板、出租车标牌、车顶架等</p>
                <p>4. 无法清洗敞篷车、开放空间的载货车</p>
                <p>5. 无法清洗装有长天线的车辆</p>
            </div>
            <div class="agreement" v-show="cardDetailObj.type == 3">
                <p>【全年打不样】</p>
                <p>7x24小时营业，扫码洗车，无推销。</p>
                <p class="mgt10">【全国通用】</p>
                <p>全国大盒子站点通用。</p>
                <p class="mgt10">【注意事项】</p>
                <p>洗车期间，请按提示操作，以免发生意外。</p>
                <p>车辆要求：</p>
                <p>1. 高＜2.3米，宽＜2.4米，长＜5.5米</p>
                <p>2. 漆面与车身无破损</p>
                <p>3. 无额外加装，如导流板、出租车标牌、车顶架等</p>
                <p>4. 无法清洗敞篷车、开放空间的载货车</p>
                <p>5. 无法清洗装有长天线的车辆</p>
            </div>
        </div>

        <div id="cardfooter">
            <div class="xieyi">
                <img class="img-icon01" src="http://p3xltibgs.bkt.clouddn.com/icon01.png" v-show="!isAgreement" @click="isAgreement =! isAgreement"></img>
                <img class="img-icon01" src="http://p3xltibgs.bkt.clouddn.com/icon06.png" v-show="isAgreement" @click="isAgreement =! isAgreement"></img>

                <span class="fs12">同意
                    <a href="javascript:void(0);" class="yellow" @click="goXieyi">《大盒子洗车服务协议》</a>
                </span>
            </div>
            <div class="pay">
                <span class="">合计金额：</span>
                <span class="num">{{cardDetailObj.salePrice}}</span>
            </div>
            <div class="btn fs18" @click="goOrderPay">购买</div>
        </div>

        <div id="mycar" v-show="myCarShow">
            <mt-radio title="选择车辆" v-model="storeId" align="right" :options="carList">
            </mt-radio>
            <div class="tac mgt10">
                <a href="#" class="common-btn" @click="goPay" v-if="carList.length > 0">继续支付</a>
                <a href="#" class="common-btn" @click="goCarNumber" v-else>购买月卡请先绑定车辆</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cardDetailObj: {},
                isAgreement: false, // 是否同意协议
                carList: [],
                myCarShow: false,
                storeId: '',
            };
        },
        mounted: function () {
            if (this.$route.query.urlItem) {
                this.cardDetailObj = JSON.parse(decodeURIComponent(this.$route.query.urlItem))
                console.log(this.cardDetailObj)
            }
            this.getMyCar();
        },
        methods: {

            goXieyi: function () {
                this.$router.push({
                    path: './Dahezi',
                })
            },
            goCarNumber: function () {
                this.$router.push({
                    path: './CarNumber',
                })
            },
            goOrderPay: function () {
                if (this.isAgreement) {
                    this.$mint.MessageBox('请同意服务协议');
                    return false;
                }

                var urlItem = encodeURIComponent(JSON.stringify(this.cardDetailObj))
                if (this.cardDetailObj.type == 1) {
                    this.myCarShow = true;
                } else {
                    this.$router.push({
                        path: '/OrderPay', query: {
                            urlItem: urlItem,
                        }
                    })
                }
            },
            getMyCar: function () {
                var self = this;
                var url = this.$api.listcar,
                    params = {

                    },
                    succeed = function (res) {
                        self.carList = [];
                        res.data.data.forEach(item => {
                            self.carList.push(item.carNo)
                        })
                        self.storeId = self.carList[0];
                    };
                self.$axiosGet(url, params, succeed);
            },
            goPay: function () {
                var urlItem = encodeURIComponent(JSON.stringify(this.cardDetailObj))
                this.$router.push({
                    path: '/OrderPay', query: {
                        urlItem: urlItem,
                        carId: this.storeId,
                    }
                })
            }
        }
    }
</script>