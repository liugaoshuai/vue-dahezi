<template>
        <div class="app">
            <div class="bgbai pd10">
                <div class="card-month common-bg">
                    <div class="card-month-logo">
                        <img src="../assets/logo_small.png" alt="" style="width: 4.5rem;">
                    </div>
                    <div class="card-month-title fs18">{{cardDetailObj.title}}</div>
                    <div class="card-month-explain fs14">{{cardDetailObj.explain}}</div>
                </div>

                <h3 class="fs18 common-title">{{cardDetailObj.title}}</h3>
                <ul class="fs16">
                    <li class="common-item">
                        <span>有效期</span>
                        <span class="color-yellow fr">{{cardDetailObj.outTime}}天</span>
                    </li>
                    <li class="common-item">
                        <span>使用门店（{{cardDetailObj.shopCount}}）</span>
                        <span class="fr"></span>
                    </li>
                </ul>
            </div>
            <div class="bgbai pd10 mgt20">
                <h3 class="fs18 common-title">会员权益</h3>
            </div>
            <div class="common-footer-btn">
                <div class="fs14 border">合计金额: <span class="color-yellow fs18">{{paymentNum}}</span></div>
                <div class="fs16 cla
                btn common-bg tac">购买</div>
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
        
    </style>