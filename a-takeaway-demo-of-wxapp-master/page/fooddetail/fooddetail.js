// page/fooddetail/fooddetail.js
var util = require('../../utils/util.js');
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    wx.request({
      url: 'http://localhost:24380/Food/GetFoodByID?id=' + id,
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          res_data: res.data
        })
      }
    })
  },


  addshop: function (event) {

    var Foodid = event.currentTarget.id;
    var random = Math.random().toString(36).substr(2, 15);

    wx.request({
      url: 'http://localhost:24380/Food/GetFoodByID?id=' + Foodid,
      method: 'GET',
      success: function (resdate) {
        var FoodNumber = resdate.data[0].FoodNumber;
        var storenumber = resdate.data[0].StoreNumber;
        var Price = resdate.data[0].FoodSprice;

        //查询用户信息
        wx.request({
          url: 'http://localhost:24380/api/users/GetUsers',
          method: 'GET',
          success: function (resaa) {

            var UserID = resaa.data[0].ID;
            var AddressID = resaa.data[0].UserAddressID;
            var userphone = resaa.data[0].UserPhone;
            var time = util.formatTime(new Date());

            wx.request({
              url: 'http://localhost:24380/TrolleyDetail/GetTrolleyByNumber',
              method: 'get',
              data: {
                TrolleyNumber: "GWC" + FoodNumber
              },
              success: function (res) {


                if (res.data > 0) {
                  //添加购物车
                  wx.request({
                    url: 'http://localhost:24380/Trolley/AddTrolley',
                    method: 'POST',
                    data: {
                      trolleynumber: "GWC" + FoodNumber,
                      userid: UserID,
                      storenumber: storenumber,
                      foodnumber: FoodNumber,
                      createtime: time,
                      money: Price,
                      userphone: userphone,
                      addressid: AddressID
                    },
                    success: function () {
                      wx.showToast({
                        title: '添加购物车成功!',
                      })
                    }
                  })

                  //添加购物车详情
                  wx.request({
                    url: 'http://localhost:24380/TrolleyDetail/AddTrolleyDetails',
                    method: 'POST',
                    data: {
                      trolleynumber: "GWC" + FoodNumber,
                      userid: UserID,

                      foodnumber: FoodNumber,
                      createtime: time,
                      prices: Price,
                      num: 1,
                      money: Price * 1
                    },
                    success: function (resd) {
                      console.log(resd);
                      if (resd.data <= 0) {
                        wx.showToast({
                          title: '添加购物车详情失败!',
                        })
                      }
                    }
                  })
                }
                else {
                  wx.showToast({
                    title: '您以添加到购物车,请查看购物车',
                  })
                }
              }
            })



          }
        })
      }
    })



  },

})