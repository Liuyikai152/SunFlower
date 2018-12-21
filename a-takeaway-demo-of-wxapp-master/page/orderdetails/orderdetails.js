// page/UserOrder/UserOrder.js

var app = getApp()


Page({

  data: {
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
    currentCity: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderid = options.id;
    console.log(orderid);
    wx.request({
      url: 'http://localhost:24380/Order/GetOrder?id=' + orderid,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          res_data: res.data
        })
      }
    })
  },




  onScroll: function (e) {
    if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
  },
  toNearby: function () {
    var self = this;
    self.setData({
      scrollIntoView: 'nearby'
    });
    self.setData({
      scrollIntoView: null
    });
  },



})