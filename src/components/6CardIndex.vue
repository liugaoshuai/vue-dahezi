<template>
    <div class="">
        <div class="">
            <div class="card">
                <div class="tac mgtb10">
                    <div class="common-tab clearfix tac">
                        <a href="javascript:void(0)"
                           @click="getCardList(item.id)"
                           v-for="item in cardClassArr"
                           :class="{active: active == item.id}">{{item.name}}</a>
                    </div>
                </div>
                <div v-show="cardArrTest.length>0">
    
                    <h3 class="common-title">请选择次卡</h3>
                    <ul class="box-header-class clearfix">
                        <li class="tac active fl">
                            <div class="img imgurl05 card-item"
                                 v-for="item in cardArrTest"
                                 :key="item.id"
                                 @click="goDetail(item)">
                                <p class="fs16"><span class="fs48">{{item.limitCount}}</span>次</p>
                                <p class="fs14">¥{{item.salePrice}}</p>
                                <p class="fs14 mgt10">有效期</br>{{item.createTimeCN}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-show="cardMonthArrTest.length>0">
                    <h3 class="common-title">请选择月卡</h3>
                    <ul class="clearfix">
                        <li class="">
                            <div class="img imgurl06 card-item-month"
                                 v-for="item in cardMonthArrTest"
                                 :key="item.id"
                                 @click="goDetail(item)">
                                <p class="fs24">{{item.serviceName}}</p>
                                <p class="fs14 mgt10">¥{{item.salePrice}}</p>
                                <p class="fs14 mgt10">有效期{{item.createTimeCN}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
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
            cardDetailObj: {
                title: '极速快洗月卡',
                explain: '6分钟快速清洗',
                outTime: 30,
                shopCount: 20,
            },
            paymentNum: 290,
            cardClassArr: [],
            cardArr: [],

            cardArrTest: [], // 次卡
            cardMonthArrTest: [], // 月卡
            active: '',


        };
    },
    mounted: function () {
        this.getCardClass();
    },
    methods: {
        goMyIndex: function (){
            this.$router.push({path: '/MyIndex'})
        },
        goCardIndex: function (){
            this.$router.push({path: '/CardIndex'})
        },
        goDetail: function (item){
            var urlItem = encodeURIComponent(JSON.stringify(item))
            this.$router.push({path: '/cardDetail', query: {
                urlItem: urlItem,
            }})
        },
        getCardClass: function () {
            var self = this;
            var url = 'http://test.yixiutong.cn/cwtest/goods/getservice.json',
                params = {
                },
                succeed = function (res) {
                    self.cardClassArr = res.data.data;
                    if (self.cardClassArr[0].id) {
                        self.getCardList(self.cardClassArr[0].id);
                    }

                };
            self.$axiosGet(url, params, succeed);
        },
        getCardList: function (id) {
            this.active = id
            var self = this;
            var url = 'http://test.yixiutong.cn/cwtest/goods/getcards.json',
                params = {
                    serviceId: id,
                    type: 3,
                },
                succeed = function (res) {
                    self.cardArrTest = res.data.data;
                };
            self.$axiosGet(url, params, succeed);

            var url1 = 'http://test.yixiutong.cn/cwtest/goods/getcards.json',
                params1 = {
                    serviceId: id,
                    type: 1,
                },
                succeed1 = function (res) {
                    self.cardMonthArrTest = res.data.data;
                };
            self.$axiosGet(url1, params1, succeed1);
        },
    }
}
</script>