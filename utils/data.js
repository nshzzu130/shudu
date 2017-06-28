var shudu=[0,0,9,7,0,1,3,2,0,3,0,4,0,0,2,0,0,0,8,0,0,0,0,0,0,7,9,9,4,0,5,0,3,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,8,0,4,0,5,6,2,3,0,0,0,0,0,0,7,0,0,0,1,0,0,9,0,2,0,9,1,4,0,7,8,0,0]
var test = [5, 6, 9, 7, 8, 1, 3, 2, 4, 3, 7, 4, 9, 6, 2, 5, 1, 8, 8, 1, 2, 3, 4, 5, 6, 7, 9, 9, 4, 6, 5, 7, 3, 2, 8, 1, 7, 8, 5, 2, 1, 6, 4, 9, 3, 1, 2, 3, 8, 9, 4, 7, 5, 6, 2, 3, 8, 6, 5, 9, 1, 4, 7, 4, 5, 7, 1, 3, 8, 9, 6, 2, 6, 9, 1, 4, 2, 7, 8, 3, 5]
function getdata(level){
  let data=new Array();
  for (let i = 0; i < 82; i++) {
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
function getRandom(){
  return parseInt(Math.random()*10);
}
exports.shudu=shudu
exports.getdata=getdata