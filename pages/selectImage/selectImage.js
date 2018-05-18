var app = getApp()
Page({
  data: {
    // 用户头像
    tempFilePaths:'../../images/skilledt_img_01.png',
  },

  onLoad: function (options) {

  },
  getImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: app.globalData.URL + '/uploadMaterial',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'token': app.globalData.token,//一个签名认证，本项目的需要，其他项目不一定要
          },
          header: { "Content-Type": "multipart/form-data" },
          success: function (result) {
            var resultData = JSON.parse(result.data)
            console.log(resultData.data.url);
          },
          fail: function (e) {
            console.log(e);
          }
        })
      }
    })
  },
  takePhoto: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

      }
    })
  },
})