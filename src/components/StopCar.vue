<template>
    <div class="app pd20">
        <div class="box pd20">
            <div class="box-header clearfix tac">
                    <i src="../assets/icon_attention.png" alt="" class="img imgurl01 fl"></i>
                    <span class="fs14 tal fl">请观察前方大圆镜</br>确认车辆停在黄线内并拉手刹</span>
            </div>
            <div class="box-middle tac">
                <div class="mgtb20"><img src="../assets/img_Parking.png" class="box-middle-img" style="width: 16rem;"></div>
                <div class="mgtb20"><img src="../assets/icon_down.png" class="box-middle-img" style="width: 1.5rem;"></div>
                <div class="mgt20"><img src="../assets/icon_Handbrake.png" class="box-middle-img" style="width: 4.8rem;"></div>
            </div>
        </div>
        <div class="tac mgt20">
            <a href="#" class="common-btn" v-show="isCarStopOk" >我已拉手刹</a>
            <a href="#" class="common-btn none" v-show="!isCarStopOk">车辆尚未停车到位</a>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                isCarStopOk: false,
            };
        },

        mounted: function () {
            this.isCarWasherNormal();
       },

        methods: {
            // 检查洗车机状态是否正常
            isCarWasherNormal: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/scan/devicestatus.json',
                    params = {
                        deviceId: 1002,
                    },
                    succeed = function (res) {
                        console.log(res.data.status)
                        if(res.data.status === 0){
                            self.isUserOrder();
                        }else{
                            self.$mint.MessageBox();
                            self.isCarStopOk = false;
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
            // 检查客户是否存在订单
            isUserOrder: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/scan/deviceorder.json',
                    params = {
                        deviceId: 1002,
                    },
                    succeed = function (res) {
                        if(res.data.status === 0){
                            self.isStopRight();
                        }else{
                            self.$mint.MessageBox('提示', '用户存在订单进行跳转=>我的订单');
                            self.isCarStopOk = false;
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
            // 检查客户是否存在订单
            isStopRight: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/scan/carready.json',
                    params = {
                        deviceId: 1002,
                    },
                    succeed = function (res) {
                        if(res.data.status === 0){
                            self.$mint.MessageBox('提示', '用户已经停好车');
                            self.isCarStopOk = true;
                        }else{
                            self.$mint.MessageBox('提示', '用户没有停好车');
                            self.isCarStopOk = false;
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
        }
    }

</script>

<style scoped>
    .box-icon-warn{
        display: inline-block;
        height: 2.5rem;
        width: 2.5rem;
    }
    .box-icon-item{
        height: 4rem;
        display: inline-block;
        margin: 1rem 0;
    }
    h3{
        font-size: 1.8rem;
        text-align: center;
        line-height: 4rem;
        font-weight: normal;
        margin-top: 3.5rem;
        margin-bottom: 1.2rem;
    }
    .box{
        background: #fff;
        border-radius: 1rem;
    }
    .box-header span{
        height: 2.4rem;
        line-height: 2.4rem;
    }
</style>