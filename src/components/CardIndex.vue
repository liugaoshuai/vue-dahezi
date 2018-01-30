<template>
    <div class="app">
        <div class="box">
            <div class="box-header mgb20 pd10">
                <h3 class="common-title">请选择次卡</h3>
                <div class="tac mgtb10">
                    <div class="common-tab clearfix tac">
                        <a href="" class="active">极速清洗</a><a href="">养护清洗</a>
                    </div>
                </div>
                <ul class="box-header-class clearfix">
                    <li class="tac active common-bg">
                        <p class="fs16">极速快洗</p>
                        <p class="fs12">6分钟快速清洗</p>
                        <p class="fs24">¥20</p>
                    </li>
                    <li class="tac mgl10">
                        <p class="fs16">极速快洗</p>
                        <p class="fs12">6分钟快速清洗</p>
                        <p class="fs24">¥20</p>
                    </li>
                </ul>
            </div>
            <div class="box-content mgb20 pd10">
                <h3 class="common-title">请选择月卡</h3>
                <div class="tac mgtb10">
                    <div class="common-tab clearfix tac">
                        <a href="" class="active">极速清洗</a><a href="">养护清洗</a>
                    </div>
                </div>
                <ul class="box-content-class clearfix mgt10">
                    <div class="card-month common-bg">
                        <div class="card-month-logo">
                            <img src="../assets/logo_small.png" alt="" style="width: 4.5rem;">
                        </div>
                        <div class="card-month-title fs18">{{cardDetailObj.title}}</div>
                        <div class="card-month-explain fs14">{{cardDetailObj.explain}}</div>
                    </div>
                </ul>
            </div>
            <div class="box-footer pdb10">

            </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                cardDetailObj: {
                        title: '极速快洗月卡',
                        explain: '6分钟快速清洗',
                        outTime: 30,
                        shopCount: 20,
                    },
                    paymentNum: 290,
            };
        },
        mounted: function () {
        },
        methods: {
        }
    }
</script>

<style scoped>
    .box-header,
    .box-content {
        background: #fff;
    }

    .box-footer {
        padding-top: 4rem;
        background: #fff;
        text-align: center;
    }

    .box-header-class li {
        float: left;
        width: 16rem;
        border-radius: 0.5rem;
        padding: 1rem 0;
        -moz-box-shadow: 1px 1px 1px #d3d3d3;
        -webkit-box-shadow: 1px 1px 1px #d3d3d3;
        box-shadow: 1px 1px 1px #d3d3d3;
        /* border: 1px solid #333; */
    }
</style>