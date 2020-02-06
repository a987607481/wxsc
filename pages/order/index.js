const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        type: 1,
        text: '全部'
      },
      {
        type: 2,
        text: '待付款'
      },
      {
        type: 3,
        text: '代发货'
      },
      {
        type: 4,
        text: '退款/退货'
      },
    ],
    activeType: 1,
    orders:[]
  },


  changeTabs(e){
    const {type} = e.currentTarget.dataset;
    this.setData({
      activeType:type
    })
    this.getOrderData()
  },
  getOrderData(){
    const { activeType } = this.data
    app.myAxios({
      url:'my/orders/all',
      data:{
        type: activeType
      }
    }).then(res=>{
      const { orders } = res
      this.setData({
        orders:orders.map(v=>({...v, format_time: new Date(v.create_time * 1000).toLocaleString()}))
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options;
    this.setData({
      activeType: +type
    });
    this.getOrderData()
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