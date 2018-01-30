<template>
        <div class="app">
            <div class="bgbai pd10">
                <div class="img imgurl06"></div>
                <h3 class="fs18 common-title">{{cardDetailObj.title}}</h3>
                <div><mt-cell title="有效期" :value="cardDetailObj.outTime"></mt-cell></div> 
                <div><mt-cell title="有效使用门店" :value="cardDetailObj.shopCount"></mt-cell></div> 
            </div>
            <div class="bgbai pd10 mgt20">
                <h3 class="fs18 common-title">会员权益</h3>
            </div>
            <div class="common-footer-btn">
                <div class="fs16  border">合计金额：<span class="color-yellow fs24">{{paymentNum}}</span></div>
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