<template>
    <div class="app">
        <mt-navbar v-model="orderType">
        <mt-tab-item id="1">会员卡</mt-tab-item>
        <mt-tab-item id="2">洗车劵</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="orderType">
            <mt-tab-container-item id="1" class="pd10">
                <div class="img imgurl06 card-item-month"
                        v-for="item in orderList"
                        :key="item.id">
                    <p class="fs24">{{item.serviceName}}</p>
                    <p class="fs14 mgt10">{{item.name}}</p>
                    <p class="fs14 mgt10">有效期{{item.expireTimeCN}}</p>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2" class="pd10">
                <div class="img imgurl06 card-item-month"
                        v-for="item in orderList"
                        :key="item.id">
                    <p class="fs24">{{item.serviceName}}</p>
                    <p class="fs14 mgt10">{{item.name}}</p>
                    <p class="fs14 mgt10">有效期{{item.endDateCN}}</p>
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
    watch:{
        orderType(v){
            if(v==1){
                this.getMyOrderList();
            }else{
                this.getMyCardList();
            }
        }
    },
    mounted: function() {
        this.getMyOrderList()
    },
    methods: {
        getMyOrderList: function () {
            var self = this,
                url = 'http://test.yixiutong.cn/wxcw/couponcard/usercards.json',
                params = {
                },
                succeed = function (res) {
                    self.orderList = res.data.data;
                };
            self.$axiosGet(url, params, succeed);
        },
        getMyCardList: function () {
            var self = this,
                url = 'http://test.yixiutong.cn/wxcw/couponcard/usercoupons.json',
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