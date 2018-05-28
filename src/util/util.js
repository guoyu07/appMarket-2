import axios from  '../api/axios_api.js'
// 上传app表单的验证规则----------------------------------------------------------------
export function validate(nameValidate,introValidate,listValidate){
  const validate = {
    appName: [
      { required: true, validator: nameValidate, trigger: 'blur' },
    ],
    tag: [
      { required: true, message: '请选择应用标签', trigger: 'change' }
    ],
    type: [
      { required: true, message: '请选择种类', trigger: 'change' }
    ],
    classify: [
      { required: true, message: '请选择分类', trigger: 'change' }
    ],
    summary: [
      { required: true, message: '请输入一句话简介', trigger: 'blur' },
      { type: 'string', max: 8, message: '8个字以内', trigger: 'blur' }
    ],
    introduce: [
      { required: true,  validator: introValidate, trigger: 'blur' }
    ],
    featureDesc: [
      { required: true, message: '请输入新版特征', trigger: 'blur' },
      { type: 'string', max: 1000, message: '1000个字以内', trigger: 'blur' }
    ],

    authority: [
      { required: true, message: '请输入权限获取说明', trigger: 'blur' }
    ],
    ifChare: [
      { required: true, message: '请选择收费情况', trigger: 'change' }
    ],
    hasAd: [
      { required: true, message: '请选择广告状态', trigger: 'change' }
    ],
    supportLanguage: [
      { required: true, message: '请选择支持语言', trigger: 'change' }
    ],
    iconUrl: [
      { required: true, message: '请选择图标', trigger: 'change' }
    ],
    uploadList:[
      { required: true,  validator: listValidate, trigger: 'blur' }
    ],
    
  }
  return validate
}

// app分类----------------------------------------------------------------------------
export const appClassify = {
  '01':'生活服务',
  '02':'购物',
  '03':'运动健康',
  '04':'社交',
  '05':'教育学习',
  '06':'旅游酒店',
  '07':'视频',
  '08':'音乐',
  '09':'出行',
  '10':'阅读',
}

// app收费描述-------------------------------------------------------------------------
export const appIfChare = {
  '1':'完全免费',
  '2':'部分功能收费',
  '3':'部分内容收费'
}

// app广告状态-------------------------------------------------------------------------
export const appHasAd = {
  '1':'无广告',
  '2':'内嵌广告',
  '3':'通知栏广告',
  '4':'含广告'
}

// app支持语言-------------------------------------------------------------------------
export const appSupportLanguage = {
  '1':'简体中文',
  '2':'英文',
  '3':'其他',
}

// 手机系统类型------------------------------------------------------------------------
export const allSystemType = {
  '01': '安卓应用',
  '02':'苹果应用',
  '03':'塞班应用',
  '04':'其他'
}

// 正则验证----------------------------------------------------------------------------
export function regTest(str,type){
  var myReg = ''
  switch(type){
    case 'phone':
      myReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      break;
    case 'email':
      myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/
      break;

  }
  return myReg.test(str)?true:false
}

// 解决多次点击按钮多次提示的问题  应用管理与用户管理模块启用禁用黑白名单按钮-----------------
export function breakTips(){
  $(".isDisabled").attr("disabled",true)
  $(".isDisabled").css({
      background:'#63c185',
      cursor:'pointer',
      color:'#fff'
  })
  var timer = setTimeout(function(){
      $(".isDisabled").attr("disabled",false)
      clearTimeout(timer)
  },2000)
}

// 权限管理部分全选、取消全选与全部折叠、全部展开-------------------------------------------
export function setValue(arr,key,flag){
  for(var i = 0; i<arr.length; i++){
    arr[i][key] = flag
    if(arr[i].children.length!=0){
      setValue(arr[i].children,key,flag)
    }
  }
}
// 获取权限ID------------------------------------------------------------------------------
export function getId(arr,arr1){
  
  for(var i = 0; i<arr.length;i++){
    if(arr[i].checked==true){
      arr1.push(arr[i].id)
      if(arr[i].children.length!=0){
        getId(arr[i].children,arr1)
      }
    }
  }
}
// 日期格式化-------------------------------------------------------------------------------
Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}        


 