<template>
  <div id="addApp"> 
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">添加应用</span></h1>
    <div class="bottom_wrap">
      <!-- 上传安装包 -->
      <div class="wrap upload_wrap">
        <h2>上传安装包</h2>

        <!-- 首次上传时显示 -->
        <div class="upload" v-if='isFirst'>
          <Upload action="" :before-upload="handleBeforeUploadApk" :accept='".apk"'>
              <Button type="success" icon="ios-cloud-upload-outline">上传apk</Button>
          </Upload>
          
        </div>

        <!-- 上传成功后显示 -->
        <div class="intro" v-else>
          <div class="info clearfix">
            <img src="" alt="" class="img_wrap">
            <div class="left">
              <p>主题：{{app.theme}}</p>
              <p>包名：{{app.packageName}}</p>
              <p>签名：{{app.sign}}</p>
            </div>
            <div class="right">
              <p>版本号：{{app.versionNumber}}</p>
              <p>版本名：{{app.name}}</p>
              <p>包大小：{{app.size}}</p>
            </div>
          </div>
          <div class="upload1">
            <Upload action="" :before-upload="handleBeforeUploadApk" :show-upload-list="false"  :accept='"apk"'>
                <Button type="success" icon="ios-cloud-upload-outline">重新上传</Button>
            </Upload>
          </div>
        </div>

      </div>
      

      <!-- 填写应用信息 -->
      <div class="wrap appInfo_wrap ">
        <h2>填写应用信息（均必填）</h2>
        <div class="form_wrap">
          <!-- 表单 -->
          <Form ref='formValidate' :model="appInfo" :label-width="110" :rules="ruleValidate">
            <FormItem label="应用名"  prop="name">
               <Input v-model="appInfo.name" placeholder="建议20字以内，不超过100个字。" style="width:400px"></Input>
            </FormItem>
            <FormItem label="应用标签"  prop="tag">
              <Select v-model="appInfo.tag" placeholder="请选择" style="width:200px">
                  <Option value="1">工作</Option>
                  <Option value="2">生活</Option>
              </Select>
            </FormItem>
            <FormItem label="种类" prop="type">
              <Select v-model="appInfo.type" placeholder="请选择" style="width:200px">
                  <Option value="1">应用</Option>
              </Select>
            </FormItem>
            <FormItem label="分类" prop="classify">
              <Select v-model="appInfo.classify" placeholder="请选择" style="width:200px">
                  <Option v-for='(val,key,index) in allType'  :value="key" :key='index'>{{val}}</Option>
              </Select>
            </FormItem>
            <FormItem label="一句话简介" prop="summary">
               <Input v-model="appInfo.summary" placeholder="8个字以内，简要说明产品的特色和卖点。"></Input>
            </FormItem>
            <FormItem label="应用描述" prop="introduce">
               <Input type="textarea" v-model="appInfo.introduce" :autosize="{minRows: 2,maxRows: 5}" placeholder="一段话描述你的产品，1000汉字以内，做好分段排版，禁止添加链接"></Input>
            </FormItem>
            <FormItem label="新版特征" prop="featureDesc">
               <Input type="textarea" v-model="appInfo.featureDesc" :autosize="{minRows: 2,maxRows: 5}" placeholder="列举产品的几点特征，使用序号标识，做好换行，1000汉字以内"></Input>
            </FormItem>
            <FormItem label="权限获取说明" prop="authority">
               <Input type="textarea" v-model="appInfo.authority" :autosize="{minRows: 2,maxRows: 5}" placeholder="举例：获取通讯录权限是为了方便用户添加好友；获取地理位置权限是为了方便用户找到距离自己最近的商铺。"></Input>
            </FormItem>
            <FormItem label="收费描述" prop="ifChare">
                <RadioGroup v-model="appInfo.ifChare">
                    <Radio label="1">完全免费</Radio>
                    <Radio label="2">部分功能收费</Radio>
                    <Radio label="3">部分内容收费</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="广告状态" prop="hasAd">
                <RadioGroup v-model="appInfo.hasAd">
                    <Radio label="1">无广告</Radio>
                    <Radio label="2">内嵌广告</Radio>
                    <Radio label="3">通知栏广告</Radio>
                    <Radio label="4">含广告</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="支持语言" prop="supportLanguage">
                <RadioGroup v-model="appInfo.supportLanguage">
                    <Radio label="1">简体中文</Radio>
                    <Radio label="2">英文</Radio>
                    <Radio label="3">其他</Radio>
                </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>

      <!-- 上传图标和截图 -->
      <div class="wrap upload_img_wrap ">
        <h2>上传图标和截图（均必填）</h2>
        <div class="appInfo">
            <Form ref='formValidate1' :model="appInfo" :label-width="110" :rules="ruleValidate">
              <FormItem label="应用图标" prop='iconUrl'>
                <div>
                  <img :src="appInfo.iconUrl" alt="" style="display:none" id="icon" > 
                  <Upload action="">                                
                      <Button type="success">上传图标</Button>
                  </Upload>
                </div>
                <p style="font-size:12px;">请上传尺寸512*512，大小200K以内，JPG、PNG格式，建议使用直角图标。</p>
              </FormItem>
              <FormItem label="应用截图" prop='uploadList'>
                <div class="clearfix" >
                  <div class="screenShot">
                    <!-- <Upload
                        multiple
                        type="drag"
                        action="">
                        <div style="padding: 50px">
                            <Icon type="plus" size="52" style="color: #f2f3f3"></Icon>
                        </div>
                    </Upload> -->
                    <div class="demo-upload-list" v-for="(item,index) in appInfo.uploadList" :key="index">
                        <template v-if="item.status === 'finished'">
                            <Icon type="close-circled" class="delShot"  @click.native="handleRemove(item)"></Icon>
                            <img :src="item.url">
                            <!-- <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div> -->
                            <div></div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        v-show="appInfo.uploadList.length<4"
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :accept='".jpg,.png"'
                        :before-upload="handleBeforeUpload"
                        type="drag"
                        action=""
                        style="display: inline-block;width:140px;">
                        <div style="width: 140px;height:250px;line-height: 250px;">
                            <Icon type="plus" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="图片预览" v-model="visible" class-name="vertical-center-modal viewModal" :mask-closable="false">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width:360px;height:480px;">
                    </Modal>


                  </div>
                </div>
                <p style="font-size:12px;margin-bottom:20px">请上传2-4张截图、单张大小不超过1M。JPG、PNG格式，像素540*960、720*1080、1080*1920。</p> 
              </FormItem>

            </Form>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="wrap btn_wrap">
          <Button size="large" style="margin-right:20px" @click="$router.push({path:'/index/appManage'})">取消</Button>
          <Button type="primary" size="large" @click='submit'>提交</Button>
      </div>

    </div>

    <!-- 上传进度模态框 -->
    <Modal v-model="progressModal" :closable='false' :mask-closable='false' class-name="vertical-center-modal" class="progressModal">
      <div id="progress">
        <p>正在上传: <span>{{fileName}}</span> </p>
        <Progress :percent="percent"></Progress>
        <div style="color:red;position:absolute;right:20px;top:65px;cursor:pointer"  @click='stopUpload'><Icon type="close-circled" size='24'></Icon></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
