const app = getApp()
Page({
  //数据源
  data: {
    // movies 是放集合结果的
    movies: [],
    counterId: '',
    openid: '',
    count: null,
    loading: false,
    limit: 6,
    windowHeight: 0,
    scrollTop: 100,
    image: ""
  },

  // 页面初始化
  onLoad: function () {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    var _this = this;
    // 创建数据库实例
    const db = wx.cloud.database({
      // 环境id
      env: 'mytechnologyau-8a9514'
    })
    // 查询userbills的数据
    db.collection('userbills').get({
      success: res => {

        this.setData({
          movies: res.data
        })
      }
    })
  },


  onRemove: function (e) {
    wx.showModal({
      title: '删除此记录',
      content: '删除之后将无法恢复，确认要删除此记录？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          const db = wx.cloud.database()
          db.collection('userbills').doc(e.currentTarget.dataset.id).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
              this.setData({
                count: null,
                counterId: ''
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除失败',
              })
              console.error('[数据库] [删除记录] 失败：', err)
            }
          })
        }
      }
    })


  },






  // 页面显示（一个页面只会调用一次）
  onShow: function () {

  },
  // 页面初次渲染完成（每次打开页面都会调用一次）
  onReady: function () {

  },
  // 页面隐藏（当navigateTo或底部tab切换时调用）
  onHide: function () {

  },
  // 页面关闭（当redirectTo或navigateBack的时候调用）
  onUnload: function () {

  },
  // 下拉加载
  onPullDownRefresh: function (e) {
    var limit = this.data.limit + 6
    this.setData({
      limit: limit
    })
    this.requestData();
  },
  // 购票
  buyTickets: function () {
    wx.showModal({
      title: '购票提示：',
      content: '目前不支持购买',
      showCancel: false,
      confirmColor: '#ff4d64'
    })
  }
})