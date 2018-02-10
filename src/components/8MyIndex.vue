<template>
    <div class="my-box">
        <div class="my-header mgb20">
            <div class="my-header-bg"></div>
            <h3 class="common-title tac">您已洗车{{cleanCarNum}}次</h3>
        </div>

        <div class="my-content clearfix">
            <div class="my-content-item" @click="goMyCard">
                <i class="img imgurl12"></i>
                <p>我的卡卷</p>
            </div>
            <div class="my-content-item" @click="goExchangeCode">
                <i class="img imgurl13"></i>
                <p>兑换码</p>
            </div>
            <div class="my-content-item" @click="goMyOrder">
                <i class="img imgurl14"></i>
                <p>我的订单</p>
            </div>
            <a class="my-content-item" href="tel:13777864743">
                <i class="img imgurl15"></i>
                <p>我的客服</p>
            </a>

        </div>

        <div class="common-footer clearfix">
            <div class="footer-box pdr" @click="goCardIndex">
                <div class="img imgurl07 fl"></div>
                <div class="fl footer-text">办卡</div>
            </div>
            <div class="footer-box pdl" @click="goMyIndex">
                <div class="img imgurl08 fl"></div>
                <div class="fl footer-text">我的</div>
            </div>
            <div class="footer-saoyisao clearfix">
                <div class="img imgurl09 fl"></div>
                <div class="fl footer-text">扫码洗车</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cleanCarNum: 0, // 洗车次数
        };
    },
    mounted: function() {
    },
    methods: {
        goExchangeCode: function() {
            this.$router.push({ path: '/ExchangeCode' })
        },
        goMyIndex: function() {
            this.$router.push({ path: '/MyIndex' })
        },
        goCardIndex: function() {
            this.$router.push({ path: '/CardIndex' })
        },
        goMyOrder: function(item) {
            this.$router.push({
                path: './MyOrder',
            })
        },
        goMyCard: function(item) {
            this.$router.push({
                path: './MyCard',
            })
        },

    }
}
</script>