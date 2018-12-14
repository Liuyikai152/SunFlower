//index.js
//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')

var app = getApp();

Page({
  // 页面初始数据
  data: {
    userData: myData.userData(),
    addrDate: util.replacePhone(myData.userData().addrs, true),
    userInfo: {}
  },
  // 地址编辑
  editAddr: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../edit_addr/edit_addr?addrid=' + e.currentTarget.dataset.addrid
    })
  },

  onShow: function (event) {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
            })
          }
        })
      }
    }); 
//显示用户地址
   wx.getStorage({
     key: 'username',
     success: function(res) {

       wx.getStorage({
         key: 'token',
         success: function(data) {
           wx.request({
             url: 'http://localhost:55345/api/flower/GetAddress?username=' + res.data,
             method: 'GET',
             data: {},
             header: {
               'content-type': 'application/json',
               'Authorization': 'BasicAuth ' + data.data
             },
             success: function (res) {
               console.log(res)
               that.setData({
                 tempValues: res.data,
               })
             }
           })
         },
       })

     },
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  //删除用户地址
deleteaddress:function(e)
  {
    var id = e.currentTarget.dataset.aid; //获取显示界面的商品Id值
    wx.getStorage({
      key: 'username',
      success: function (res) {

        wx.getStorage({
          key: 'token',
          success: function (data) {
            wx.request({
              url: 'http://localhost:55345/api/flower/DeleteAddressByIds?username=' + res.data + '&id=' + id,
              method: 'DELETE',
              data: {},
              header: {
                'content-type': 'application/json',
                'Authorization': 'BasicAuth ' + data.data
              },
              success: function (res) {
                wx.showToast({
                  title: '删除成功',
                })
                that.setData({
                  carts: res.data
                })
              }
            })
          },
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    });
  },
/*当前商品选中事件*/
selectList(e) {
  const index = e.currentTarget.dataset.index;
  let carts = this.data.carts;
  var id = e.currentTarget.dataset.aid; //获取显示界面的商品Id值
  const selected = carts[index].selected;
  carts[index].selected = !selected;
  this.setData({
    carts: carts
  });
  this.getTotalPrice();
},
})
