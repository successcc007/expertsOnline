var app = getApp()
Page({
  data: {

  },

  onLoad: function (options) {

  },
  // 跳转个人资料页面
  infoTap:function(e){
    wx.navigateTo({
      url: '../my_info/my_info?artype=' + e.currentTarget.dataset.arid
    })
  }
})