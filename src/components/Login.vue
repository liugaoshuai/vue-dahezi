<template>
    <div class=""></div>
</template>
<script>
    import { getQueryString } from '../script/util';
    import axios from 'axios';
    export default {
        data() {
            return {
            };
        },
        mounted: function () {
            this.loginFun();
        },
        methods: {

            // 做为入口文件路由分发以及储存deviceId
            loginFun: function () {
                let test = 0; // 0本地1上线
                let url = window.location.href;
                let jSessionId = getQueryString('jSessionId', url);
                if (test == 0) {
                    this.loginTestFun();
                    return false;
                }
                this.$store.state.orderId
                localStorage.setItem('jSessionId', JSON.stringify(jSessionId));

                let deviceId = getQueryString('deviceId', url);
                let routerid = getQueryString('routerId', url);
                localStorage.setItem('deviceId', JSON.stringify(deviceId));
                let path;
                switch (Number(routerid)) {
                    case 0:
                        path = "/CleanCar";
                        break;
                    case 1:
                        path = "/CardIndex";
                        break;
                    case 2:
                        path = "/MyIndex";
                        break;
                    case 3:
                        path = "/ExchangeCode";
                        break;
                    default:
                        break;
                }
                this.$router.push({
                    path: path,
                })
            },

            // 登陆获取用户信息
            loginTestFun: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/wxcw/ulogin.json',
                    params = {
                        storeId: 1004,
                        mobile: 18668008363,
                    },
                    succeed = function (res) {
                        if (res.data.status == 0) {
                            self.$mint.MessageBox('模拟测试登陆');
                            localStorage.setItem('jSessionId', JSON.stringify(res.data.data));
                            localStorage.setItem('deviceId', JSON.stringify(1002));
                            self.$router.push({
                                path: './CleanCar',
                            })
                        } else {
                            self.$mint.MessageBox(res.data.message);
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
        }
    }
</script>