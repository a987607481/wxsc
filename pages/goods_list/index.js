const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    total: 0
  },

  getGoods(obj){

    const {query,cid,pagesize} = this.data;
    obj.query = query;
    obj.pagesize = pagesize;
    if(cid) obj.cid = cid;

    app.myAxios({
      url:'goods/search',
      data:{...obj}
    }).then(res=>{
      this.setData({
        goods:[...this.data.goods,...res.goods],
        total: res.total
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {cid,query} = options;
    this.setData({
      cid,
      query,
    })
    const {pagenum} = this.data;

    this.getGoods({pagenum})
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
    this.setData({
      goods:[],
      pagenum:1
    })
    this.getGoods({
      pagenum:1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let {pagenum,pagesize,total} = this.data;
    if(pagenum<Math.ceil(total/pagesize)){
      this.setData({
        pagenum:++pagenum
      })
      this.getGoods({pagenum})
    }else{
      wx.showToast({
        title: '就这些东西，爱买不买',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})