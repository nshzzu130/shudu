var shudu=[0,0,9,7,0,1,3,2,0,3,0,4,0,0,2,0,0,0,8,0,0,0,0,0,0,7,9,9,4,0,5,0,3,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,8,0,4,0,5,6,2,3,0,0,0,0,0,0,7,0,0,0,1,0,0,9,0,2,0,9,1,4,0,7,8,0,0]
var test = [5, 6, 9, 7, 8, 1, 3, 2, 4, 3, 7, 4, 9, 6, 2, 5, 1, 8, 8, 1, 2, 3, 4, 5, 6, 7, 9, 9, 4, 6, 5, 7, 3, 2, 8, 1, 7, 8, 5, 2, 1, 6, 4, 9, 3, 1, 2, 3, 8, 9, 4, 7, 5, 6, 2, 3, 8, 6, 5, 9, 1, 4, 7, 4, 5, 7, 1, 3, 8, 9, 6, 2, 6, 9, 1, 4, 2, 7, 8, 3, 5]
function getData(level){
  let data=new Array();
  for (let i = 0; i < 81; i++) {
    if (shudu[i] == 0) {
      if (getRandom() % (level + 1) == 0) {
        data[i] = test[i];
      } else {
        data[i] = shudu[i];
      }
    } else {
      data[i] = shudu[i];
    }
  }
  return data;
}
function getDataForChildren(level) {
  let data = new Array();
  let oldline=0;
  let zeroIndex = new Array();
  let j=0;
  let m=0;
  for (let i = 0; i < 81; i++) {
    data[i] = test[i];
    let line=parseInt(i/9);
    if((i+1)%9==0){//对前面数据做处理
      j=0;
      console.log(getRandom2(zeroIndex.length))
      let index=getRandom2(zeroIndex.length);
      let setindex=zeroIndex[index];
      data[setindex] = shudu[setindex];
      let index2 = getRandom2(zeroIndex.length);
      m=0;
      while (index2==index&&m<20){
        m++;
        index2 = getRandom2(zeroIndex.length);
      }
      setindex = zeroIndex[index2];
      data[setindex] = shudu[setindex];
      zeroIndex=new Array();
      oldline=line;
    }else{//没到最后，记录为0的需要处理的数据
      if (shudu[i] == 0) {
        zeroIndex[j++]=i;
      }
    }
  }
  return data;
}
function getRandom(){
  return parseInt(Math.random()*10);
}
function getRandom2(value){
  let random = parseInt(Math.random() * value);
  return random;
}
exports.shudu=shudu
exports.getData = getData
exports.getDataForChildren = getDataForChildren