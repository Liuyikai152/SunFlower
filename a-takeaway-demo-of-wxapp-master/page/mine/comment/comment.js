// page/mine/evaluate/evaluate.js
Page({
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:24380/api/Comment/GetComments',
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