import {validate} from '../../util/util.js'

export default {
// created------------------------------------------------------------------------------------
  created(){
    document.title="应用管理-添加应用";
  },

// mounted-------------------------------------------------------------------------------------
  mounted(){
    this.appInfo.uploadList = this.$refs.upload.fileList;
  },

// data----------------------------------------------------------------------------------------
  data(){
     const nameValidate = (rule,value,callback)=>{
        if(value==''){
          callback(new Error('请输入应用名'))      
        }else if(value.length>100){
          callback(new Error('建议20字以内，不超过100个字。'))
        }else if(value!=this.app.theme){
          callback(new Error('应用名应与主题名一致'))      
        }else{
          callback()
        }
        // 查重
        // this.axios.get('/api').then(res=>{

        // })
    }
    const introValidate = (rule,value,callback)=>{
        var str = /(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/g;
        if(value==''){
          callback(new Error('请输入应用描述'))      
        }else if(value.length>1000){
          callback(new Error('1000字以内'))
        }else if(value.match(str)){
          callback(new Error('禁止添加链接'))      
        }else{
          callback()
        }
    }
    const listValidate = (rule,value,callback)=>{
        if(value.length==0){
          callback(new Error('请上传应用截图'))      
        }else if(value.length<2){
          callback(new Error('请至少上传2张应用截图'))
        }else{
          callback()
        }
    }
    return {
      percent:0,
      isFirst:true,
      progressModal:false,
      isUploading:false,
      currentAjax:'',
      appFile:'',
      fileName:'',
      iconFile:'',
      shotFiles:'',
      allType:{
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
      },
      appInfo:{
        name: "",
        tag: "",
        type: "1",
        classify: "09",
        summary:"",
        introduce: "",
        featureDesc: "",
        authority: "",
        ifChare: "",
        hasAd: "",
        supportLanguage: "",
        iconUrl:"",
        uploadList:[]
      },
      app: {
        theme:"",
        packageName: "",
        sign:"",
        versionNumber: "",
        name:"",
        size:""
      },
      ruleValidate:validate(nameValidate,introValidate,listValidate),
      defaultList: [
        {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        },
         {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        
      ],
      imgName: '',
      visible: false,
    }
  },

// methods-------------------------------------------------------------------------------
  methods: {
    // 上传APK处理
    handleBeforeUploadApk(file){
      console.log(file)
       this.fileName = file.name
        this.isUploading = true
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var data; 
        var that = this
        reader.onload = function(e){ 
          // console.log(e)
          console.log(this.result)
          that.appFile = this.result
          
          // 发送ajax请求上传apk
          console.log(that.appFile)
          var config = {
            onUploadProgress: progressEvent => {
              var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
              this.progress = complete
            }
          }
          that.progressModal = true
          that.currentAjax = that.axios.post('/login',qs.stringify({file:this.appFile}),config).then(res=>{

          })
        }
        

        return false // 用于自定义上传
        
    },

    // 取消上传APK
    stopUpload(){
      // this.currentAjax.abort()
      this.progressModal = false

    },

    // 提交应用信息
    submit(){
      if(this.validateForm('formValidate')&&this.validateForm('formValidate1')||this.validateForm('formValidate1')&&this.validateForm('formValidate')){
        console.log(11111111111111)
      }
    },

    // 判断表单是否验证通过
    validateForm(name){
      this.$refs[name].validate((valid) => {
          if(valid) {
              return true
          }
      })
    },


    // handleView (name) {
    //     this.imgName = name;
    //     this.visible = true;
    // },

    // 删除截图
    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },

    // 上传图片
    handleBeforeUpload (file) {
      console.log(file)
      const size = file.size / 2048 / 2048
      if(size>1){
        this.$Message.error({
          content:"图片大小不超过1M!",
          duration:3
        })
        return;
      }
      var that = this
      var reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = function(e){ 

        var base = this.result;
        var img = new Image()
        img.src = base

        img.onload = function(){
          if(img.width/img.height!=0.5625&&(img.width!=540&&img.height!=960)){
            that.$Message.error({
              content:"请上传像素540*960、720*1080、1080*1920的图片！",
              duration:3
            })
            return
          }
        }
        
      }
      return false
    }


  }

}
</script>

<style lang="scss" scoped type="text/css">
  #addApp {
    h2 {
      height: 40px;
      line-height:40px;
      font-size:18px;
      text-indent:20px;
      border-bottom: 1px dashed #ccc;
      background:#ebebeb;
    }
    .wrap {
      border:1px solid #ccc;
      border-radius:5px;
      background:#fff;
    }
    .upload_wrap {
      margin-bottom:20px;
      .upload {
        text-align:center;
        margin:30px auto;
        position:relative;
        #cancle{
          position: absolute;
          top: 40px;
          right: 20px;
          cursor:pointer;
        }
      }
    }
    .intro {
        padding:20px;
        background:#fff;
        .upload1 {
          text-align:center;
          margin:30px auto;
        }
        .info{
          margin-left:20%;
          
          .img_wrap,.left,.right{
            float:left;
            margin-right:50px;
            p{
              margin-bottom:5px;
            }
          }
          .img_wrap{
            width:80px;
            height: 80px;
            background:#ccc
          }
        }
      }
    .appInfo_wrap {
       margin-bottom:20px;
      .form_wrap {
          width:60%;
          margin-left:20%;
          margin-top:20px;
      }
    }
    .upload_img_wrap{
      margin-bottom:20px;
      .appInfo{
          width:70%;
          margin-left:20%;
          margin-top:20px;
        }
        .upBtn2 {
          margin:50px 0;
        }
      }
    }
    
    .btn_wrap {
      padding:20px;
      padding-left:-webkit-calc(20% + 110px)
    } 

   #progress {
      padding:10px 30px 25px 10px;
      p{
        font-size:20px;
        margin-bottom:10px;
        span {
          color:#63c185
        }
      }
    }  

    .demo-upload-list{
        display: inline-block;
        width: 140px;
        height: 250px;
        text-align: center;
        line-height: 250px;
        border: 1px solid transparent;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 10px;
    }
    .demo-upload-list img{
        width: 136px;
        height: 242px;
        vertical-align: middle;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    } 
    .delShot{
          font-size:20px;
          position:absolute;
          right:0;
          top:0;
          cursor:pointer;
          color:red;
        }
</style>


