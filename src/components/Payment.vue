<template>
    <div class="app">
        <div class="box pd10">
            <ul class="mgb20">
                <li class="clearfix">
                    <div class="fl">left</div>
                    <div class="fr">left</div>
                </li>
                <li class="clearfix">
                    <div class="fl">left</div>
                    <div class="fr">left</div>
                </li>
                <li class="clearfix">
                    <div class="fl">left</div>
                    <div class="fr">left</div>
                </li>
                <li class="clearfix">
                    <div class="fl">left</div>
                    <div class="fr">left</div>
                </li>
                <li class="clearfix">
                    <div class="fl">left</div>
                    <div class="fr">left</div>
                </li>
            </ul>
            <div class="tac">
                <div class="common-btn">确认支付</div>
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
    .box {
        background: #fff;
    }

    li {
        line-height: 4.8rem;
        border-bottom: 1px solid #999;
        height: 4.8rem;
        font-size: 1.6rem;
    }
</style>