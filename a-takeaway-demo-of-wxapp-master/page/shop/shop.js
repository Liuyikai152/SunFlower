var app=new getApp();
var util = require('../../utils/util.js');

Page({

  onLoad: function (options) {
    var that = this;
    var shopId = options.id;
     
     //查看单个店铺菜品类别
    wx.request({
      url: 'http://localhost:24380/FoodType/StoreFoodType?sid='+shopId,
      method: "get",
      success: function (res) {
       
        that.setData({

          goodsList: res.data
        })
      }
    })

    //查看单个店铺
    wx.request({
      url: 'http://localhost:24380/Store/GetStore?id=' + shopId,
      method: 'GET',
      success: function (res) {

        that.setData({
          res_data: res.data
        })
      }
    }),
      //查看单个店铺的菜品信息
      wx.request({
        url: 'http://localhost:24380/Food/GetFoods?id=' + shopId,
        method: 'GET',
        success: function (data) {
        
          that.setData({
            data_data: data.data
          })
        }
      })
  },

  data: {

    collect1: "收藏",

  },



  
      //添加收藏方法
  AddShous: function (event) {
    var id = event.currentTarget.id;

 

      //单个店铺编号获取
    wx.request({
      url: 'http://localhost:24380/Store/GetStore?id=' + id,
      method: 'GET',
      success: function (res) {

        var storenumber = res.data[0].StoreNumber;
        var createtime = util.formatTime(new Date());
          //单个用户id获取
        wx.request({
          url: 'http://localhost:24380/api/users/GetUsers',
          method: 'GET',
          success: function (resaa) {
            var UserID = resaa.data[0].ID;

            //根据店铺名称查询  
            wx.request({
              url: 'http://localhost:24380/Collect/GetCollectByID?storenumber=' + storenumber,
              method: 'GET',
              success: function (reshha) {
                console.log(reshha.data.length)
                //如果没有收藏 添加收藏
                if (reshha.data.length == 0) {
                  //添加收藏
                  wx.request({
                    url: 'http://localhost:24380/Collect/AddCollect',
                    method: 'POST',
                    data: {
                      storenumber: storenumber,
                      userid: UserID,
                      createtime: createtime
                    },
                    success: function () {
                      wx.showToast({
                        title: '加入收藏成功!',

                      })
                    }
                  })
                }
                //否则已经收藏
                else {
                  wx.showToast({
                    title: '已经收藏!',

                  })
                }
              }
            })




          }
        })

      }
    })


  },



  onShow: function () {
  
  },
    //根据类别查询
  tapClassify: function (e) {
    var that=this;
    var id = e.target.dataset.id;
    var typeName=e.target.dataset.name;
    console.log(e);
    if(typeName!="菜品"){
    wx.request({
      url: 'http://localhost:24380/Food/StoreGetFoods?id='+id+"&&typeName="+typeName,
      method:'get',
      success:function(res)
      {
        console.log(res.data);

         that.setData({
           data_data:res.data
         })
      }
    })
    }
   
 
  },




//添加购物车方法
  addshop: function (event) {
    //会务菜品编号
    var Foodid = event.currentTarget.id;
    //随机数
    var random = Math.random().toString(36).substr(2, 15);
//根据菜品id查询
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
                

           if(res.data>0){
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
                    money:Price*1
                  },
                  success: function (resd) {
                    console.log(resd);
                    if(resd.data<=0){
                    wx.showToast({
                      title: '添加购物车详情失败!',
                    })
                    }
                  }
                })
              }
              else{
           
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
});

