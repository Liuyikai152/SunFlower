// pages/shopcart/shopcart.js

var goodList = []; //购物车
Page({
  /**
   * 页面的初始数据
   */

  data: {

    hasList: false, // 列表是否有数据
    'checked': false,
    'checkAll': false, // 全选状态，默认全选
    'totalCount': 0,
    'totalPrice': 0
  },
  onLoad: function() {
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
      success: function(res) {
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
  // onShow: function () {
  //   var goodList = wx.getStorageSync("goodList")
  //   this.setData({
  //     cartList: false,
  //     goodList: goodList
  //   })
  //   this.cartItems

  // },

  //删除购物车单个缓存
  shanchu: function(e) {

    var goodList = this.data.goodList //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var id = e.currentTarget.dataset.aid
    wx.request({
      url: 'http://localhost:8765/TProduct/DeleteCarts?Id=' + id,
      type: 'GET',
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
  //提示
  // go: function (e) {
  //   this.setData({
  //     goodList: []
  //   })
  //   wx.setStorageSync("goodList", [])
  // },

  //
  order: function() {
    wx.navigateTo({
      url: "/pages/order/order",
    })
  },

  // 跳转至详情页
  navigateDetail: function (e) {
    var id = e.currentTarget.dataset.aid;//获取显示界面的Id值
console.log(id);
    wx.navigateTo({
      url: '../commodity details_spxiangqing/index?id=' + e.currentTarget.dataset.aid
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
    var values = e.detail.value;
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








































// Page({
//   data: {
//     windowWidth: wx.getSystemInfoSync().windowWidth,
//     windowHeight: wx.getSystemInfoSync().windowHeight,
//     hiddenSmallImg: true,
//     countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     productCounts: 1,
//     currentTabsIndex: 0,
//     cartTotalCounts: 0,
//   },