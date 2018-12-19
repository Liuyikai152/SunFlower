
var app = getApp();

Page({

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:24380/Collect/GetCollects',
      method: 'GET',
      success: function (res) {
       
        that.setData({
          res_data: res.data
        }) 
      }
    })
  },

  //删除购物车单个缓存
  shanchu: function (e) {

    var id = e.currentTarget.dataset.aid
    wx.request({
      url: 'http://localhost:24380/Collect/DeleteCollect?id=' + id,
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: '取消收藏成功!',
        })
      }
    })
  
    this.onLoad();
  },


   
 
})