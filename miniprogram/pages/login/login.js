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
    // 先简单地设置为空即失败，否则成功
    // TODO：查询数据库账号，匹配到账号再匹配密码，全部符合就跳转到index，否则登录失败
    if (this.data.account.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '登录失败',
        icon: 'loading',
        duration: 1000
      })
    } else {
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
  },

  // 注册
  registration: function () {
    // 跳转到注册页面
    // 先检查数据库里面有没有这个账号
    // 有就返回已经存在，没有就添加
    wx.showToast({
      title: 'admin:123',
      icon: 'success',
      duration: 1000
    })
  }
})