<template>
    <div class="app">
        <div class="box"> 
            <div class="box-header tac pd10">
                <div class="box-header-btn l"><img src="../assets/icon_Customerservice.png" alt="" style="width: 2rem;"></div>
                <div class="box-header-btn r fs12"><img src="../assets/icon_Customerservice.png" alt="" style="width: 2rem;"></div>
                <div class=""><img src="../assets/Progressbar.png" alt="" style="width: 20rem;"> </div>
                <div class="box-header-text fs18">完成洗车</div>
            </div>
            <div class="box-footer tac mgt20 pdb10">
                <div class="pdtb20"><img src="../assets/logo.png" alt="" style="width: 9.2rem;"></div>
                <p class="fs16">极速快洗</p>
                <p class="fs16 mgt10"><img src="../assets/icon_Storelocation.png" alt="" style="width: 2.2rem;">湖州中石油大港路加油站</p>
                <p class="fs18 mgt10"><span>0</span></p>
                <a class="common-btn mgt10">祝您一路顺风，下周见！</a>
                <p class="fs12 mgt10">2017.11.16 12:38</p>
                <!-- <h3>洗车注意事项</h3>
                <ul>
                    <li>1.请将车停在黄线内，并回正方向盘，以免发生刮擦；</li>
                    <li>2.洗车期间，严禁打开车窗或车门；</li>
                    <li>3.请勿倒车进入大盒子，以免影响洗车效果；</li>
                    <li>4.洗车期间，请坐在车内或站在大盒子2米外，防止安全隐患；</li>
                    <li>5.车辆尺寸限制：高度<2.3米，宽度<2.4米，长度<5.5米；</li>
                    <li>6.请收好超长加装件，以免洗车时损坏；</li>
                </ul> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
            };
        },
        mounted: function () {
        },
        methods: {
        }
    }
</script>

<style scoped>
    .box-header{background: #fff;padding-top: 3rem;}
    .box-header-btn{height: 2rem;position: absolute;top: 2rem;}
    .box-header-btn.l{left: 2rem;}
    .box-header-btn.r{right: 2rem;}
    .box-header-text{height: 8rem;width: 8rem;line-height: 8rem;border-radius: 10rem;background: #f39800;position: absolute;top: 9rem;left: 50%;margin-left: -4rem;}
    .box-footer{background: #fff;}
</style>