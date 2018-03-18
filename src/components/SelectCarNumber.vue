<template>
  <div id="mycar" v-show="myCarShow">
    <mt-radio title="选择车辆" v-model="storeId" align="right" :options="carList"></mt-radio>
    <div class="tac mgt10">
      <a href="#" class="common-btn" @click="goPay">继续支付</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        carList: [],
      };
    },
    mounted: function () {
      if (this.$route.query.urlItem) {
        this.cardDetailObj = JSON.parse(decodeURIComponent(this.$route.query.urlItem))
      }
      this.getUserinfo();
      this.getMyCar();
    },
    methods: {
      getUserinfo: function () {
        var self = this,
          url = this.$api.userinfo,
          params = {},
          succeed = function (res) {
            if (res.data.status == 0) {
              self.phone = res.data.data.user.mobile
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      goXieyi: function () {
        this.$router.push({
          path: './Dahezi',
        })
      },
      goOrderPay: function () {
        if (this.isAgreement) {
          this.$mint.MessageBox('请同意服务协议');
          return false;
        }
        if (!this.phone) {
          this.$mint.MessageBox.confirm('请绑定手机号').then(action => {
            this.$router.push({
              path: '/MyPhone',
              query: {}
            })
          });
          return false;
        }
        var urlItem = encodeURIComponent(JSON.stringify(this.cardDetailObj))
        if (this.cardDetailObj.type == 1) {
          this.myCarShow = true;
        } else {
          this.$router.push({
            path: '/OrderPay',
            query: {
              urlItem: urlItem,
            }
          })
        }
      },
      getMyCar: function () {
        var self = this;
        var url = this.$api.listcar,
          params = {

          },
          succeed = function (res) {
            self.carList = [];
            if (res.data.data.length > 0) {
              res.data.data.forEach(item => {
                self.carList.push(item.carNo)
              })
            }else{
              
            }
          };
        self.$axiosGet(url, params, succeed);
      },
      goPay: function () {
        var urlItem = encodeURIComponent(JSON.stringify(this.cardDetailObj))
        this.$router.push({
          path: '/OrderPay',
          query: {
            urlItem: urlItem,
            carId: this.$storeId,
          }
        })
      }
    }
  }

</script>
