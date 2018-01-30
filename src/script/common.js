import axios from 'axios';

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
export default {
    install(Vue, options) {
        Vue.prototype.$axiosGet = function (url, params, succeed) {
            var self = this;

            var cId = getCookie('jsessionid')
            console.log(cId)
            url = url + ";jsessionid=" + cId;
            axios({
                url: url,
                params: params,
            }).then(function (res) {
                if(res.data.status == 0){
                    succeed(res);
                }else{
                    self.$mint.MessageBox(res.data.message);
                }
            }).catch(function (err) {

            });
        }
        Vue.prototype.$axiosGetId = function (url, params, succeed, id) {
            var self = this;
            axios({
                url: url,
                params: params,
            }).then(function (res) {
                succeed(res);
            }).catch(function (err) {

            });
        }
        Vue.prototype.$axiosPost = function (url, data, succeed) {
            var self = this;
            axios({
                method: 'post',
                url: url,
                data: data,
            }).then(function (res) {
                succeed(res);
            }).catch(function (err) {
            });
        }
    }
}


