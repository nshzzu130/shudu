var data=require("../../utils/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},
    clickindex:0,
    level:1,
    type:0,
    viewArrays:[],
    showChooseNumDialog:false
  },
  onClick:function(res){
    console.log(res)
    if (this.data.viewArrays[res.currentTarget.dataset.id].isOriginNum == 1) {
      if (this.data.showChooseNumDialog == true) {//隐藏选择框
        this.setData({
          showChooseNumDialog: false
        })
      }
      return;
    }

    if (this.data.showChooseNumDialog==true){//隐藏选择框
      this.setData({
        showChooseNumDialog: false
      })
    }else{
      this.setData({
        showChooseNumDialog: true,
        clickindex:res.currentTarget.dataset.id
      })
    }
  },
  checkRow:function(value){
    let currentclick = this.data.clickindex;
    let row=parseInt(currentclick/9);
    let colum=currentclick%9;
    console.log("current click:"+row+":"+colum);
    let array=this.data.viewArrays;
    for(let i=0;i<9;i++){
      if(i!=colum&&array[row*9+i].num==value){
        return false;
      }
    }
    return true;
  },
  checkColum:function(value){
    let currentclick = this.data.clickindex;
    let row = parseInt(currentclick / 9);
    let colum = currentclick % 9;
    console.log("current click:" + row + ":" + colum);
    let array = this.data.viewArrays;
    for (let i = 0; i < 9; i++) {
      if (i != row && array[i * 9 + colum].num == value) {
        return false;
      }
    }
    return true;
  },
  checkSmall2:function(rowmin,rowmax,colummin,colummax,row,colum,value){
    for(let i=rowmin;i<rowmax;i++){
      for (let j = colummin;j < colummax;j++){
        if(i==row&&j==colum){
          continue;
        }
        if(this.data.viewArrays[i*9+j].num==value){
          return false;
        }
      }
    }
    return true;
  },
  checkSmall:function(value){
    let currentclick = this.data.clickindex;
    let row = parseInt(currentclick / 9);
    let colum = currentclick % 9;
    console.log("current click:" + row + ":" + colum);
    if(row<3){
      if(colum<3){//大格一
        return this.checkSmall2(0,3,0,3,row,colum,value);
      } else if (colum < 6) {//大格二
        return this.checkSmall2(0, 3, 3, 6, row, colum, value);
      } else {//大格三
        return this.checkSmall2(0, 3, 6, 9, row, colum, value);
      }
    }else if(row<6){
      if (colum < 3) {//大格四
        return this.checkSmall2(3, 6, 0, 3, row, colum, value);
      } else if (colum < 6) {//大格五
        return this.checkSmall2(3, 6, 3, 6, row, colum, value);
      } else {//大格六
        return this.checkSmall2(3, 6, 6, 9, row, colum, value);
      }
    }else{
      if (colum < 3) {//大格七
        return this.checkSmall2(6, 9, 0, 3, row, colum, value);
      } else if (colum < 6) {//大格八
        return this.checkSmall2(6, 9, 3, 6, row, colum, value);
      } else {//大格九
        return this.checkSmall2(6, 9, 6, 9, row, colum, value);
      }
    }
  },
  chooseNum:function(res){
    console.log(res)
    if (this.checkRow(res.currentTarget.dataset.id)==false){
      wx.showToast({
        title: '请检查横向',
        duration:1000
      })
      return;
    }
    if (this.checkColum(res.currentTarget.dataset.id)==false){
      wx.showToast({
        title: '请检查竖向',
        duration: 1000
      })
      return;
    }
    if (this.checkSmall(res.currentTarget.dataset.id)==false){
      wx.showToast({
        title: '请检查小九宫格',
        duration: 1000
      })
      return;
    }
    this.data.viewArrays[this.data.clickindex].num = res.currentTarget.dataset.id
    this.setData({
      showChooseNumDialog:false,
      viewArrays:this.data.viewArrays
    })
    this.checkPass()
    
  },

  checkPass: function () {
    for(let i=0;i<81;i++){
      if (this.data.viewArrays[i].num==0){
        return;
      }
    }
    if(this.data.level==10){
      wx.showModal({
        title: '通关',
        content: '你已经挑战完所有关卡',
        showCancel:false
      })
      return;
    }
    let that=this;
    wx.showModal({
      title: '过关啦',
      content: '是否进入下一关',
      success:function(res){
        if(res.confirm){//进入下一关
          wx.setStorageSync('level', that.data.level+1)
          wx.redirectTo({
            url: '/pages/main/main?id='+that.data.type,
          })
        }else{

        }
      }
    })
  },
  clearInput:function(){
    this.data.viewArrays[this.data.clickindex].num=0;
    this.setData({
      viewArrays:this.data.viewArrays,
      showChooseNumDialog:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let level=wx.getStorageSync("level")
    if(this.isEmpty(level)){
    }else{
      this.data.level = level;
    }
    wx.setNavigationBarTitle({
      title: '第' + this.data.level + '关',
    })
    let array=new Array();
    if(options.id==1){
      this.data.type=1;
      array = data.getDataForChildren(this.data.level)
    }else{
      this.data.type=2;
      array = data.getData(this.data.level)
    }
    for (let i = 0; i < array.length;i++){
      this.data.viewArrays[i]=new Object();
      this.data.viewArrays[i].num = array[i];
      if (array[i]!=0){
        this.data.viewArrays[i].isOriginNum=1;
      }else{
        this.data.viewArrays[i].isOriginNum = 0;
      }
    }
    this.setData({
      viewArrays:this.data.viewArrays
    })
  },
  isEmpty:function(value){
    return value==0||value==''||value==undefined||value==null;
  }
})