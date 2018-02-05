<template>
    <div class="app">
        <div class="box">
            <div class="box-header mgb20 pd10">
                <div class="tac mgtb10">
                    <div class="common-tab clearfix tac">
                        <a href="javascript:void(0)"
                           @click="getCardList(item.id)"
                           v-for="item in cardClassArr"
                           :class="{active: active == item.id}">{{item.name}}</a>
                    </div>
                </div>
                <h3 class="common-title">请选择次卡</h3>
                
                <ul class="box-header-class clearfix">
                    <li class="tac active fl" @click="goDetail">
                        <div class="img imgurl05"
                             v-for="item in cardArrTest"
                             :key="item.id">
                            <!-- <p class="fs16"><span class="fs48">{{item.limitCount}}</span>次</p>
                            <p class="fs16">¥{{item.salePrice}}</p>
                            <p class="fs12 mgt10">有效期{{item.title}}天</p> -->
                        </div>
                    </li>
                </ul>
                <h3 class="common-title">请选择月卡</h3>
                <ul class="box-content-class clearfix mgt10">
                    <li class="tal active" @click="goDetail">
                        <div class="img imgurl06"
                             v-for="item in cardMonthArrTest"
                             :key="item.id">
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="common-footer clearfix">
            <div class="footer-box pdr">
                <div class="img imgurl07 fl"></div><div class="fl footer-text">办卡</div>
            </div>
            <div class="footer-box pdl">
                <div class="img imgurl08 fl"></div><div class="fl footer-text">我的</div>
            </div>
            <div class="footer-saoyisao clearfix">
                <div class="img imgurl09 fl"></div><div class="fl footer-text">扫码洗车</div>
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
            cardArrTest: [
                {
                    limitCount: '24',
                    salePrice: '370',
                    title: '360',
                }
            ],
            cardMonthArrTest: [
                {
                    limitCount: '24',
                    salePrice: '370',
                    title: '360',
                },
            ],
            active: '',
            

        };
    },
    mounted: function () {
        this.getCardClass();
    },
    methods: {
        getCardClass: function () {
            var self = this;
            var url = 'http://test.yixiutong.cn/cwtest/goods/getservice.json',
                params = {
                },
                succeed = function (res) {
                    self.cardClassArr = res.data.data;
                    if(self.cardClassArr[0].id){
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
                    self.cardArr = res.data.data;
                };
            self.$axiosGet(url, params, succeed);

            var url1 = 'http://test.yixiutong.cn/cwtest/goods/getcards.json',
                params1 = {
                    serviceId: id,
                    type: 1,
                },
                succeed1 = function (res) {
                    self.cardArr = res.data.data;
                };
            self.$axiosGet(url1, params1, succeed1);
        },
        goDetail: function () {
            this.$router.push({
                                path: './CardDetail', 
                            })
        },
    }
}
</script>