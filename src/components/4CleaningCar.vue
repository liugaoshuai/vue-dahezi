<template>
    <div class="app">
        <div class="box">
            <div class="box-header tac pd10">
                <div class="box-header-btn l">
                    <img src="../assets/icon_Customerservice.png" alt="" style="width: 2rem;" @click="call">
                </div>
                <div class="box-header-btn r fs12">
                    <img src="../assets/icon_buycard.png" alt="" style="width: 2rem;">
                </div>
                <div class="img imgurl04 box-header-text fs18">
                    <span>{{time}}</span>
                </div>
            </div>
            <div class="box-footer tac mgt20 pdb10" v-show="time > 0">
                <h3 class="common-title">洗车注意事项</h3>
                <ul class="box-footer-text fs12">
                    <li>1.请将车停在黄线内，并回正方向盘，以免发生刮擦；</li>
                    <li>2.洗车期间，严禁打开车窗或车门；</li>
                    <li>3.请勿倒车进入大盒子，以免影响洗车效果；</li>
                    <li>4.洗车期间，请坐在车内或站在洗车机外；</li>
                    <li>5.车辆尺寸：高度
                        <2.3米，宽度<2.4米，长度<5.5米；</li>
                            <li>6.请收好超长加装件，以免洗车时损坏；</li>
                </ul>
            </div>
            <div class="box-footer tac mgt20 pdb10" v-show="time == 0">
                <div class="pdtb20">
                    <img src="../assets/logo.png" alt="" style="width: 9.2rem;">
                </div>
                <p class="fs16 mgt10">{{orderType}}</p>
                <p class="fs16 mgt10">
                    <img src="../assets/icon_Storelocation.png" alt="" style="width: 2.2rem;">{{orderAddress}}</p>
                <a class="common-btn mgt10" href="javascript:void(0)" @click="$mint.MessageBox('洗车已完成，请缓慢驶离。');">祝您一路顺风，下周见！</a>
                <p class="fs12 mgt10">{{orderPayTime}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: 1,
                orderId: '', // 洗车订单id
                orderType: '', // 洗车订单
                orderAddress: '', // 洗车地址
                orderPayTime: '', // 订单时间

            };
        },
        mounted: function () {
            // 获取洗车时间开始倒计时
            var self = this;
            if (this.$route.query.time > 0) {
                this.time = this.$route.query.time
            }
            if (this.$route.query.orderId > 0) {
                this.orderId = this.$route.query.orderId
            }
            var int = setInterval(function () {
                self.time--;
                self.$set([self.time], 'time', self.time)
                if (self.time == 0) {
                    clearInterval(int)
                    self.getOrderStatus()
                }
            }, 1000)
        },
        methods: {
            call: function () {
                var self = this;
                self.$mint.MessageBox.confirm('是否拨打客服热线？').then(action => {
                    // 调用微信接口
                    self.$axiosGet(url, params, succeed);
                });
            },
            getOrderStatus: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/scan/washstatus.json',
                    params = {
                        orderId: this.orderId,
                    },
                    succeed = function (res) {
                        self.orderType = res.data.data.order.itemName;
                        self.orderAddress = res.data.data.storeAddress;
                        self.orderPayTime = res.data.data.order.payTimeCNDT;

                    };
                self.$axiosGet(url, params, succeed);
            },
        }
    }
</script>

<style scoped>
    .box-header {
        background: #fff;
        padding-top: 3rem;
    }

    .box-header-btn {
        height: 2rem;
        position: absolute;
        top: 2rem;
    }

    .box-header-btn.l {
        left: 2rem;
    }

    .box-header-btn.r {
        right: 2rem;
    }

    .box-footer {
        background: #fff;
    }

    .box-footer-text {
        font-size: 1.2rem;
        line-height: 2rem;
        text-align: left;
        padding-left: 3rem;
    }

    .box-header-text {
        line-height: 18.5rem;
    }
</style>