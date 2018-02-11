<template>
    <div>
        <div class="mgb20 bgbai">
            <div v-for="item in carArr"
                 :key="item.carNo"
                 @click="delCar(item)">
                <mt-cell title="车牌号"
                         :value="item.carNo"></mt-cell>
            </div>
            <div class="carNumber">
                <mt-field label="新增车牌号"
                          placeholder="点击输入车牌号"
                          v-model="carNumber"
                          v-show="addCarNumber"></mt-field>
            </div>
        </div>
        <div class="tac">
            <a href="#"
               class="common-btn"
               @click="addCarNumber = true"
               v-show="!addCarNumber">添加</a>
            <a href="#"
               class="common-btn"
               @click="addPlateNumber"
               v-show="addCarNumber">确定</a>
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

        // 获取车牌
        getPlateNumber: function () {
            var self = this,
                url = 'http://test.yixiutong.cn/wxcw/customer/listcar.json',
                params = {
                },
                succeed = function (res) {
                    self.carArr = res.data.data;
                };
            self.$axiosGet(url, params, succeed);
        },
        // 添加车牌
        addPlateNumber: function () {
            var self = this;
            var carNumberReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
            if (!carNumberReg.test(this.carNumber)) {
                self.$mint.MessageBox('请输入正确的车牌号码');
                return false;
            }
            self.addCarNumber = false;
            var url = 'http://test.yixiutong.cn/wxcw/customer/addcar.json',
                params = {
                    carNo: this.carNumber,
                },
                succeed = function (res) {
                    self.getPlateNumber();
                };
            self.$axiosGet(url, params, succeed);
        },
        delCar: function (obj) {
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
