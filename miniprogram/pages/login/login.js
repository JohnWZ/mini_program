Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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
    // 先简单地设置为空即失败，否则成功
    // TODO：查询数据库账号，匹配到账号再匹配密码，全部符合就跳转到index，否则登录失败
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '登录失败',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 登录成功后跳转到index
      wx.navigateTo({
        url: '../index/index',
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
})