var app = getApp()
Page({
  data: {

  },

  onLoad: function (options) {

  },
  //退出登录
  out:function(){
    wx.clearStorageSync();
    wx.redirectTo({
      url: '../login/login',
    })
  },
  // 跳转设置头像页面
  selectImageTap: function (e) {
    wx.navigateTo({
      url: '../selectImage/selectImage?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 跳转设置姓名页面
  settingNameTap: function (e) {
    wx.navigateTo({
      url: '../settingName/settingName?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 跳转设置手机号页面
  settingTelTap: function (e) {
    wx.navigateTo({
      url: '../settingTel/settingTel?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 跳转设置邮箱页面
  settingEmailTap: function (e) {
    wx.navigateTo({
      url: '../settingEmail/settingEmail?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 跳转设置地址页面
  settingAddressTap: function (e) {
    wx.navigateTo({
      url: '../settingAddress/settingAddress?artype=' + e.currentTarget.dataset.arid
    })
  }
})