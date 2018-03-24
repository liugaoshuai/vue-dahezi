

let getQueryString = function (key, href) {
  href = href || window.location.search;
  var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
  return match && match[1] && decodeURIComponent(match[1]) || '';
}

let getLogin = function (that) {
  let url = window.location.href;
  let jSessionId = getQueryString('jSessionId', url);
  let deviceId = getQueryString('deviceId', url);
  if(deviceId){
    localStorage.setItem('deviceId', JSON.stringify(deviceId));
  }
  if(jSessionId){
    localStorage.setItem('jSessionId', JSON.stringify(jSessionId));
  }
}
// // 获取code
// const wxLogin =  () => {
//   return new Promise((resolve, reject) => {
//     wx.login({
//       success: function (res) {
//         resolve(res)
//       }
//     });
//   });
// };



let getLoginTest = function (that) {
  var self = that,
    url = 'http://test.yixiutong.cn/wxcw/ulogin.json',
    params = {
      storeId: 1004,
      mobile: 15867112230,
    },
    succeed = function (res) {
      if (res.data.status == 0) {
        localStorage.setItem('jSessionId', JSON.stringify(res.data.data));
        localStorage.setItem('deviceId', JSON.stringify(1002));
      }
    };
  self.$axiosGet(url, params, succeed);
}


// 检查客户是否存在订单
function isUserOrder(that) {
  let deviceId = JSON.parse(localStorage.getItem('deviceId'));
  var self = that,
    url = self.$api.deviceorder,
    params = {
      deviceId: deviceId,
    },
    succeed = function (res) {
      // 正在洗车
      if (res.data.data.workingOrderId > 0) {
        self.$mint.MessageBox.confirm('存在正在洗车的订单，是否继续洗车？').then(action => {
          localStorage.setItem('orderId', JSON.stringify(res.data.data.workingOrderId));
          self.$router.push({
            path: '/NewCleaningCar'
          })
          return false;
        });
      }
      if (res.data.data.pendingOrderId > 0) {
        self.$mint.MessageBox.confirm('订单已支付，是否继续洗车？').then(action => {
          localStorage.setItem('orderId', JSON.stringify(res.data.data.pendingOrderId));
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
function isCarWasherNormal(that) {
  let deviceId = JSON.parse(localStorage.getItem('deviceId'));

  var self = that,
    url = that.$api.devicestatus,
    params = {
      deviceId: deviceId,
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
function isStopRight(that) {
  let deviceId = JSON.parse(localStorage.getItem('deviceId'));

  var self = that,
    url = that.$api.carready,
    params = {
      deviceId: deviceId,
    },
    succeed = function (res) {
      if (res.data.data != 1) {
        self.$mint.MessageBox(res.data.message);
        return false;
      }
    };
  self.$axiosGet(url, params, succeed);
}

export default {
  getQueryString,
  getLogin,
  getLoginTest,
}