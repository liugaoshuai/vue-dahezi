<template>
    <div id="code">
        <div class="img">
            <img src="http://p3xltibgs.bkt.clouddn.com/icon_duihuan.png" alt="" class="img-duihuan">
        </div>
        <input type="text" placeholder="请输入兑换码" v-model="username" class="input"></br>
        <a href="javascript:void(0);" @click="getExchangecCoupon" class="btn">立即兑换</a>
    </div>
</template>

<script>
  import Util from '../script/util.js';

    export default {
        data() {
            return {
                username: '',
            };
        },
        mounted: function () {
            Util.getLogin(this);
        },
        methods: {
            // 检查客户是否存在订单
            getExchangecCoupon: function () {
                var self = this,
                    url = this.$api.exchangecoupon,
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