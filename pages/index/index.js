//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    childrenTitle: '幼儿学习',
    manTitle:'成人难度',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  commonEnter:function(){
    wx.navigateTo({
      url: '../main/main',
    })
  },
  addPractice:function(){
    wx.navigateTo({
      url: '../addPractice/addPractice',
    })
  },
  childrenEnter:function(){
    wx.navigateTo({
      url: '../main/main?id=1',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
