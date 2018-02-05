<template>
    <div class="app">
        <div class="card-detail-con">
            <div class="bgbai pd10">
                <div class="img imgurl06"></div>
                <h3 class="fs18 common-title">{{cardDetailObj.title}}</h3>
                <div>
                    <mt-cell title="有效期" :value="cardDetailObj.outTime"></mt-cell>
                </div>
                <!-- <div>
                    <mt-cell title="有效使用门店" :value="cardDetailObj.shopCount"></mt-cell>
                </div> -->
            </div>
            <div class="bgbai pd10">
                <h3 class="fs18 common-title">会员权益</h3>
                <div class="agreement" v-show="cardDetailType == 1">
                    <p>【全年打不样】</p>
                    <p>7x24小时营业，扫码洗车，无推销，有效期内无限次。买卡立即生效。</p>
                    <p class="mgt10">【全国通用】</p>
                    <p>全国大盒子站点通用。</p>
                    <p class="mgt10">【注意事项】</p>
                    <p>洗车期间，请按提示操作，以免发生意外。</p>
                    <p>购买月/季/年卡需绑定手机号，不可转借他人，否则大盒子有权停卡；</p>
                    <p>车辆要求：</p>
                    <p>1. 高＜2.3米，宽＜2.4米，长＜5.5米</p>
                    <p>2. 漆面与车身无破损</p>
                    <p>3. 无额外加装，如导流板、出租车标牌、车顶架等</p>
                    <p>4. 无法清洗敞篷车、开放空间的载货车</p>
                    <p>5. 无法清洗装有长天线的车辆</p>
                </div>
                <div class="agreement" v-show="cardDetailType == 2">
                    <p>【全年打不样】</p>
                    <p>7x24小时营业，扫码洗车，无推销。买卡立即生效。</p>
                    <p class="mgt10">【全国通用】</p>
                    <p>全国大盒子站点通用。</p>
                    <p class="mgt10">【注意事项】</p>
                    <p>洗车期间，请按提示操作，以免发生意外。</p>
                    <p>车辆要求：</p>
                    <p>1. 高＜2.3米，宽＜2.4米，长＜5.5米</p>
                    <p>2. 漆面与车身无破损</p>
                    <p>3. 无额外加装，如导流板、出租车标牌、车顶架等</p>
                    <p>4. 无法清洗敞篷车、开放空间的载货车</p>
                    <p>5. 无法清洗装有长天线的车辆</p>
                </div>
                <div class="agreement" v-show="cardDetailType == 3">
                    <p>【全年打不样】</p>
                    <p>7x24小时营业，扫码洗车，无推销。</p>
                    <p class="mgt10">【全国通用】</p>
                    <p>全国大盒子站点通用。</p>
                    <p class="mgt10">【注意事项】</p>
                    <p>洗车期间，请按提示操作，以免发生意外。</p>
                    <p>车辆要求：</p>
                    <p>1. 高＜2.3米，宽＜2.4米，长＜5.5米</p>
                    <p>2. 漆面与车身无破损</p>
                    <p>3. 无额外加装，如导流板、出租车标牌、车顶架等</p>
                    <p>4. 无法清洗敞篷车、开放空间的载货车</p>
                    <p>5. 无法清洗装有长天线的车辆</p>
                </div>
            </div>
        </div>

        <div class="card-xieyi">
            <i class="img mgr10" :class="{imgurl10:isAgreement, imgurl11:!isAgreement}" @click="isAgreement =! isAgreement"></i>
            <span>同意
                <a href="javascript:void(0);" class="color-yellow" @click="goXieyi">《大盒子洗车服务协议》</a>
            </span>
        </div>

        <div class="common-footer">
            <div class="footer-num">
                <span class="name">合计金额：</span>
                <span class="num">{{paymentNum}}</span>
            </div>
            <div class="footer-btn common-bg">购买</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cardDetailObj: {
                    title: '极速快洗月卡',
                    explain: '6分钟快速清洗',
                    outTime: 30,
                    shopCount: 20,
                },
                paymentNum: 0,
                isAgreement: false, // 是否同意协议
                cardDetailType: 1, // 卡详情类型
            };
        },
        mounted: function () {
        },
        methods: {
            goXieyi: function () {
                this.$router.push({
                    path: './agreement/Dahezifuwuxieyi',
                })
            },
        }
    }
</script>