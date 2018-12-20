var app = getApp();
var server = require('../../utils/server');
var server = require('../../utils/data');
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 

    handleSubmit: function (event) {
 
    var delivery_Number = event.detail.value.delivery_Number;
    var delivery_Name = event.detail.value.delivery_Name;
    var delivery_loction = event.detail.value.delivery_loction;
    var delivery_Title = event.detail.value.delivery_Title;
    var delivery_phone = event.detail.value.delivery_phone;
      var Createtime = event.detail.value.Createtime;
      var Endtime = event.detail.value.Endtime;
      var delivery_StoreType = event.detail.value.delivery_StoreType == false ? "个体" : "连锁";
    var atue=5;
    var state=9;
      console.log(delivery_StoreType);
  
    //申请店铺
    wx.request({
      url: 'http://localhost:24380/Store/AddStore',
      method: 'POST',
      data: {
        StoreNumber: delivery_Number,
        StoreName: delivery_Name,
        Address: delivery_loction,
        StorePhone: delivery_phone,
        Auditing: atue,
        State: state,
        CreateTime: Createtime,
        EditTime: Endtime,
        Conntent: delivery_Title,
        StoreType:delivery_StoreType

      },
      success: function () {
        wx.showToast({
          title: '保存成功!'
        })
      },
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
  
    this.setData({
      time: time
    }); 
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