<template>
    <div class="app">
        <div class="box">
            <div class="box-header tac pd10">
                <div class="box-header-btn l">
                    <img src="../assets/icon_Customerservice.png" alt="" style="width: 2rem;">
                </div>
                <div class="box-header-btn r fs12">
                    <img src="../assets/icon_Customerservice.png" alt="" style="width: 2rem;">
                </div>
                <div class="">
                    <img src="../assets/Progressbar.png" alt="" style="width: 20rem;"> </div>
                <div class="box-header-text fs18">{{time}}</div>
            </div>
            <div class="box-footer tac mgt20 pdb10">
                <h3 class="common-title">洗车注意事项</h3>
                <ul class="box-footer-text fs12">
                    <li>1.请将车停在黄线内，并回正方向盘，以免发生刮擦；</li>
                    <li>2.洗车期间，严禁打开车窗或车门；</li>
                    <li>3.请勿倒车进入大盒子，以免影响洗车效果；</li>
                    <li>4.洗车期间，请坐在车内或站在大盒子2米外，防止安全隐患；</li>
                    <li>5.车辆尺寸限制：高度
                        <2.3米，宽度<2.4米，长度<5.5米；</li>
                            <li>6.请收好超长加装件，以免洗车时损坏；</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                carStatus: '',
                time: 0,
            };
        },
        mounted: function () {
            // 确认机器正常开始洗车

        },
        methods: {

            // 洗车机可用项目
            getCarStart: function () {
                var self = this,
                    url = 'http://192.168.0.144/wxcw/scan/docw.json',
                    params = {
                    },
                    succeed = function (res) {
                        if (res.data.status === 0) {
                            self.time = res.data.data.totalTime;
                            var int = setInterval(function () {
                                self.time--;
                                self.$set([self.time], 'time', self.time)
                                if (self.time == 0) {
                                    self.btnActive = false;
                                    clearInterval(int)
                                }
                            }, 1000)
                        } else {
                            self.$mint.MessageBox('提示', res.data.message);
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
            getCarStatus: function () {
                var self = this,
                    url = 'http://192.168.0.144/wxcw/scan/washstatus.json',
                    params = {
                        orderId: '',
                    },
                    succeed = function (res) {
                        if (res.data.status === 0) {
                            // 0洗车尚未开始 1洗车中 2洗车结束 3洗车机故障
                            if (res.data.washStatus)

                                switch (res.data.washStatus) {
                                    case 0:
                                        break;
                                    case 1:
                                        break;
                                    case 2:
                                        break;
                                    case 3:
                                        break;
                                    default:
                                        break;
                                }
                        } else {
                            self.$mint.MessageBox('提示', res.data.message);
                        }
                    };
                self.$axiosGet(url, params, succeed);
            }
        }
    }
</script>

<style scoped>
    .box-header {
        background: #fff;
        padding-top: 3rem;
    }

    .box-header-btn {
        height: 2rem;
        position: absolute;
        top: 2rem;
    }

    .box-header-btn.l {
        left: 2rem;
    }

    .box-header-btn.r {
        right: 2rem;
    }

    .box-header-text {
        height: 8rem;
        width: 8rem;
        line-height: 8rem;
        border-radius: 10rem;
        background: #f39800;
        position: absolute;
        top: 9rem;
        left: 50%;
        margin-left: -4rem;
    }

    .box-footer {
        background: #fff;
    }

    .box-footer-text {
        font-size: 1.2rem;
        line-height: 2rem;
        text-align: left;
        padding-left: 3rem;
    }
</style>