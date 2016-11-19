var utils = require('../../utils/util.js');
var requests = require('../../requests/requests.js');
var apis = require('../../requests/apis.js');

var weekdayStr = [ '日', ' 一', '二', '三', '四', '五', '六' ];
Page({
  data:{
    pageShow:'none',//控制主体内容是否显示
    currentDateStr:'',
    currentDate:new Date(),
    loading:false,
    loadingMsg:"加载中...",
    pageData:{},
    sliderData:{},
    screenHeight:0,
    screenWidth:0,
    slideHeight:0,
    slideWidth:0,
    slideRight:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    var date = utils.getCurrentDate();
    _this.setData({
        currentDateStr: date.year+'.'+date.month+'.'+date.day + ' '+'星期'+ weekdayStr[date.weekday]
        });
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
            screenHeight:res.windowHeight,
            screenWidth:res.windowWidth,
            slideHeight:res.windowHeight,
            slideWidth:res.windowWidth*0.7,
            slideRight:res.windowWidth,
        });
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    var _this = this;
    _this.setData({loading:true});
    wx.request({
      url: apis.getLatestNews(),
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        _this.setData({
            sliderData:res.data.top_stories,
            pageData:res.data.stories,
            pageShow:'block'
        });
      },
      fail: function() {
        
      },
      complete: function() {
        _this.setData({loading:false});
      }
    })
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})