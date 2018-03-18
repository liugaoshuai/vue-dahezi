import axios from 'axios';


export default {
    install(Vue, options) {
        Vue.prototype.$axiosGet = function (url, params, succeed) {
            var self = this;
            var jSessionId = JSON.parse(localStorage.getItem('jSessionId'));
            url = url + ";jsessionid=" + jSessionId;
            axios({
                url: url,
                params: params,
            }).then(function (res) {
                if (res.data.status == 0) {
                    succeed(res);
                } else {
                    self.$mint.MessageBox(res.data.message);
                }
            }).catch(function (err) {

            });
        };
        // 路由跳转
        Vue.prototype.$goRouter = function (path) {
            this.$router.push({
                path: path,
            })
        };

        Vue.prototype.$formatTime = function (e) {
            // 计算
            var h = 0, i = 0, s = parseInt(e);
            if (s > 60) {
                i = parseInt(s / 60);
                s = parseInt(s % 60);
                if (i > 60) {
                    h = parseInt(i / 60);
                    i = parseInt(i % 60);
                }
            }
            // 补零
            var zero = function (v) {
                return (v >> 0) < 10 ? "0" + v : v;
            };
            return [zero(i), zero(s)].join(":");
        };
    }
}


