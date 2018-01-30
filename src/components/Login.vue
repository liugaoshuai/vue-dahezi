<template>
    <div class="app fs16">模拟登陆页</div>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
        mounted: function () {
            this.loginFun();
        },
        methods: {
            loginFun: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/ulogin.json',
                    params = {
                        storeId: 1002,
                        mobile: 18668008363,
                    },
                    succeed = function (res) {
                        self.$store.state.wId = res.data.data;
                        document.cookie="jsessionid="+res.data.data;
                    };
                self.$axiosGet(url, params, succeed);
            }
        }
    }
</script>