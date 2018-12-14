// page/mine/store/store.js
Page({
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:24380/api/store/GetStore',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          sx: res.data
        })
      }
    })
  },
})