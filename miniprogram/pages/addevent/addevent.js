const app = getApp()

Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    date: '2016-09-01',
    time: '12:01',

  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onAdd: function () {
   // const db = wx.cloud.database()
  //  db.collection('userbills').add({
    //  data: {
  //      data1:'kindear',
     //   data2:'真帅'
      //},
    //  success: res => {
        // 在返回结果中会包含新创建的记录的 _id
   //     this.setData({
     //     counterId: res._id,
//      count: 1
      //  })
      //  wx.showToast({
      //    title: '新增记录成功',
    //    })
     //   console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
   //   },
   //   fail: err => {
     //   wx.showToast({
   //       icon: 'none',
     //     title: '新增记录失败'
    //    })
     //   console.error('[数据库] [新增记录] 失败：', err)
   //   }
  //  })
  },
  formSubmit: function (e) {
    const db = wx.cloud.database()
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { movie_name, image, location, date,time,email_subject } = e.detail.value;
    this.setData({
      movie_name,
     image,
     location,
     date,
     time,
     email_subject,
    })
    db.collection('userbills').add({
      data: {
        movie_name:e.detail.value.movie_name,
        image: e.detail.value.image,
        location: e.detail.value.location,
        date: e.detail.value.date,
        time: e.detail.value.time,
        email_subject:e.detail.value.email_subject
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        
        wx.showToast({
          title: '新增记录成功',
        })
        this.setData({
          counterId: res._id,
          count: 1,
         info:''

        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }

})
 
