const app = getApp()

Page({

  data: {
    counterId: '',
    openid: '',
   
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  onAdd: function () {
    //
  },

  formSubmit: function (e) {
    const db = wx.cloud.database()
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { userAccount,userPassword } = e.detail.value;
    //var userAccount = e.detail.value.account;
    //var userPassword = e.detail.value.password;
    this.setData({
      userAccount: e.detail.value.account,
      userPassword: e.detail.value.password
    })

    db.collection('users').add({
      data: {
        userAccount: e.detail.value.account,
        userPassword: e.detail.value.password,
        
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '注册成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '注册失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }

})