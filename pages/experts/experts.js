// pages/experts/experts.js
var app = getApp()
var fileData = require('../../utils/data')
var util = require('../../utils/util')
Page({
  data: {
    //用户是否专家判断
    ifExpert: false,
    //专家列表
    expertData: '',
    // 页面配置 
    winWidth: 0,
    winHeight: 0,
    //数据列表
    list: '',
    // tab切换  
    currentTab: 0,
    // experts picker
    experetsArray: ['专家分类', '工程规划', '工程勘察', '地基处理', '工程设计', '工程施工', '工程监理', '工程造价'],
    experetsIndex: 0

  },

  onLoad: function () {
    var that = this;
    if (!wx.getStorageSync("uid") > 0) {
      wx.redirectTo({
        url: '../login/login',
      })
    };
    that.setData({
      ifExpert: wx.getStorageSync("type")=="0"?false:true
    });
    console.log("here")
    let data = {};
    util.request("Expert", "GET", data, function (res) {
      if (that.data.ifExpert == "0") {
        that.setData({
          list: JSON.parse(res.data),
        });
        console.log("here2")
        console.log(that.data.list)
        console.log(that.data.list[0])
      }
    });

    //获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //专家类别选择
  bindExperetsPickerChange: function (e) {
    console.log('Category picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      experetsIndex: e.detail.value
    })
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../expert_detail/expert_detail?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 跳转咨询页面
  chartTap: function (e) {
    wx.navigateTo({
      url: '../chart/chart?aid=' + e.currentTarget.dataset.aid
    })
  },
  //  跳转留言页面
  bookTap: function (e) {
    wx.navigateTo({
      url: '../book/book?aid=' + e.currentTarget.dataset.aid
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    if (this.data.skillData.length === 0) return
    var that = this
    // 由于是模拟数据，加载更多时候，数据重复加载
    that.data.skillData = that.data.skillData.concat(that.data.skillData)
    that.setData({
      list: that.data.skillData,
    })
  },
  //咨询
  Ask: function (e) {
    console.log("点击了咨询");
    //连接成功
    // wx.onSocketOpen(function () {
    //   console.log("连接成功！")
    //   wx.sendSocketMessage({
    //    // data: 'stock',
    //   })
    // })
  }
})  
