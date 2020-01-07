Page({
  data: {
    account: '',
    password: ''
  },

  // 获取输入账号
  accountInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function () { 
    const db = wx.cloud.database()
    // 先检查数据库里面有没有这个账号，有就返回已经存在
    db.collection('users').where({
      userAccount: this.data.account
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)

        if (res.data.length != 0) {
          if (res.data[0].userPassword == this.data.password) {
            // 登录成功后跳转到index
            wx.navigateTo({
              url: '../index/index',
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 500
            })
          }
          else {
            wx.showToast({
              title: '账号或密码错误',
              icon: 'loading',
              duration: 600
            })
          }
        }
        else {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'loading',
            duration: 600
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

  // 跳转到注册页面
  registration: function () {
    wx.navigateTo({
      url: '../registration/registration',
    })
    wx.showToast({
      title: '来了',
      icon: 'success',
      duration: 800
    })
  }
})