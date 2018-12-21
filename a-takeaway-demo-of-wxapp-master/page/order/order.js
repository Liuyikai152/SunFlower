
var app = getApp();

Page({
  onLoad: function (options) {   
  
  },

  onShow:function()
  {
    var that = this;
    wx.request({
      url: 'http://localhost:24380/Order/GetOrders',
      method: 'GET',
      success: function (res) {

        that.setData({
          res_data: res.data,
        })
      }
    })

  },
  //删除订单单个缓存
  shanchu: function (e) {

    var id = e.currentTarget.dataset.aid
    wx.request({
      url: 'http://localhost:24380/Order/DeleteOrder?ID=' + id,
      method: 'GET',
      success: function (res) {

      }
    })
   this.onShow();
  },

  UptState:function(e)
  {    
     var orderNumber=e.currentTarget.id;

     wx.request({
       url: 'http://localhost:24380/Order/UpdateOrders?orderNumber=' + orderNumber +"&&orderState=10",
       method:"post",
       success:function(res)
       {
            wx.showToast({
              title: '支付成功',
            })   
             
       }
     })
     
  }
})


