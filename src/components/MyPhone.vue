<template>
  <div id="myphone">
    <div class="mgb20 bgbai">

      <div class="carNumber none-border">
        <mt-field label="手机号" placeholder="点击输入手机号" v-model="phoneValue"></mt-field>
      </div>
      <div class="carNumber">
        <mt-field label="验证码" placeholder="点击输入验证码" v-model="ruleValue"></mt-field>
      </div>
    </div>
    <div class="tac">
      <a href="javascript:void(0);" class="common-btn" v-bind:class="{none: btnActive}" @click="getRule">
        发送验证码
        <span v-if="btnActive">( {{time}}s )</span>
      </a>
      <a href="javascript:void(0);" class="common-btn" @click="getPhone">确定</a>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        phoneValue: '',
        ruleValue: '',
        time: 60,
        btnActive: false,
      };
    },
    mounted: function () {
    },
    components: {
    },
    methods: {
      // 倒计时
      timeOut: function () {
        var self = this;
        var int = setInterval(function () {
          self.time--;
          self.$set([self.time], 'time', self.time)
          if (self.time == 0) {
            self.btnActive = false;
            clearInterval(int)
          }
        }, 1000);
      },
      // 获取验证码
      getRule: function () {
        if (this.btnActive) {
          return false;
        }
        var carNumberReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (!carNumberReg.test(this.phoneValue)) {
          this.$mint.MessageBox('请输入正确的手机号码');
          return false;
        }
        var self = this,
          url = this.$api.sendsmscode,
          params = {
            mobile: this.phoneValue,
          },
          succeed = function (res) {
            if (res.data.status == 0) {
              self.btnActive = true;
              self.timeOut();
            }
          };
        self.$axiosGet(url, params, succeed);
      },

      // 获取车牌
      getPhone: function () {
        var self = this,
          url = this.$api.bindmobile,
          params = {
            mobile: this.phoneValue,
            smsCode: this.ruleValue,
          },
          succeed = function (res) {
            if(res.data.status == 0){
              self.$mint.MessageBox('手机绑定成功');
              self.$router.push({ path: '/MyIndex' })
            }
          };
        self.$axiosGet(url, params, succeed);
      },

    }
  }
</script>