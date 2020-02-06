Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs: [],
    nav:[],
    cont:[],
    showTop: true
  },
  goTop(e) {
    const {top} = e.currentTarget.dataset;
    wx.pageScrollTo({
      scrollTop: top,
      duration: 300
    })
  },
  onPageScroll(e) {
    const { scrollTop } = e;
    if (scrollTop > 50) {
      this.setData({
        showTop: false
      });
    } else {
      this.setData({
        showTop: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success:res=>{
        this.setData({
          swiperImgs:res.data.message
        })
      }
    })
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:res=>{
        this.setData({
          nav:res.data.message
        })
      }
    })
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:res=>{
        this.setData({
          cont:res.data.message
        })
      }
    })
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