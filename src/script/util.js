

// 获取url里面指定值
let getQueryString = function (key, href) {
  href = href || window.location.search;
  var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
  return match && match[1] && decodeURIComponent(match[1]) || '';
};

// 储存根据二维码获取信息的fun
let getLogin = function (that) {
  if (!that.$store.state.jSessionId) {
    let url = window.location.href;
    let jSessionId = getQueryString('jSessionId', url);
    let deviceId = getQueryString('deviceId', url);

    that.$store.state.jSessionId = jSessionId;
    that.$store.state.deviceId = deviceId;
  }
}

let getLoginTest = function (that) {
  var self = that,
    url = 'http://test.yixiutong.cn/wxcw/ulogin.json',
    params = {
      storeId: 1004,
      mobile: 18668008363,
    },
    succeed = function (res) {
      if (res.data.status == 0) {
        self.$store.state.jSessionId = res.data.data;
        self.$store.state.deviceId = 1002;
        self.deviceId = 1002;
      } else {
        self.$mint.MessageBox(res.data.message);
      }
    };
  self.$axiosGet(url, params, succeed);
}


// 检查客户是否存在订单
let isUserOrder = function (that) {
  var self = that,
    url = self.$api.deviceorder,
    params = {
      deviceId: self.$store.state.deviceId,
    },
    succeed = function (res) {
      console.log('订单已支付，是否继续洗车？')
      // 正在洗车
      if (res.data.data.workingOrderId > 0) {
        self.$mint.MessageBox.confirm('存在正在洗车的订单，是否继续洗车？').then(action => {
          self.$store.state.orderId = res.data.data.workingOrderId;
          self.$router.push({
            path: '/NewCleaningCar'
          })
          return false;
        });
      }
      if (res.data.data.pendingOrderId > 0) {
        self.$mint.MessageBox.confirm('订单已支付，是否继续洗车？').then(action => {
          self.$store.state.orderId = res.data.data.pendingOrderId;
          self.$router.push({
            path: '/NewIsStopCar'
          })
          return false;
        });
      }
    };
  self.$axiosGet(url, params, succeed);
}

// 检查洗车机状态是否正常
let isCarWasherNormal = function (that) {
  var self = that,
    url = that.$api.devicestatus,
    params = {
      deviceId: that.$store.state.deviceId,
    },
    succeed = function (res) {
      if (res.data.data.isFree != 1) {
        self.$mint.MessageBox(res.data.message);
        return false;
      }
    };
  self.$axiosGet(url, params, succeed);
}

// 检查车辆是否停好
let isStopRight = function (that) {
  var self = that,
    url = that.$api.carready,
    params = {
      deviceId: that.$store.state.deviceId,
    },
    succeed = function (res) {
      if (res.data.data != 1) {
        self.$mint.MessageBox(res.data.message);
        return false;
      }
    };
  self.$axiosGet(url, params, succeed);
}

module.exports = {
  getQueryString,
  getLogin,
  getLoginTest,
  isUserOrder,
  isCarWasherNormal,
  isStopRight
}