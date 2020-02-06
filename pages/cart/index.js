// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArr: [],
    address: {},
    checkAll: false,
    totalMoney: 0,
    totalCount: 0,
    count:0
  },

  //封装更新数据的方法
  updateCart(cartArr) {
    // 总价格
    let totalMoney = 0;
    // 商品总数
    let totalCount = 0;

    //判断全选
    let count = 0;

    cartArr.forEach(v => {
      if (v.goods_checked) {
        totalMoney += v.goods_count * v.goods_price
        totalCount+=v.goods_count
        count++
      }
    })

    this.setData({
      cartArr,
      totalMoney,
      totalCount,
      count,
      checkAll: cartArr.length === count
    });
    wx.setStorageSync('cartArr', cartArr);
  },

  // 加减号改变数量
  changeCount(e) {
    const {
      number,
      index
    } = e.currentTarget.dataset;
    const {
      cartArr
    } = this.data
    if (cartArr[index].goods_count === 1 && number === -1) {
      wx.showModal({
        content: '再点就没了兄弟',
        confirmText: '确定再点',
        success: res => {
          if (res.confirm) {
            cartArr.splice(index, 1);
            this.updateCart(cartArr);
          }
        }
      })
    } else {
      cartArr[index].goods_count += number;
      this.updateCart(cartArr);
    }
  },

  //多选框
  changeCheck(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      cartArr
    } = this.data
    cartArr[index].goods_checked = !cartArr[index].goods_checked;
    this.updateCart(cartArr)
  },

  //全选
  changeCheckAll() {
    let {
      checkAll,
      cartArr
    } = this.data
    cartArr.forEach(v => {
      v.goods_checked = !checkAll;
    })
    this.updateCart(cartArr);
  },

  goToPay() {
    const {
      address,
      count
    } = this.data
    if (!address.userName) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
    } else if (count === 0) {
      wx.showToast({
        title: '你啥都没选结你马账呢',
        icon: 'none'
      });
    }else{
      wx.navigateTo({
        url: '/pages/pay/index',
      });
    }
  },

  //封装获取地址
  chooseAddressMain() {
    wx.chooseAddress({
      //按确认的时候的回调函数
      success: (result) => {
        const {
          cityName,
          countyName,
          detailInfo,
          postalCode,
          provinceName,
          telNumber,
          userName
        } = result
        //拼装收货地址
        const address = {
          userName,
          telNumber,
          postalCode,
          addressDetail: `${provinceName}${cityName}${countyName}${detailInfo}`
        }
        this.setData({
          address
        })
        wx.setStorageSync('address', address);
        // console.log(this.data.address)
      }
    });
  },

  // 获取收货地址功能
  getAddressHandle() {
    wx.getSetting({
      success: (result) => {
        if (result.authSetting['scope.address'] === false) {
          wx.openSetting({
            success: (result) => {
              if (res.authSetting['scope.address'] === true) {
                // 已经授权，通过 API 方式调用收货地址
                this.chooseAddressMain();
              }
            }
          });
        } else {
          this.chooseAddressMain()
        }
      }

    });
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
    const cartArr = wx.getStorageSync('cartArr') || [];
    const address = wx.getStorageSync('address') || [];
    this.setData({
      address
    })
    this.updateCart(cartArr)
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