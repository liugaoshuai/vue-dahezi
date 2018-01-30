<template>
    <div class="app">
        <div class="box">
            <div class="box-content mgb20 pd10">
                <div class="tac mgtb10">
                    <div class="common-tab clearfix tac">
                        <a href="" class="active">极速清洗</a><a href="">养护清洗</a>
                    </div>
                </div>
                <ul class="box-content-class clearfix mgt10">
                    <li>
                        <div class="card-month common-bg mgb10">
                            <div class="card-month-logo">
                                <img src="../assets/logo_small.png" alt="" style="width: 4.5rem;">
                            </div>
                            <div class="card-month-title fs18">{{cardDetailObj.title}}</div>
                            <div class="card-month-explain fs14">{{cardDetailObj.explain}}</div>
                        </div>
                    </li>
                    <li>
                        <div class="card-month common-bg mgb10">
                            <div class="card-month-logo">
                                <img src="../assets/logo_small.png" alt="" style="width: 4.5rem;">
                            </div>
                            <div class="card-month-title fs18">{{cardDetailObj.title}}</div>
                            <div class="card-month-explain fs14">{{cardDetailObj.explain}}</div>
                        </div>
                    </li>
                    <li>
                        <div class="card-month common-bg">
                            <div class="card-month-logo">
                                <img src="../assets/logo_small.png" alt="" style="width: 4.5rem;">
                            </div>
                            <div class="card-month-title fs18">{{cardDetailObj.title}}</div>
                            <div class="card-month-explain fs14">{{cardDetailObj.explain}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="common-footer-index clearfix">
                <div class="fl wbf50 tac"><i></i><span class="fs12">办卡</span></div>
                <div class="fl wbf50 tac"><i></i><span class="fs12">我的</span></div>
            </div> -->
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