Page({
  //数据源
  data: {
    // movies 是放集合结果的
    movies: [],
    loading: false,
    limit: 6,
    windowHeight: 0,
    scrollTop: 100
  },

  // 页面初始化
  onLoad: function () {

  // 创建数据库实例
  const db = wx.cloud.database({
    // 环境id
    env:'mytechnologyau-8a9514'
  })
  // 查询userbills的数据
  db.collection('userbills').get({
    success : res=> {
      console.log(res.data[0])
      this.setData({
        movies: res.data
      })
    }
  })
  },  

  // 页面显示（一个页面只会调用一次）
  onShow:function(){
    
  },
  // 页面初次渲染完成（每次打开页面都会调用一次）
  onReady:function(){
    
  },
  // 页面隐藏（当navigateTo或底部tab切换时调用）
  onHide:function(){
    
  },
  // 页面关闭（当redirectTo或navigateBack的时候调用）
  onUnload:function(){
    
  },
  // 下拉加载
  onPullDownRefresh: function(e) {
    var limit = this.data.limit + 6
    this.setData({
      limit: limit
    })
    this.requestData();
  },
  // 购票
  buyTickets: function() {
    wx.showModal({
      title: '购票提示：',
      content: '目前不支持购买',
      showCancel: false,
      confirmColor: '#ff4d64'
    })
  }
})