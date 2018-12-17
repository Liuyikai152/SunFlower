// page/trolley/trolley.js

Page({


  data:{
    sellStatus:1,

  },
  onLoad: function () {
   
    var that = this;
  
        wx.request({
          url: 'http://localhost:24380/api/users/GetUsers',
          method: 'GET',
          success: function (resaa) {
            var UserID = resaa.data[0].ID;


        wx.request({
          url: 'http://localhost:24380/Trolley/GetTrolleyByStore',
          method: 'GET',
          data: {          
            userID: UserID
          },
          success: function (res) {
            // res.data.FoodSprice
            that.setData({
              trolley: res.data
            })

          }
        })
 }
        })      
      },

      

      

  carAdd: function (event) {
    var that = this;
    console.log(event)
    var index =event.currentTarget.id;
    var sun =parseInt(index)+1;
    var price_id=event.currentTarget.price_id;

    that.setData({
      sellStatus: sun,
    })
  },
  carReduce: function (event) {
    var that = this;
    var index = event.currentTarget.id;
    var sun = parseInt(index)-1;
    that.setData({
      sellStatus: sun,
    })
  },


    })
   