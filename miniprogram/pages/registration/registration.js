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
    // 先检查数据库里面有没有这个账号，有就返回已经存在
    db.collection('users').where({
      userAccount: e.detail.value.account
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        
        if (res.data.length == 0) {
          // 账号不存在，添加新账号
          let { userAccount, userPassword } = e.detail.value;
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
              // wx.navigateTo({
              //   url: '../login/login',
              // })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '注册失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        }
        else {
          // 提示
          wx.showToast({
            icon: 'none',
            title: '该账户已经存在！'
          })
        }

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

   
    
    

    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }

})