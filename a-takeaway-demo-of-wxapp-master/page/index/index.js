var app = getApp();
var server = require('../../utils/server');

Page({
	data: {	
    filterId: 1,
		address: '海淀区',
    // imgUrls: [
    //   '/imgs/菜品图片/扇贝.jpg',
    //   '/imgs/菜品图片/加州牛肉面.jpg',
    //   '/imgs/菜品图片/披萨.jpg'
    // ],
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
	  currentCity:"",
		shops: app.globalData.shops
	},


	onLoad: function (options) {
		var self = this;


    this.getLocation();
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
  
	},

  getLocation: function () {

    var page = this

    wx.getLocation({

      type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 

      success: function (res) {

        // success  

        var longitude = res.longitude

        var latitude = res.latitude

        page.loadCity(longitude, latitude)

      }

    })

  },

  loadCity: function (longitude, latitude) {

    var page = this

    wx.request({

      url: 'https://api.map.baidu.com/geocoder/v2/?ak=LGQAj4ejuWXqyUj6WQYCH934Gq8Z0385&location=' + latitude + ',' + longitude + '&output=json',

      data: {},

      header: {

        'Content-Type': 'application/json'

      },

      success: function (res) {

        // success  

        console.log(res);

        var city = res.data.result.addressComponent.district;

        page.setData({ currentCity: city });

      },

      fail: function () {

        page.setData({ currentCity: "获取定位失败" });

      },



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
	tapSearch: function () {
    wx.navigateTo({ url: '/page/index/search/search'});
	},

  GetStoreSales:function (){
  
  
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
	tapFilter: function (e) {
		switch (e.target.dataset.id) {
			case '1':
				this.data.shops.sort(function (a, b) {
					return a.id > b.id;
				});
				break;
			// case '2':
			// 	this.data.stores.sort(function (a, b) {
         
      //     return a.daysale < b.daysale;
			// 	});
			// 	break;
	
	
		}
		this.setData({
			filterId: e.target.dataset.id,
     
			shops: this.data.shops
		});
	},

});

