const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:  wx.getStorageSync('categories') || [],
    details:  wx.getStorageSync('details') || [],
    activeIndex: 0,
    rightTop: 0
  },
  changeTab(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      activeIndex: index,
      details: this.data.categories[index].children,
      rightTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.categories.length===0){
      app.myAxios({
        url: 'categories'
      }).then(res => {
        const categories = res;
        const details = categories[0].children;
        wx.setStorageSync('categories',categories);
        wx.setStorageSync('details',details)
        this.setData({
          categories,
          details
        });
      })
    }
   
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