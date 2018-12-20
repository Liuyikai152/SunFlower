var app=new getApp();
var util = require('../../utils/util.js');

Page({

  onLoad: function (options) {
    var that = this;
    var shopId = options.id;
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
          console.log(data.data)
          that.setData({
            data_data: data.data
          })
        }
      })
  },

  data: {

    collect1: "已收藏",

    goodsList: [
      {
        id: 'hot',
        classifyName: '川菜',
        goods: [1, 2, 3, 4, 5]
      },
      {
        id: 'new',
        classifyName: '炒菜',
        goods: [1, 3]
      },
      {
        id: 'vegetable',
        classifyName: '快餐',
        goods: [1, 6, 5]
      },
      {
        id: 'mushroom',
        classifyName: '盖饭',
        goods: [2, 7, 8, 9]
      },
      {
        id: 'food',
        classifyName: '凉菜',
        goods: [3, 4]
      }
    ],

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
    this.setData({
      classifySeleted: this.data.goodsList[0].id
    });
  },
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data_data) {
      var data_data = this.data_data;
      count += this.data.cart.list[id];
      total += data_data * this.data.cart.list[id];
    }
    this.data_data.count = count;
    this.data_data.total = total;
    this.setData({
      cart: this.data_data
    });
  },
  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
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

