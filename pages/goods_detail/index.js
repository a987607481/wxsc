const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    introduce: ''
  },
  //点击看大图
  previewBigImage(e){
    const {curr} = e.currentTarget.dataset
    wx.previewImage({
      current:curr,
      urls:this.data.goodsDetail.pics.map(v=>v.pics_big)
    })
  },
  //收藏
  handleCollect(){
    const collect = wx.getStorageSync('collect')||[]
    const collectIndex = collect.findIndex(item=>{
      return item.goods_id===this.data.goodsDetail.goods_id
    })
    if(collectIndex===-1){
      const { goods_id,goods_name,goods_price,goods_small_logo} = this.data.goodsDetail;
      collect.push({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo
      })
      wx.setStorageSync('collect', collect);
      wx.showToast({ 
        title: '收藏成功',
        duration: 1000,
        mask: true
      });
    }else{
      const { goods_id } = this.data.goodsDetail;
      collect.forEach(function(item, index){
        if(item.goods_id===goods_id){
          collect.splice(index,1);
          wx.setStorageSync('collect', collect);
        }
      })
      wx.showToast({ 
        title: '取消收藏',
        duration: 1000,
        mask: true
      });
    }
  },
  // 购物车
  goToCart(){
    wx.switchTab({
      url:'/pages/cart/index'
    })
  },

  // 加入购物车
  addToCart(){
    const cartArr = wx.getStorageSync('cartArr')||[]
    const goodsIndex = cartArr.findIndex(item=>{
      return item.goods_id===this.data.goodsDetail.goods_id
    })
    console.log(goodsIndex)
    if(goodsIndex===-1){
      const { goods_id,goods_name,goods_price,goods_small_logo} = this.data.goodsDetail;
      cartArr.push({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        goods_checked: true,
        goods_count: 1
      })
    }else{
      cartArr[goodsIndex].goods_count+=1
    }
    wx.setStorageSync('cartArr', cartArr);
    wx.showToast({ 
      title: '加入购物车成功',
      duration: 1000,
      mask: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    app.myAxios({
      url:'goods/detail',
      data:{
        goods_id
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        goodsDetail:res,
        introduce: res.goods_introduce
      })
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