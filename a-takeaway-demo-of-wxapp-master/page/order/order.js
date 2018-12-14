Page({
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:24380/Order/GetOrders',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          res_data: res.data,
        })
      }
    })
  },
})


