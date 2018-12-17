// page/fooddetail/fooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
console.log(id);

    wx.request({
      url: 'http://localhost:24380/Food/GetFoodByID?id=' + id,
      method: 'GET',
      success: function (res) {

        that.setData({
          res_data: res.data
        })
      }
    })
  },

})