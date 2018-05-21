// pages/login/login.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    uname: '',
    pword: '',
    type:false,
    uInfo:''
  },
  /**
   * 用户名输入
   */
  nameInput:function(e){
    this.setData({
      uname:e.detail.value
    })
  },
  /**
     * 密码输入
     */
  pwordInput: function (e) {
    this.setData({
      pword: e.detail.value
    })
  },
  /**
   * 登录用户类型选择
   */
  listenerRadioGroup: function (e) {
    console.log(e);
    this.setData({
      type: e.detail.value
    })
  },
  /**
   * 登录
   */
  login: function () {
    console.log("login")
    let that=this;
    let data={
      uname:that.data.uname,
      pword:that.data.pword,
      type:that.data.type
    }
    util.request("Users/GetInfo", "GET", data, function (res) {
      console.log(res)
      let jsonData = JSON.parse(res.data);
      if (res.data != null) {
        that.setData({
          uInfo: jsonData
        });
        util.setStorageSync("uid", jsonData.id);
        util.setStorageSync("uname", jsonData.UserName);
        util.setStorageSync("rname", jsonData.RealName);
        util.setStorageSync("Mobile", jsonData.Mobile);
        util.setStorageSync("Telphone", jsonData.Telphone);
        util.setStorageSync("type", jsonData.type);
        console.log(jsonData.type);   
        wx.redirectTo({
          url: '../my_info/my_info',
        })     
        // wx.navigateBack({
        //   delta: 1
        // });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})