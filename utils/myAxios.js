const baseUrl = 'https://api.zbztb.cn/api/public/v1/'

export const myAxios  = (params) =>{
    console.log(params);
    params.header = params.header || {};

    if (params.url.includes('my/')===true){
        params.header.Authorization = wx.getStorageSync('token');
      }
    wx.showLoading({
        title: '加载中',
    });
    return new Promise((resolve,reject)=>{
        wx.request({ 
            ...params,
            url:baseUrl+params.url,
            success:res=>{
                resolve(res.data.message)
            },
            fail:err=>{
                reject(err)
            },
            complete:()=>{
                wx.hideLoading();
            }
        })
    })
}