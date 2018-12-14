var app = getApp();
var server = require('../../../utils/server');
Page({
  data: {
    filterId: 1,
    searchWords: '',
    placeholder: '大龙虾',
    shops: app.globalData.shops
  },

  onLoad:function(options){
    var self=this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({

          url: 'http://localhost:24380/Store/GetStores',
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + res.data
          },
          success: function (res) {

            self.setData({
              shops: res.data,
              // list: that.data.navSectionItems
            })
          }
        })
      },
    });

    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({

          url: 'http://localhost:24380/Store/GetStoresSales',
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'Authorization': 'BasicAuth ' + res.data
          },
          success: function (res) {

            self.setData({
              stores: res.data,
              // list: that.data.navSectionItems
            })
          }
        })
      },
    });

  },

    onShow: function () {
      //this.setData({
      //	showResult: false
      //});
    },
    inputSearch: function (e) {
      this.setData({
        searchWords: e.detail.value
      });
    },
    doSearch: function() {
      this.setData({
        showResult: true
      });
    },


 

  
  tapFilter: function (e) {
    switch (e.target.dataset.id) {
      case '1':
        this.data.shops.sort(function (a, b) {
          return a.id > b.id;
        });
        break;
      // case '2':
      //   this.data.shops.sort(function (a, b) {
      //     return a.sales < b.sales;
      //   });
      //   break;
      // case '3':
      //   this.data.shops.sort(function (a, b) {
      //     return a.distance > b.distance;
      //   });
      //   break;
    }
    this.setData({
      filterId: e.target.dataset.id,
      shops: this.data.shops
    });
  }
});

