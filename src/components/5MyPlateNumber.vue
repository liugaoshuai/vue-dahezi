<template>
    <div>
        <div class="mgb20 bgbai">
            <div v-for="item in carArr" :key="item.carNo" @click="delCar(item)"><mt-cell title="车牌号" :value="item.carNo"></mt-cell></div> 
            
            <div class="carNumber"
                 @click="onTypewriting">
                <mt-field label="新增车牌号" placeholder="点击输入车牌号" v-model="carNumber" v-show="addCarNumber"></mt-field>
            </div>
        </div>
        <div class="tac">
            <a href="#" class="common-btn"  @click="addCarNumber = true" v-show="!addCarNumber">添加</a>
            <a href="#" class="common-btn"  @click="addPlateNumber" v-show="addCarNumber">确定</a>
               
        </div>
        <div id="main">
            <!-- ②确定按钮 -->
            <div class="typer"
                 v-show="showTyper!=0">
                <!-- ③输入键盘 -->
                <ul v-show="showTyper==1">
                    <!-- ④省的输入 -->
                    <li class="typer-pro"
                        v-for="item in provinces"
                        :class="{'is-closeType':item=='关闭'}"
                        @click="input(item)">{{item}}</li>
                </ul>
                <ul v-show="showTyper==2">
                    <!-- ⑤字母数字的输入 -->
                    <li class="typer-num"
                        v-for="item in keyNums"
                        :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}"
                        @click="input(item)">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            showTyper: 0,    //输入法的值，0表示不显示，1表示显示省输入键盘，2表示显示数字字母输入键盘  
            provinces: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",    //省  
                "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
                "津", "贵", "云", "桂", "琼", "青", "新", "藏",
                "蒙", "宁", "甘", "陕", "闽", "赣", "湘", "关闭"],
            keyNums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",     //数字字母  
                "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                "A", "S", "D", "F", "G", "H", "J", "K", "L",
                 "Z", "X", "C", "V", "B", "N", "M", "删除","确定",],
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
        onOfferTap: function () {   //对最终结果进行判断  
            
        },
        onTypewriting: function () {    //点击输入框时，弹出键盘  
            this.showTyper = 1;
            this.changeTyper();
        },
        changeTyper: function () {    //判断输入的车牌号处于什么状态，为空？已输入第一个值（即省）？输入省之后的值？  
            if (this.carNumber.length >= 1) {
                this.showTyper = 2;
            }
            if (this.carNumber.length == 0) {
                this.showTyper = 1;
            }
        },
        input: function (item) {    //键盘点击事件，传入键盘本身的值  
            if (item == '确定' || item == '关闭') {    //判断是否点击了关闭按钮  
                this.showTyper = 0;
                return;
            }
            if (item == '删除') {    //判断是否点击了删除按钮  
                this.carNumber = this.carNumber.slice(0, -1);
                this.changeTyper();
                return;
            }
            if (this.carNumber.length < 7) {    //判断当前的车牌号的数目是否合法，还未超出7位则可继续输入  
                this.carNumber = this.carNumber + item;
                this.changeTyper();
            } else {
                console.log('车牌号码超出正常范围');
            }
        },
        
        // 获取车牌
        getPlateNumber: function () {
            var self = this,
                    url = 'http://test.yixiutong.cn/cwtest/customer/listcar.json',
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
            var url = 'http://test.yixiutong.cn/cwtest/customer/addcar.json',
                    params = {
                        carNo: this.carNumber,
                    },
                    succeed = function (res) {
                        self.getPlateNumber();
                    };
                self.$axiosGet(url, params, succeed);
        },  
        delCar: function (obj){
            var self = this;
            self.$mint.MessageBox.confirm('是否删除此条车辆信息？').then(action => {
                     var url = 'http://test.yixiutong.cn/cwtest/customer/delcar.json',
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

<style scoped>
.typer {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    padding: 1rem 0;
    text-align: center;
}
.typer li {
    display: inline-block;
    height: 2.5rem;
    color: #333;
    text-align: center;
    line-height: 2.5em;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
}
.typer li.typer-pro {
    width: 2.5rem;
    margin: 0.2rem;
}
.typer li.typer-num {
    width: 2.5rem;
    margin: 0.2rem;
}
.typer li.typer-num.is-OK {
    width: 2.5rem;
    margin: 0.2rem;
}


</style>