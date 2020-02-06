const app = getApp();
let timer = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: '',
    //搜索列表
    tipsList: [],
    //搜索历史
    history: []
  },
  //输入的时候触发
  inputHandle(e) {
    const {
      value
    } = e.detail
    this.setData({
      inputText: value
    })
    if (value.trim() === '') return;

    clearTimeout(timer)

    timer = setTimeout(() => {
      app.myAxios({
        url: 'goods/qsearch',
        data: {
          query: value
        }
      }).then(res => {
        console.log(res)
        this.setData({
          tipsList: res
        })
      })
    }, 500)
  },
  // 点击键盘的完成按钮 - 模拟器是按回车键触发
  submitHandle(e) {
    const {
      value
    } = e.detail
    if (value.trim() === '') return;

    let history = wx.getStorageSync('history', history) || [];
    // 历史是前添加
    history.unshift(value)
    // 通过 Set 对象去除 Array 对象的重复项，最终通过解构变回 Array 数组
    history = [...new Set(history)]
    this.setData({
      history
    })
    wx.setStorageSync('history', history);
  },
   // 清除输入框内容 
   clearInput(){
    this.setData({
      inputText:''
    })
  },
  clear(){
    wx.removeStorageSync('history')
    this.setData({
      history:[]
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
    const history = wx.getStorageSync('history') || [];
    // 更新页面视图
    this.setData({
      history
    });
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