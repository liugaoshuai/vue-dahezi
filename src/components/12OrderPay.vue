<template>
    <div>
        <div class="mgb20 bgbai">
                <mt-cell title="支付名称" :value="cardDetailObj.name"></mt-cell>
                <mt-cell title="支付金额" :value="cardDetailObj.salePrice"></mt-cell>
                <mt-cell title="选择车辆" :value="payCar"></mt-cell>
        </div>
        <div class="tac">
            <a href="#" class="common-btn">微信支付</a>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            payCar: '', // 选择车辆

            cardDetailObj: {},
            
        };
    },
    mounted: function() {
        if (this.$route.query.urlItem) {
            this.cardDetailObj = JSON.parse(decodeURIComponent(this.$route.query.urlItem))
            console.log(this.cardDetailObj)
        } 
    },
    components: {
    },
    methods: {
    }
}
</script>
