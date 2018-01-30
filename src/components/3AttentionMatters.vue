<template>
    <div class="app pd20">
        <div class="box">
            <div class="box-header clearfix tac">
                <i src="../assets/icon_attention.png"
                   alt=""
                   class="img imgurl01 fl"></i>
                <span class="fs14 tal fl">请观察前方大圆镜</br>确认车辆停在黄线内并拉手刹</span>
            </div>
            <div class="box-middle">
                <h3 class="common-title tac">请确认以下安全事项</h3>
                <ul class="clearfix">
                    <li>
                        <img src="../assets/icon_Stopgear.png"
                             class="box-icon-item">
                        <p>挂P/空档</p>
                    </li>
                    <li>
                        <img src="../assets/icon_Handbrake.png"
                             class="box-icon-item">
                        <p>拉手刹</p>
                    </li>
                    <li>
                        <img src="../assets/icon_Rearviewmirror.png"
                             class="box-icon-item">
                        <p>收后视镜</p>
                    </li>
                    <li>
                        <img src="../assets/icon_Wiper.png"
                             class="box-icon-item">
                        <p>关雨刮</p>
                    </li>
                    <li>
                        <img src="../assets/icon_antenna.png"
                             class="box-icon-item">
                        <p>收天线</p>
                    </li>
                    <li>
                        <img src="../assets/icon_Carwindow.png"
                             class="box-icon-item">
                        <p>关车窗</p>
                    </li>
                </ul>
    
            </div>
            <div class="box-footer">
                <h3 class="common-title tac mgtb10">洗车注意事项</h3>
                <ul class="fs12">
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
        <div class="tac mgt10">
            <a href="javascript:void(0)"
               class="common-btn"
               v-bind:class="{none: btnActive}"
               @click="isCleanCar">我已确认<span v-if="btnActive">( {{time}}s )</span></a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: 9,
            btnActive: true,
        };
    },

    mounted: function () {
        var self = this;
        var int = setInterval(function () {
            self.time--;
            self.$set([self.time], 'time', self.time)
            if (self.time == 0) {
                self.btnActive = false;
                clearInterval(int)
            }
        }, 1000)
    },

    methods: {
        // 下一步
        isCleanCar: function () {
            var self = this;
            if (self.time == 0) {
                self.$mint.MessageBox.confirm('是否开始洗车？').then(action => {
                    var url = 'http://test.yixiutong.cn/cwtest/scan/docw.json',
                        params = {},
                        succeed = function (res) {
                            self.$router.push({
                                path: './CleaningCar', 
                                query: { time: res.data.data.totalTime }
                            })
                        };
                    self.$axiosGet(url, params, succeed);
                });
            }
        },
    },


}

</script>

<style scoped>
.box-icon-item {
    height: 3rem;
    display: inline-block;
    margin: 1rem 0;
}

.box {
    padding: 1rem;
    background: #fff;
    border-radius: 1rem;
}

.box-header span {
    height: 2.4rem;
    line-height: 2.4rem;
}

.box-middle {
    font-size: 1.5rem;
}

.box-middle li {
    width: 33.33%;
    float: left;
    text-align: center;
}

.box-btn {
    text-align: center;
    margin-top: 3rem;
}

.box-btn a {
    display: inline-block;
    cursor: pointer;
    width: 10rem;
    height: 3rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    color: #333;
    text-align: center;
    line-height: 3rem;
    background: #fff;
}

.box-footer ul {
    font-size: 1.2rem;
    line-height: 2rem;
    text-align: left;
}
</style>