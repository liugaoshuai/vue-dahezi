<template>
    <div class="card-detail">
        <div class="">
            <div class="">
                <div class="img imgurl06 card-item-month mg0">
                    <p class="fs24">{{cardDetailObj.name}}</p>
                    <p class="fs14 mgt10">¥{{cardDetailObj.salePrice}}</p>
                    <p class="fs14 mgt10">有效期{{cardDetailObj.createTimeCN}}</p>
                </div>
            </div>
            <div class="">
                <h3 class="fs18 common-title">会员权益</h3>
                <div class="agreement" v-show="cardDetailObj.type == 1">
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
                <div class="agreement" v-show="cardDetailObj.type == 2">
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
                <div class="agreement" v-show="cardDetailObj.type == 3">
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
                <span class="num">{{cardDetailObj.salePrice}}</span>
            </div>
            <div class="footer-btn fs18" @click="goOrderPay">购买</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cardDetailObj: {},
            isAgreement: false, // 是否同意协议
        };
    },
    mounted: function() {
            if (this.$route.query.urlItem) {
                this.cardDetailObj = JSON.parse(decodeURIComponent(this.$route.query.urlItem))
                console.log(this.cardDetailObj)
            } 
    },
    methods: {
        goXieyi: function() {
            this.$router.push({
                path: './agreement/Dahezifuwuxieyi',
            })
        },
        goOrderPay: function() {

            if(this.isAgreement){
                this.$mint.MessageBox('请同意服务协议');
                return false;
            }
            var urlItem = encodeURIComponent(JSON.stringify(this.cardDetailObj))
            this.$router.push({path: '/OrderPay', query: {
                urlItem: urlItem,
            }})
        }
    }
}
</script>