<template>
    <div class="">
        <mt-field label="兑换码" placeholder="请输入兑换码" v-model="username"></mt-field>
        <div class="tac mgt20">
            <a href="#"
               class="common-btn" @click="getExchangecCoupon">立即兑换</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
        };
    },
    mounted: function () {
    },
    methods: {
        // 检查客户是否存在订单
        getExchangecCoupon: function () {
            var self = this,
                url = 'http://test.yixiutong.cn/cwtest/couponcard/exchangecoupon.json',
                params = {
                    code: this.username,
                },
                succeed = function (res) {
                    // 如果存在订单进行跳转
                    self.$mint.MessageBox('兑换成功');
                };
            self.$axiosGet(url, params, succeed);
        },
    }
}

</script>