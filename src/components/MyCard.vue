<template>
    <div id="mycard">
        <mt-navbar v-model="orderType">
            <mt-tab-item id="1">会员卡</mt-tab-item>
            <mt-tab-item id="2">洗车劵</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="orderType">
            <mt-tab-container-item id="1" class="pd10">
                <div class="card-item-month" v-for="(item,index) in orderList" :key="item.id" v-show="orderList.length > 0">
                    <img src="http://p3xltibgs.bkt.clouddn.com/bg04.png" alt="" class="item-bg">
                    <img src="http://p3xltibgs.bkt.clouddn.com/logo_small.png" alt="" class="img-logo_small item-logo">
                    <p class="item-name">{{item.serviceName}}</p>
                    <p class="item-end" v-if="item.expireLeftDay>0 && item.type == 1">剩余{{item.expireLeftDay}}天</p>
                    <p class="item-end" v-if="item.expireLeftDay>0 && item.type == 2">剩余{{item.expireLeftDay}}天</p>
                    <p class="item-end" v-if="item.expireLeftDay>0 && item.type == 3">剩余{{item.leftCount}}次</p>
                    <p class="item-end" v-if="item.expireLeftDay < 1">已过期</p>
                    <p class="item-date">有效期：{{item.expireTimeCN}}</p>
                </div>
                <div v-show="orderList.length == 0" class="common-queshen">
                    <img src="http://p3xltibgs.bkt.clouddn.com/img_card.png" alt="" class="img-queshen">
                    <p>还没有会员卡</p>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2" class="pd10">
                <div class="card-item-month" v-for="(item,index) in orderList" :key="item.id" v-show="orderList.length > 0">
                    <img src="http://p3xltibgs.bkt.clouddn.com/bg04.png" alt="" class="item-bg">
                    <img src="http://p3xltibgs.bkt.clouddn.com/logo_small.png" alt="" class="img-logo_small item-logo">
                    <p class="item-name">{{item.serviceName}}</p>
                    <p class="item-end" v-if="item.expireLeftDay>0">剩余{{item.expireLeftDay}}天</p>
                    <p class="item-end" v-else>{{item.statusCN}}</p>
                    <p class="item-date">有效期：{{item.endDateCN}}</p>
                </div>
                <div v-show="orderList.length == 0" class="common-queshen">
                    <img src="http://p3xltibgs.bkt.clouddn.com/img_nocoupon.png" alt="" class="img-queshen">
                    <p>还没有洗车劵</p>
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
                orderList: [],

            };
        },
        watch: {
            orderType(v) {
                if (v == 1) {
                    this.getMyOrderList();
                } else {
                    this.getMyCardList();
                }
            }
        },
        mounted: function () {
            this.getMyOrderList()
        },
        methods: {
            getMyOrderList: function () {
                var self = this,
                    url = this.$api.usercards,
                    params = {
                    },
                    succeed = function (res) {
                        self.orderList = res.data.data;
                    };
                self.$axiosGet(url, params, succeed);
            },
            getMyCardList: function () {
                var self = this,
                    url = this.$api.usercoupons,
                    params = {
                    },
                    succeed = function (res) {
                        self.orderList = res.data.data;
                    };
                self.$axiosGet(url, params, succeed);
            },
        }
    }
</script>