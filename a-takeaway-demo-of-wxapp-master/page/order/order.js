
var app = getApp();

Page({
  onLoad: function (options) {   
   
  },

  onShow:function()
  {
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
  //删除购物车单个缓存
  shanchu: function (e) {

    var id = e.currentTarget.dataset.aid
    wx.request({
      url: 'http://localhost:24380/Order/DeleteOrder?ID=' + id,
      method: 'GET',
      success: function (res) {

      }
    })
   
  }
})


