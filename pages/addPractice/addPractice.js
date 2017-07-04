// pages/addPractice/addPractice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add1:[],
    add2:[],
    total:10,
    showRight:[]
  },
  checkResult:function(res){
    let index = res.currentTarget.dataset.index;
    let sum = this.data.add1[index]+this.data.add2[index];
    if(res.detail.value==sum){
      this.data.showRight[index]=true;
      this.setData({
        showRight: this.data.showRight
      })
    }else{
      this.data.showRight[index] = false;
      this.setData({
        showRight: this.data.showRight
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let add11 =new Array();
    let add22 =new Array();
    for(let i=0;i<this.data.total;i++){
      add11[i]=this.getRandom(50);
      add22[i] = this.getRandom(50);
    }
    this.setData({
      add1:add11,
      add2:add22
    })
  },
  getRandom:function(value){
    return parseInt(Math.random() * value)+1;
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