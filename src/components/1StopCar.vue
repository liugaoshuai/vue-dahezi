<template>
    <div class="app pd20">
        <div class="box pd20">
            <div class="box-header clearfix tac">
                <i src="../assets/icon_attention.png"
                   alt=""
                   class="img imgurl01 fl"></i>
                <span class="fs14 tal fl">请观察前方大圆镜</br>确认车辆停在黄线内并拉手刹</span>
            </div>
            <div class="box-middle tac">
                <div class="mgtb20"><img src="../assets/img_Parking.png"
                         class="box-middle-img"
                         style="width: 16rem;"></div>
                <div class="mgtb20"><img src="../assets/icon_down.png"
                         class="box-middle-img"
                         style="width: 1.5rem;"></div>
                <div class="mgt20"><img src="../assets/icon_Handbrake.png"
                         class="box-middle-img"
                         style="width: 4.8rem;"></div>
            </div>
        </div>
        <div class="tac mgt20">
            <a href="#"
               class="common-btn"
               v-show="isCarStopOk"
               @click="$router.push('./PayCar')">我已拉手刹</a>
            <a href="#"
               class="common-btn none"
               v-show="!isCarStopOk">车辆尚未停车到位</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCarStopOk: false,
        };
    },
    mounted: function () {
        this.isUserOrder();
        if (this.$route.query.deviceId > 0) {
            this.$mint.MessageBox(this.$route.query.deviceId);
        }
        if (this.$route.query.jSessionId > 0) {
            this.$mint.MessageBox(this.$route.query.jSessionId);
        }
    },
    methods: {
        // 检查客户是否存在订单
        isUserOrder: function () {
            var self = this,
                url = 'http://test.yixiutong.cn/cwtest/scan/deviceorder.json',
                params = {
                    deviceId: 1002,
                },
                succeed = function (res) {
                    // 如果存在订单进行跳转
                    if (res.data.data.workingOrderId > 0) {
                        self.isCarStatus(res.data.data.workingOrderId);
                    }else if (res.data.data.pendingOrderId > 0) {
                        self.$mint.MessageBox.confirm('存在已支付，未使用的洗车订单，是否继续？').then(action => {
                            self.$router.push({
                                path: './AttentionMatters',
                                query: {orderId:res.data.data.pendingOrderId}
                            })
                        });
                    }else{
                        self.isCarWasherNormal();
                    }
                };
            self.$axiosGet(url, params, succeed);
        },
        // 检查洗车机状态是否正常
        isCarWasherNormal: function () {
            var self = this,
                url = 'http://test.yixiutong.cn/cwtest/scan/devicestatus.json',
                params = {
                    deviceId: 1002,
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
                url = 'http://test.yixiutong.cn/cwtest/scan/carready.json',
                params = {
                    deviceId: 1002,
                },
                succeed = function (res) {
                    if (res.data.data == 1) {
                        self.isCarStopOk = true;
                    } else {
                        self.$mint.MessageBox('车辆未按照要求停放');
                    }
                };
            self.$axiosGet(url, params, succeed);
        },
        // 查询洗车状态
        isCarStatus: function (id) {
            var self = this,
                url = 'http://test.yixiutong.cn/cwtest/scan/washstatus.json',
                params = {
                    orderId: id,
                },
                succeed = function (res) {
                    var time = res.data.data.leftTime
                    self.$router.push({
                                path: './CleaningCar', 
                                query: { time: time,orderId: id}
                            })
                };
            self.$axiosGet(url, params, succeed);
        },
    }
}

</script>

<style scoped>
.box-icon-warn {
    display: inline-block;
    height: 2.5rem;
    width: 2.5rem;
}

.box-icon-item {
    height: 4rem;
    display: inline-block;
    margin: 1rem 0;
}

h3 {
    font-size: 1.8rem;
    text-align: center;
    line-height: 4rem;
    font-weight: normal;
    margin-top: 3.5rem;
    margin-bottom: 1.2rem;
}

.box {
    background: #fff;
    border-radius: 1rem;
}

.box-header span {
    height: 2.4rem;
    line-height: 2.4rem;
}
</style>