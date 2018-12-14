function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 转换地址数据
 * */ 
function replacePhone(arr,isreplace){
  var newAddr =[]
  for(let i = 0 ; i < arr.length; i++){
    if(isreplace){
      let phone = arr[i].phone
      arr[i].phone = phone.replace(phone.substring(3,7),'****')
    }
    newAddr[i] = arr[i].name + ' ' + arr[i].phone + '\n' + arr[i].province + arr[i].city + arr[i].addr
  }
  
  return newAddr
}





const constant = require("./constant.js");
const storage = require("./storage.js");

function isPhone(phone) {
  if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
    return false;
  }
  return true;
}

function showSuccessToast(config) {
  wx.showToast({
    title: config.title,
    icon: 'success',
    mask: true,
    duration: constant.duration,
    success: config.success
  });
}

function showFailToast(config) {
  wx.showToast({
    title: config.title,
    image: '../../images/info.png',
    mask: true,
    duration: constant.duration,
    success: config.success
  });
}
module.exports = {
  formatTime: formatTime,
  replacePhone : replacePhone,
  isPhone: isPhone,
  showSuccessToast: showSuccessToast,
  showFailToast: showFailToast
}
