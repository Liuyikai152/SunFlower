// page/trolley/trolley.js

Page({


  data:{
    sellStatus:1,
    price:0,

  },
  onLoad: function () {
   
    var that = this;
  
        wx.request({
          url: 'http://localhost:24380/api/users/GetUsers',
          method: 'GET',
          success: function (resaa) {
            var UserID = resaa.data[0].ID;


        wx.request({
          url: 'http://localhost:24380/TrolleyDetail/GetTrolleyDetails',
          method: 'GET',
          data: {          
            id: UserID
          },
          success: function (res) {
          console.log(res.data)
            that.setData({
              trolleyDetails: res.data
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
    if(index>1){
    var sun = parseInt(index)-1;}
    else{

    }
    that.setData({
      sellStatus: sun,
    })
  },


    })
   