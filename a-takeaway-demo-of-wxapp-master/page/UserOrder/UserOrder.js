// page/UserOrder/UserOrder.js

var app = getApp()
const util = require('../../utils/util.js');
var server = require('../../utils/server');
Page({

data:{
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



  handleSubmit: function (event) {
    var delivery_content = event.detail.value.delivery_content;
    var StoreNumber = event.detail.value.delivery_StoreNumber;
    console.log(StoreNumber);

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