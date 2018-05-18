var app = getApp();
var util = require("../../utils/util.js")
var message = '';
var text = '';
var user = {};
var length;
var zx_info_id;
var openid_talk;
Page({
  data: {
    epId: '',
    epInfo: '',
    centendata: [],
    newsInputVal: '',
    message: '',
    ifSocketOpen: false,
    ifExpert:false,

    news: '',
    scrollTop: 0,
    text: text,
    avatarUrl: '',
    tabdata: '',
    my_right: 1,
    you_left: 0,
  },
  bindChange: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  //发送  
  add: function (e) {
    //console.log("add");
    var that = this;
    //console.log(that.data.message)    
    let message = that.data.message;//发送的内容
    let mSend = that.data.epId+"|"+message;
    if (ifSocketOpen) {//如果连接打开
      wx.sendSocketMessage({
        data: mSend
      });
      let len = that.data.centendata.length;
      let c = "centendata[" + len + "].content";
      let p = "centendata[" + len + "].position";
      // let t = "centendata[" + len + "].time";
      that.setData({
        [c]: mSend,
        [p]: "right"
        // [t]: "left",
      });
    }
    // var data = {
    //   program_id: app.jtappid,
    //   openid: app._openid,
    //   content: message,
    //   openid_talk: openid_talk
    // }
    // util.request('pg.php/ZXinfo/session_submit', 'post', data, '正在加载数据', function (res) {
    //   if (res.data.state == 1) {
    //     var a = true;
    //     that.loaddata(a);
    //     that.setData({
    //       news_input_val: ''
    //     })
    //     message = ''
    //   } else {
    //     wx.showToast({
    //       title: '网络错误,请稍后',
    //     })
    //   }
    // })
  },

  onLoad: function (options) {
    let that=this; 
    console.log("uid");
    console.log(wx.getStorageSync("uid"));
    if(!wx.getStorageSync("uid")>0){
      wx.redirectTo({
        url: '../login/login',
      })
    }else{
      if (wx.getStorageSync("type")==1){
        that.data.setData({
          ifExpert:true
        })
      }else{
        that.data.setData({
          ifExpert: false
        })
      }
    }
    //console.log(options);
    let epId = options.aid;
    //调用应用实例的方法获取全局数据  
    this.setData({
      epId: epId
    });
    let data = {
      id: epId
    };
    //专家资料
    util.request("Expert/GetInfo", "GET", data, function (res) {
      //console.log(res)
      if (res.data != null) {
        that.setData({
          epInfo: res.data
        })
      }
    })

    //离线消息
    //websocket建立连接
    wx.connectSocket({
      url: app.globalData.webSocketUrl,
      data: {
        user: "zhangsan"
      },
      success: function (res) {
        console.log(res);
      }
    });
    //连接打开判断
    wx.onSocketOpen(function (res) {
      console.log('websocket opened.');
      that.setData({
        ifSocketOpen: true
      })
    })

    wx.onSocketMessage(function (res) {
      //收到消息
      console.log('received msg: ' + res.data);
      let that = this;
      let len = that.data.centendata.length;
      let c = "centendata[" + len + "].content";
      let p = "centendata[" + len + "].position";
      // let t = "centendata[" + len + "].time";
      that.setData({
        [c]: res.data,
        [p]: "left"
        // [t]: "left",
      });
    })
    //  this.loaddata()
  },
  // 页面加载  
  loaddata: function (a) {
    var that = this;
    var is_img = true;
    var data = {
      id: that.data.epId
    }

    // util.request('pg.php/ZXinfo/session_page', 'post', data, '', function (res) {
    //   if (res.data.k1) {
    //     res.data.k1.time_agree = util.js_date_time(res.data.k1.time_agree)
    //   }
    //   for (var i = 0; i < res.data.k2.length; i++) {
    //     res.data.k2[i].time = util.js_date_time(res.data.k2[i].time)
    //     var n = res.data.k2[i].content.charAt(res.data.k2[i].content.length - 1);
    //     switch (n) {
    //       case 'g':
    //         res.data.k2[i].is_img = is_img
    //         break;
    //       default:
    //     }
    //   }
    //   that.setData({
    //     tabdata: res.data.k1,
    //     centendata: res.data.k2.reverse()
    //   })
    //   wx.setNavigationBarTitle({ title: that.data.tabdata.nickname });
    //   if (a) {
    //     setTimeout(function () {
    //       that.bottom()
    //     }, 500);
    //   }
    // })
    setTimeout(function () {
      if (that.data.centendata.length != length) {
        length = that.data.centendata.length
      }
      that.loaddata()
    }, 3000);

  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var query = wx.createSelectorQuery()
    query.select('#hei').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom  // #the-id节点的下边界坐标  
      })
      res[1].scrollTop // 显示区域的竖直滚动位置  
    })
  },
  // 选择图片并把图片保存    
  upimg1: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var data = {
          program_id: app.jtappid,
          openid: app._openid,
          // zx_info_id: zx_info_id,
        }
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'pg.php/ZXinfo/session_submit', //提交信息至后台  
          filePath: tempFilePaths[0],
          name: 'content', //文件对应的参数名字(key)  
          formData: data,  //其它的表单信息  
          success: function (res) {
            var a = true;
            that.loaddata(a);
            message = ''
          }
        })
      }
    })
  }
})  