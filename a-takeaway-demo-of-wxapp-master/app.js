var server = require('./utils/server');
App({
	onLaunch: function () {
		
		
	},
	onShow: function (add) {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		hasLogin: false,
  }
		
	});
  wx.login({
    success: function (res) {
      console.log(res.code)
      if (res.code) {
        wx.request({
          url: 'http://localhost:24380/Users/Login',
          data: {
            code: res.code
          },
          success: function (res) {
            var set = wx.setStorage(  {
              key: 'token',
              data: res.data.session_key,
              success: function (res) {

              },
              fail: function (res) { },
              complete: function (res) { },
            })
          
          }
        })
      }
    }
})
