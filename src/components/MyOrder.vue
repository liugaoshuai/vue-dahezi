<template>
    <div id="myorder">
        <mt-navbar v-model="orderType">
            <mt-tab-item id="1">洗车</mt-tab-item>
            <mt-tab-item id="2">会员卡</mt-tab-item>
            <mt-tab-item id="3">已取消</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="orderType">
            <mt-tab-container-item id="1">
                <div v-for="item in orderListA" :key="item.id" class="order-item" v-if="orderListA.length > 0">
                    <p class="fs12">订单编号：{{item.orderNo}}</p>
                    <p class="fs18">{{item.itemName}}</p>
                    <p class="fs18">{{item.payTypeName}}</p>
                    <p class="fs18">{{item.storeName}}</p>
                    <p class="fs12">支付时间：{{item.payTimeCNDT}}</p>
                    <p class="fs12 order-status">{{item.statusName}}</p>
                    <p class="fs18 order-pay">¥{{item.salePrice}}</p>
                    <a class="common-btn" v-if="item.status == 0" @click="goCleanCar(item.id)">继续洗车</a>
                </div>
                <div  v-if="orderListA.length == 0" class="common-queshen">
                <img src="http://p3xltibgs.bkt.clouddn.com/img_noorder.png" alt="" class="img-queshen">
                <p>没有洗车订单</p>
            </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div v-for="item in orderListB" :key="item.id" class="order-item" v-if="orderListB.length > 0">
                    <p class="fs12">订单编号：{{item.orderNo}}</p>
                    <p class="fs18">{{item.itemName}}</p>
                    <p class="fs18">{{item.payTypeName}}</p>
                    <p class="fs18">{{item.storeName}}</p>
                    <p class="fs12">支付时间：{{item.payTimeCNDT}}</p>
                    <p class="fs12 order-status">{{item.statusName}}</p>
                    <p class="fs18 order-pay">¥{{item.salePrice}}</p>
                </div>
                <div  v-if="orderListB.length == 0" class="common-queshen">
                <img src="http://p3xltibgs.bkt.clouddn.com/img_noorder.png" alt="" class="img-queshen">
                <p>没有会员卡订单</p>
            </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div v-for="item in orderListC" :key="item.id" class="order-item" v-if="orderListC.length > 0">
                    <p class="fs12">订单编号：{{item.orderNo}}</p>
                    <p class="fs18">{{item.itemName}}</p>
                    <p class="fs18">{{item.payTypeName}}</p>
                    <p class="fs18">{{item.storeName}}</p>
                    <p class="fs12">支付时间：{{item.payTimeCNDT}}</p>
                    <p class="fs12 order-status">{{item.statusName}}</p>
                    <p class="fs18 order-pay">¥{{item.salePrice}}</p>
                </div>
                <div  v-if="orderListC.length == 0"  class="common-queshen">
                <img src="http://p3xltibgs.bkt.clouddn.com/img_noorder.png" alt="" class="img-queshen">
                <p>没有已取消订单</p>
            </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderType: '1', // 订单类型
                orderListA: [],
                orderListB: [],
                orderListC: [],

            };
        },
        watch: {
        },
        mounted: function () {
            this.getMyOrderListA();
            this.getMyOrderListB();
            this.getMyOrderListC();
        },
        methods: {
            goCleanCar: function (id) {
                localStorage.setItem('orderId', JSON.stringify(id));
                this.$goRouter('./NewIsStopCar');
            },
            getMyOrderListA: function () {
                var self = this,
                    url = this.$api.orders,
                    params = {
                        orderType: 1,
                    },
                    succeed = function (res) {
                        res.data.data.forEach(item => {
                            if (item.payType == 1) {
                                item['payTypeName'] = '优惠劵';
                            }
                            if (item.payType == 2) {
                                item['payTypeName'] = '月卡';
                            }
                            if (item.payType == 3) {
                                item['payTypeName'] = '年卡';
                            }
                            if (item.payType == 4) {
                                item['payTypeName'] = '微信';
                            }

                            if (item.status == 0) {
                                item['statusName'] = '未处理';
                            }
                            if (item.status == 1) {
                                item['statusName'] = '处理中';
                            }
                            if (item.status == 2) {
                                item['statusName'] = '已结束';
                            }
                            if (item.status == 3) {
                                item['statusName'] = '已撤销';
                            }

                        })
                        self.orderListA = res.data.data;
                    };
                self.$axiosGet(url, params, succeed);
            },
            getMyOrderListB: function () {
                var self = this,
                    url = this.$api.orders,
                    params = {
                        orderType: 2,
                    },
                    succeed = function (res) {
                        res.data.data.forEach(item => {
                            if (item.payType == 1) {
                                item['payTypeName'] = '优惠劵';
                            }
                            if (item.payType == 2) {
                                item['payTypeName'] = '月卡';
                            }
                            if (item.payType == 3) {
                                item['payTypeName'] = '年卡';
                            }
                            if (item.payType == 4) {
                                item['payTypeName'] = '微信';
                            }

                            if (item.status == 0) {
                                item['statusName'] = '未处理';
                            }
                            if (item.status == 1) {
                                item['statusName'] = '处理中';
                            }
                            if (item.status == 2) {
                                item['statusName'] = '已结束';
                            }
                            if (item.status == 3) {
                                item['statusName'] = '已撤销';
                            }

                        })
                        self.orderListB = res.data.data;
                    };
                self.$axiosGet(url, params, succeed);
            },
            getMyOrderListC: function () {
                var self = this,
                    url = this.$api.orders,
                    params = {
                        orderType: 1,
                        status: 3
                    },
                    succeed = function (res) {
                        res.data.data.forEach(item => {
                            if (item.payType == 1) {
                                item['payTypeName'] = '优惠劵';
                            }
                            if (item.payType == 2) {
                                item['payTypeName'] = '月卡';
                            }
                            if (item.payType == 3) {
                                item['payTypeName'] = '年卡';
                            }
                            if (item.payType == 4) {
                                item['payTypeName'] = '微信';
                            }

                            if (item.status == 0) {
                                item['statusName'] = '未处理';
                            }
                            if (item.status == 1) {
                                item['statusName'] = '处理中';
                            }
                            if (item.status == 2) {
                                item['statusName'] = '已结束';
                            }
                            if (item.status == 3) {
                                item['statusName'] = '已撤销';
                            }

                        })
                        self.orderListC = res.data.data;
                    };
                self.$axiosGet(url, params, succeed);
            },
        }
    }
</script>