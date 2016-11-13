//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
    coverUrl:"http://news-at.zhihu.com/api/4/start-image/",
    sWidth:0,
    sHeight:0,
    splash:{}
  },
  onLoad:function(options){
    var _this = this
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          sHeight:res.windowHeight,
          sWidth:res.windowWidth
        })
   //     console.log(_this.data)
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
   var _this = this
   var size = this.data.sWidth+'*'+this.data.sHeight;
   wx.request({
     url: _this.data.coverUrl+size,
     data: {},
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     // header: {}, // 设置请求的 header
     success: function(res){
       // success
       var data = res.data;
       data.img = data.img.replace("pic1","pic4")
       data.img = data.img.replace("pic2","pic4")
       console.log("success!")
        _this.setData({
          splash:data
        })
        toIndexPage.call(_this);

     },
     fail: function() {
       // fail
       console.log("请求封面图片失败!")
     },
   })
  },
})

function toIndexPage(){
  setTimeout(function(){
      wx.redirectTo({
        url: '../index/index',
      })
  },2000)
}
