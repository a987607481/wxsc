const app = getApp()
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartArr: [],
    totalMoney: 0,
    totalCount: 0,
    token: wx.getStorageSync('token') ||''
  },

  //封装更新数据的方法
  updateCart(cartArr) {
    // 总价格
    let totalMoney = 0;
    // 商品总数
    let totalCount = 0;

    cartArr.forEach(v => {
      if (v.goods_checked) {
        totalMoney += v.goods_count * v.goods_price
        totalCount+=v.goods_count
      }
    })

    this.setData({
      cartArr,
      totalMoney,
      totalCount
    });
    wx.setStorageSync('cartArr', cartArr);
  },
  //登录获取token
  getToken(e) {
    const {
      encryptedData,
      rawData,
      iv,
      signature
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
              token
            })
            wx.setStorageSync('token', token);
            wx.setStorageSync('rawData', JSON.parse(rawData));
          }
        })
      }
    })
  },
  //支付
  async payHandle() {
    const {
      totalMoney,
      address,
      cartArr
    } = this.data;
    const goods = [];
    cartArr.forEach(v => {
      if (v.goods_checked) {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.goods_count,
          goods_price: v.goods_price
        })
      }
    });
    try {
      //创建订单，获取订单编号
      const {
        order_number
      } = await app.myAxios({
        url: 'my/orders/create',
        method: 'POST',
        data: {
          order_price: totalMoney,
          consignee_addr: address.addressDetail,
          goods,
        }
      })
      console.log(order_number)

      //获取支付参数
      const {
        pay
      } = await app.myAxios({
        url: 'my/orders/req_unifiedorder',
        method: 'POST',
        data: {
          order_number
        }
      })
      console.log(pay)

      // 发起微信支付
      const res = await new Promise((resolve, reject) => {
        wx.requestPayment({
          ...pay,
          success: res => {
            console.log('支付了？？')
            resolve(res);
          },
          fail: err => {
            console.log('没支付？？')
            resolve(res);
          }
        })
      });

      const enquiry = await app.myAxios({
        url: 'my/orders/chkOrder',
        method: 'POST',
        data: {
          order_number
        }
      })
      console.log(enquiry)

      const newCart = cartArr.filter(v => !v.goods_checked);
      wx.setStorageSync('cartArr', newCart);

      wx.navigateTo({
        url: '/pages/order/index?type=3'
      });

    } catch (error) {
      console.log(error);
      wx.showToast({
        icon: 'none',
        title: '支付遇到问题了',
      })
    }
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
    const address = wx.getStorageSync('address') || {};
    const cartArr = wx.getStorageSync('cartArr') || [];
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