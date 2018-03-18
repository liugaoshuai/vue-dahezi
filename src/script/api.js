var url = 'http://test.yixiutong.cn/wxcw/';

exports.devicestatus = url + 'scan/devicestatus.json'; // 1.1洗车机状态查询
exports.deviceorder = url + 'scan/deviceorder.json'; // 1.2获取当前客户洗车状态
exports.carready = url + 'scan/carready.json'; // 1.3确认是否停好车
exports.deviceservice = url + 'scan/deviceservice.json'; // 1.4获取洗车项目
exports.querymatches = url + '/couponcard/querymatches.json'; // 1.5获取洗车项目匹配卡劵
exports.cwpay = url + 'scan/cwpay.json'; // 1.6订单支付
exports.docw = url + 'scan/docw.json'; // 1.7开始洗车 
exports.washstatus = url + 'scan/washstatus.json'; // 1.8查询洗车状态
exports.getpayinfo = url + 'scan/getpayinfo.json'; // 1.9查询订单状态
exports.prepayinfo = url + 'pay/prepayinfo.json'; // 3.11微信支付信息

exports.getservice = url + 'goods/getservice.json'; // 2.1查询门店对应洗车项目
exports.getcards = url + 'goods/getcards.json'; // 2.2查询洗车项目对应月卡或者年卡
exports.buycard = url + 'goods/buycard.json'; // 2.3购买会员卡

exports.usercards = url + 'couponcard/usercards.json'; // 3.6查询会员卡
exports.usercoupons = url + 'couponcard/usercoupons.json'; // 3.7查询洗车劵

exports.orders = url + 'customer/orders.json'; // 3.4查询订单
exports.exchangecoupon = url + 'couponcard/exchangecoupon.json'; // 3.4查询订单
exports.getjsapisign = url + 'scan/getjsapisign.json'; // 获取js

exports.listcar = url + 'customer/listcar.json'; // 3.3
exports.delcar = url + 'customer/delcar.json'; // 3.2
exports.addcar = url + 'customer/addcar.json'; // 3.1

exports.sendsmscode = url + 'sendsmscode.json'; // 3.9
exports.bindmobile = url + 'bindmobile.json'; // 3.10
exports.userinfo = url + 'userinfo.json'; // 3.0











