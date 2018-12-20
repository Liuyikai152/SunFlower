// pages/shopcart/shopcart.js
var app = getApp();
var util = require('../../utils/util.js');

var goodList = []; //购物车
Page({
  /**
   * 页面的初始数据
   */

  data: {
    
    hasList: true, // 列表是否有数据
    'checked': false,
    'checkAll': false, // 全选状态，默认全选
    'totalCount': 0,
    'totalPrice': 0
  },
  onLoad: function() {
  

  },
  
  onShow:function(){
    var that = this;

    //用户编号
    wx.request({
      url: 'http://localhost:24380/api/users/GetUsers',
      method: 'GET',
      success: function (resaa) {
        var UserID = resaa.data[0].ID;

        //购物车
        wx.request({
          url: 'http://localhost:24380/TrolleyDetail/GetTrolleyDetails',
          method: 'GET',
          data: {
            Id: UserID,
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              goodList: res.data,
              // hasList:true,length
            })
          }

        })
      }
    })

  },

  //删除购物车单个缓存
  shanchu: function(e) {

    var goodList = this.data.goodList //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var id = e.currentTarget.dataset.aid

   
    wx.request({
      url: 'http://localhost:24380/TrolleyDetail/deleteTrolleyDetails?ID='+ id,
      method: 'GET',
      success: function(res) {

      }
    })

    goodList.splice(index, 1)
    this.setData({
      goodList: goodList
    });
    if (goodList.length) {
      this.setData({
        cartList: false
      });
    }
    this.calculateTotal()
    wx.setStorageSync("goodList", goodList)




  },
  
  order: function() {
  
      //查询用户信息
      wx.request({
        url: 'http://localhost:24380/api/users/GetUsers',
        method: 'GET',
        success: function (resaa) {

          var UserID = resaa.data[0].ID;
          var AddressID = resaa.data[0].UserAddressID;
          //购物车
          wx.request({
            url: 'http://localhost:24380/TrolleyDetail/GetTrolleyDetails',
            method: 'GET',
            data: {
              Id: UserID,
            },
            success: function (resuser) {

              for (var i = 0; i < resuser.data.length; i++) {
                
                var trolleyid = resuser.data[i].ID;
                var foodnumber = resuser.data[i].FoodNumber;
                var storenumber = resuser.data[i].StoreNumber;
                var userid = UserID;
                var ordermoney = resuser.data[i].FoodSprice * resuser.data[i].Num;
                var addersid = AddressID;
                var userphone = resuser.data[i].UserPhone;
                var createtime = util.formatTime(new Date());
                var num = resuser.data[i].Num;
                var orderstate = 11; 
                var ordernumber = "DD" + util.formatTime(new Date());
               
                //添加订单详情
                wx.request({
                  url: 'http://localhost:24380/UserOrder/AddOrder',
                  method: 'POST',
                  data: {
                    trolleyid: trolleyid,
                    foodnumber: foodnumber,
                    storenumber: storenumber,
                    userid: userid,
                    addersid: addersid,
                    userphone: userphone,
                    ordermoney: ordermoney,
                    createtime: createtime,
                    num: num,
                    orderstate: orderstate,  
                    ordernumber: ordernumber
                  },
                  success: function () {
                    wx.showToast({
                      title: '添加订单成功!',
                    })
                  }
                })

              
              }
           
              setTimeout(function () {
                //添加订单
                wx.request({
                  url: 'http://localhost:24380/UserOrder/UserOrdersAdd?OrderNumber=' + ordernumber,
                  method: 'POST',

                  success: function (res) {
                    console.log(res.data)

                    if (res.data.length > 0) {
                      wx.showToast({
                        title: '添加订单成功!',
                      })
                    }

                  }
                })
              }, 1000) //延迟时间 这里是1秒

              //添加订单后删除购物车 
              wx.request({
                url: 'http://localhost:24380/TrolleyDetail/DeleteTrolleyDetail',
                method: 'GET',
                success: function (res) {
                
                }
              })
         
               wx.navigateTo({
                url: "/page/order/order",
              })

           
            }
         })
        }



        })

   this.onLoad();
      
  },

  // 跳转至详情页
  navigateDetail: function (e) {
    var id = e.currentTarget.dataset.aid;//获取显示界面的Id值

    wx.navigateTo({
      url: '/page/fooddetail/fooddetail?id=' + e.currentTarget.dataset.aid
    })
  },



  //  * 计算商品总数

  calculateTotal: function() {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.Num;
        totalPrice += good.Num * good.FoodSprice;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },


  /**
   * 用户点击商品减1
   */
  subtracttap: function(e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].Num;
    if (count <= 1) {
      return;
    } else {
      goodList[index].Num--;
      //修改数量
      wx.request({
        url: 'http://localhost:24380/TrolleyDetail/UptdateTrolleyDetails?num=' + goodList[index].Num + "&&id=" + goodList[index].AID,
        method:'post',
        data:{
          num: goodList[index].Num,
          id: goodList[index].AID
        },
        success: function (res) {

        }
      })
      this.setData({
        'goodList': goodList
      });
      this.calculateTotal();
    }
  },


  /**
   * 用户点击商品加1
   */
  addtap: function(e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].Num;
    goodList[index].Num++;

      wx.request({
        url: 'http://localhost:24380/TrolleyDetail/UptdateTrolleyDetails?num=' + goodList[index].Num + "&&id=" + goodList[index].AID,
        method: 'POST',
       
        heads: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {

        }
      })
     
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function(e) {
    var checkboxItems = this.data.goodList;
    console.log(checkboxItems);
    var values = e.detail.value;
    console.log(values);
    
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].Id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }


    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }


    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    this.calculateTotal();
  },


  /**
   * 用户点击全选
   */
  selectalltap: function(e) {
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }


    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }


    this.setData({
      'checkAll': checkAll,
      'goodList': goodList
    });
    this.calculateTotal();
  }
          
  })   
      