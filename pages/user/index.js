const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:  wx.getStorageSync('token')||"",
    avatarUrl:wx.getStorageSync('avatarUrl')||'',
    collect:wx.getStorageSync('collect')||[]
  },
  //登录获取token
  getToken(e) {
    console.log(e)
    const {
      encryptedData,
      rawData,
      iv,
      signature,
      userInfo
    } = e.detail
    wx.login({
      success: res => {
        const {
          code
        } = res;
        app.myAxios({
          url: 'users/wxlogin',
          method: 'POST',
          data: {
            encryptedData,
            iv,
            rawData,
            signature,
            code
          }
        }).then(res => {
          if (res === null) {
            wx.showToast({
              title: '登录失败,请重新登录',
            });
          } else {
            const {
              token
            } = res
            this.setData({
              token,
              avatarUrl:userInfo.avatarUrl
            })
            wx.setStorageSync('token', token);
            wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
          }
        })
      }
    })
  },
  goToCollect(){
    wx.navigateTo({
      url:'/pages/collect/index'
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
    this.setData({
      userInfo: wx.getStorageSync("userInfo") || {},
      token: wx.getStorageSync("token") || ''
    })
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