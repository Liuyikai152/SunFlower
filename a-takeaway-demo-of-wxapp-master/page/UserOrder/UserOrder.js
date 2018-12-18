// page/UserOrder/UserOrder.js

var app = getApp()
const util = require('../../utils/util.js');
Page({


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderid = options.id;
    wx.request({
      url: 'http://localhost:24380/Order/GetOrder?id=' + orderid,
      method: 'GET',
      success: function (res) {
        that.setData({
          res_data: res.data
        })
      }
    })
  },



  handleSubmit: function (event) {
    var delivery_content = event.detail.value.delivery_content;
    var StoreNumber = event.detail.value.delivery_StoreNumber;
    
    wx.request({
      url: 'http://localhost:24380/api/users/GetUsers',
      method: 'GET',
      success: function (resaa) {
        var UserID = resaa.data[0].ID;


        wx.request({
          url: 'http://localhost:24380/api/Comment/AddComment',
          method: 'POST',
          data: {
            Content: delivery_content,
            storenumber: StoreNumber,
            UserID: UserID,
            CommentTime: util.formatTime(new Date())
          },
          success: function () {
            if (delivery_content=="")
            {
              wx.showModal({
                title: '提示',
                content: '请输入评论内容',
              })
            }
            else{
              wx.showToast({
                title: '添加成功!'
              })
            }
           
          },
        })
      }
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})