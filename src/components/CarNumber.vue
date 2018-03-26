<template>
    <div id="carnumber">
        
        <div class="mgb20 bgbai">
            <div v-for="(item,index) in carArr" :key="item.carNo" @click="delCar(item)" v-if="carArr.length > 0">
                <mt-cell title="车牌号" :value="item.carNo"></mt-cell>
            </div>
            <div v-else class="common-queshen">
                <img src="http://p3xltibgs.bkt.clouddn.com/img_card.png" alt="" class="img-queshen">
                <p>您还没有车辆信息</p>
            </div>
            <div class="carNumber">
                <mt-field label="新增车牌号" placeholder="点击输入车牌号" v-model="carNumber" v-show="addCarNumber"></mt-field>
            </div>
        </div>
        <div class="tac">
            <a href="#" class="common-btn" @click="addNumberBtn" v-show="!addCarNumber">添加</a>
            <a href="#" class="common-btn none" @click="addCarNumber = false" v-show="addCarNumber">取消</a>
            <a href="#" class="common-btn" @click="addPlateNumber" v-show="addCarNumber">确定</a>

        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                carNumber: '',    // 输入的值  
                carArr: [], // 车牌号
                addCarNumber: false,
            };
        },
        mounted: function () {
            this.getPlateNumber()
        },
        components: {
        },
        methods: {
            addNumberBtn: function () {
                if(this.carArr.length == 2){
                    this.$mint.MessageBox('最多添加2个车牌');
                    return false;
                }
                this.carNumber = '';
                this.addCarNumber = true;
            },
            // 获取车牌
            getPlateNumber: function () {
                var self = this,
                    url = 'http://test.yixiutong.cn/wxcw/customer/listcar.json',
                    params = {
                    },
                    succeed = function (res) {
                        self.carArr = res.data.data;
                        if(self.carArr.length == 0){
                            self.addCarNumber = true;
                        }
                    };
                self.$axiosGet(url, params, succeed);
            },
            // 添加车牌
            addPlateNumber: function () {
                var self = this;
                var carNumberReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;

                var num = self.carNumber.toLocaleUpperCase()
                if (!carNumberReg.test(num)) {
                    self.$mint.MessageBox('请输入正确的车牌号码');
                    return false;
                }
                self.addCarNumber = false;
                var url = 'http://test.yixiutong.cn/wxcw/customer/addcar.json',
                    params = {
                        carNo: num,
                    },
                    succeed = function (res) {
                        self.getPlateNumber();
                    };
                self.$axiosGet(url, params, succeed);
            },
            delCar: function (obj) {
                console.log(obj)
                var self = this;
                self.$mint.MessageBox.confirm('是否删除此条车辆信息？').then(action => {
                    var url = 'http://test.yixiutong.cn/wxcw/customer/delcar.json',
                        params = {
                            carId: obj.id,
                        },
                        succeed = function (res) {
                            self.getPlateNumber();
                        };
                    self.$axiosGet(url, params, succeed);
                });

            }

        }
    }
</script>