var app = getApp();

Page({

  evaluate: function () {
    wx.navigateTo({
      url: '/page/mine/comment/comment',
    })

  },
  collect: function () {
    wx.navigateTo({
      url: '/page/mine/collect/collect',
    })
  },
  
  addres: function () {
    wx.navigateTo({
      url: '/page/user/user',
    })
  },

store:function(){
  wx.navigateTo({
    url: '/page/foods/foods',
  })
  
},

  order: function () {
    wx.navigateTo({
      url: '/page/order/order',
    })

  },

  // details: function () {
  //   wx.navigateTo({
  //     url: '/page/mine/details/details',
  //   })

  // },

edit_addr: function () {
    wx.navigateTo({
      url: '/page/edit_addr/edit_addr',
    })

  }
});

