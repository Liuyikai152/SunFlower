
Page({

  onLoad: function (options) {
    var that = this;
    var shopId = options.id;
    wx.request({
      url: 'http://localhost:24380/Store/GetStore?id=' + shopId,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          res_data: res.data
        })
      }
    }),

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
  addshop: function (event) {
    // var delivery_FileName = event.detail.value.delivery_FileName;
    // var delivery_FoodName = event.detail.value.delivery_FoodName;
    // var delivery_Sale = event.detail.value.delivery_Sale;
    // var delivery_FoodSprice = event.detail.value.delivery_FoodSprice;
 
    var delivery_id = event.currentTarget.id ;
    
    wx.request({
      url: 'http://localhost:24380/Food/GetFoodByID?id=' + delivery_id,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
       
      }
    })
    return;
  },
  addshops: function (event) {
    // var delivery_FileName = event.detail.value.delivery_FileName;
    // var delivery_FoodName = event.detail.value.delivery_FoodName;
    // var delivery_Sale = event.detail.value.delivery_Sale;
    // var delivery_FoodSprice = event.detail.value.delivery_FoodSprice;
    var delivery_id = event.detail.value.delivery_id;
    console.log(delivery_id);
    // console.log(delivery_FileName);
    // console.log(delivery_FoodName);
    // console.log(delivery_Sale);
    // console.log(delivery_FoodSprice);
   
    return;
    //添加收货人地址
    wx.request({
      url: 'http://localhost:24380/api/Trolley/AddTrolley',
      method: 'POST',
      data: {
        FileName:delivery_FileName,
        FoodName: delivery_FoodName,
        Sale: delivery_Sale,
        FoodSprice: delivery_FoodSprice,
      },
      success: function () {
        wx.showToast({
          title: '保存成功!',
        })
      }
    })

  }
});

