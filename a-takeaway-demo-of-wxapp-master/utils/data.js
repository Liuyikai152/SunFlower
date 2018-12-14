/**
 * banner数据
 */ 
function getBannerData(){
  var arr = ['../../images/001.jpg', '../../images/002.jpg', '../../images/003.jpg', '../../images/004.jpg', '../../images/005.jpg', '../../images/006.jpg']
    return arr
}
/*
 * 首页 navnav 数据
 */ 
function getIndexNavData(){
    var arr = [
            {
                id:1,
                icon:"../../images/icon1.png",
                title:"全部鲜花"
            },
            {
                id:2,
                icon:"../../images/icon2.png",
                title:"开业鲜花"
            },
            {
                id:3,
                icon:"../../images/icon3.png",
                title:"爱情鲜花"
            }
        ]
    return arr
}
/*
 * 首页 对应 标签 数据项
 */ 
function getIndexNavSectionData(){
    var arr = [
                [],[],[],[],[] 
            ]
    return arr
}
/**
 * 技师 数据
 * */ 
function getSkilledData(){
    var arr = []
    return arr
}

/**
 * 选择器 数据
 */ 
function getPickerData(){
    var arr =[
        {
            name:'张三',
            phone:'13812314563',
            province:'北京',
            city:'北京',
            addr:'朝阳区望京悠乐汇A座8011'
        },
        {
            name:'李四',
            phone:'13812314563',
            province:'北京市',
            city:'北京市',
            addr:'朝阳区望京悠乐汇A座4020'
        }
    ]
    return  arr
}
/**
 * 查询 地址
 * */ 
var user_data = userData()
function searchAddrFromAddrs(addrid){
    var result
    for(let i=0;i<user_data.addrs.length;i++){
        var addr = user_data.addrs[i]
        console.log(addr)
        if(addr.addrid == addrid){
            result = addr
        }
    }
    return result || {}
}
/**
 * 用户数据
 * */
function userData() {
  var arr = {
    uid: '1',
    nickname: '山炮',
    name: '张三',
    phone: '13833337998',
    avatar: '../../images/avatar.png',
    addrs: [
      {
        uid: '1',
        nickname: '山炮',
        name: '张三',
        phone: '13833337998',
        avatar: '../../images/avatar.png',
      },
      {
        uid: '2',
        nickname: '山炮',
        name: '张三',
        phone: '13833337998',
        avatar: '../../images/avatar.png',
      }
    ]
  }
  return arr
}
/**
 * 省
 * */
function provinceData() {
  var arr = [
    //{pid:1,pzip:'110000',pname:'北京市'},
    //{pid:2,pzip:'120000',pname:'天津市'}
    '请选择省份', '福建省'
  ]
  return arr
}
/**
 * 市
 * */
function cityData() {
  var arr = [
    //{cid:1,czip:'110100',cname:'市辖区',pzip:'110000'},
    //{cid:2,czip:'120100',cname:'市辖区',pzip:'120000'}
    '请选择城市', '福州市', '厦门市', '宁德市'
  ]
  return arr
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}  

/*
 * 对外暴露接口
 */ 
module.exports = {
  getBannerData : getBannerData,
  getIndexNavData : getIndexNavData,
  getIndexNavSectionData : getIndexNavSectionData,
  getPickerData : getPickerData,
  getSkilledData :getSkilledData,
  userData : userData,
  provinceData : provinceData,
  cityData : cityData,
  searchAddrFromAddrs : searchAddrFromAddrs,
formatTime: formatTime
}