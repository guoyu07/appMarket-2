<template>
  <div id="addApp"> 
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">添加应用</span></h1>
    <div class="bottom_wrap">
      <!-- 上传安装包 -->
      <div class="wrap upload_wrap">
        <h2>上传安装包</h2>

        <!-- 首次上传时显示 -->
        <div class="upload" v-if='true'>
          <Upload action="" :before-upload="handleBeforeUpload" :on-success='upIconSuccess'>
              <Button type="success" icon="ios-cloud-upload-outline">上传apk</Button>
          </Upload>
          <span id="cancle" v-if="isUploading" @click="breakUpload">取消</span>
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
            <Upload action="" :before-upload="handleBeforeUpload" :show-upload-list="false">
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
          <Form ref='formValidate' :model="appInfo" :label-width="120" :rules="ruleValidate">
            <FormItem label="应用名："  prop="name">
               <Input v-model="appInfo.name" placeholder="建议20字以内，不超过100个字。" style="width:400px"></Input>
            </FormItem>
            <FormItem label="应用标签："  prop="tag">
              <Select v-model="appInfo.tag" placeholder="请选择" style="width:200px">
                  <Option value="1">工作</Option>
                  <Option value="2">生活</Option>
              </Select>
            </FormItem>
            <FormItem label="种类：" prop="type">
              <Select v-model="appInfo.type" placeholder="请选择" style="width:200px">
                  <Option value="1">应用</Option>
              </Select>
            </FormItem>
            <FormItem label="分类：" prop="classify">
              <Select v-model="appInfo.classify" placeholder="请选择" style="width:200px">
                  <Option v-for='(val,key,index) in allType'  :value="key" :key='index'>{{val}}</Option>
              </Select>
            </FormItem>
            <FormItem label="一句话简介：" prop="summary">
               <Input v-model="appInfo.summary" placeholder="8个字以内，简要说明产品的特色和卖点。"></Input>
            </FormItem>
            <FormItem label="应用描述：" prop="introduce">
               <Input type="textarea" v-model="appInfo.introduce" :autosize="{minRows: 2,maxRows: 5}" placeholder="一段话描述你的产品，1000汉字以内，做好分段排版，禁止添加链接"></Input>
            </FormItem>
            <FormItem label="新版特征：" prop="featureDesc">
               <Input type="textarea" v-model="appInfo.featureDesc" :autosize="{minRows: 2,maxRows: 5}" placeholder="列举产品的几点特征，使用序号标识，做好换行，1000汉字以内"></Input>
            </FormItem>
            <FormItem label="权限获取说明：" prop="authority">
               <Input type="textarea" v-model="appInfo.authority" :autosize="{minRows: 2,maxRows: 5}" placeholder="举例：获取通讯录权限是为了方便用户添加好友；获取地理位置权限是为了方便用户找到距离自己最近的商铺。"></Input>
            </FormItem>
            <FormItem label="收费描述：" prop="ifChare">
                <RadioGroup v-model="appInfo.ifChare">
                    <Radio label="1">完全免费</Radio>
                    <Radio label="2">部分功能收费</Radio>
                    <Radio label="3">部分内容收费</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="广告状态：" prop="hasAd">
                <RadioGroup v-model="appInfo.hasAd">
                    <Radio label="1">无广告</Radio>
                    <Radio label="2">内嵌广告</Radio>
                    <Radio label="3">通知栏广告</Radio>
                    <Radio label="4">含广告</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="支持语言：" prop="supportLanguage">
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
        <div class="img_icon">
          <p class="title">应用图标：</p>
          <div style="margin-bottom:5px;margin-left:80px;">
            <Upload
                type="drag"
                action=""
                 style="width:150px;height:150px;">
                <div style="padding: 20px 0">
                    <Icon type="plus" size="52" style="color: #f2f3f3"></Icon>
                    <p class="upBtn"><Button type="success">上传图标</Button></p>
                </div>
            </Upload>
          </div>
          <p style="margin-left:80px;font-size:12px;margin-bottom:20px">请上传尺寸512*512，大小200K以内，JPG、PNG格式，建议使用直角图标。</p>
          <p class="title">应用截图：</p>
          <div class="clearfix" >
            <div class="screenShot"  style="margin-bottom:5px;margin-left:10px;">
              <Upload
                  multiple
                  type="drag"
                  action="">
                  <div style="padding: 50px">
                      <Icon type="plus" size="52" style="color: #f2f3f3"></Icon>
                  </div>
              </Upload>
            </div>
          </div>
          <p style="margin-left:80px;font-size:12px;margin-bottom:20px">请上传2-4张截图（尺寸保持一致），单张图片不超过1M。截图不能小于320*480像素，推荐480*800像素。JPG、PNG格式。</p> 
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="wrap btn_wrap">
          <Button size="large" style="margin-right:20px" @click="$router.push({path:'/index/appManage'})">取消</Button>
          <Button type="primary" size="large" @click='submit'>提交</Button>
      </div>

    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {validate} from '../../util/util.js'
export default {
// created-----------------------------------------------------------------------------
  created(){
    document.title="应用管理-添加应用";
  },

// data---------------------------------------------------------------------------------
  data(){
    return {
      isUploading:false,
      currentAjax:'',
      appFile:'',
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
        supportLanguage: ""
      },
      app: {
        theme:"",
        packageName: "",
        sign:"",
        versionNumber: "",
        name:"",
        size:""
      },
      ruleValidate:validate
    }
  },

// methods-------------------------------------------------------------------------------
  methods: {

    // 上传图片处理
    handleBeforeUpload(file){
      // console.log(file)
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
          that.currentAjax = that.axios.post('/login',qs.stringify({file:this.appFile})).then(res=>{

          })
        }
        

        return false // 用于自定义上传
        
    },

    // 取消上传图标
    breakUpload(){
      this.currentAjax.abort()
    },

    // 上传图标成功
    upIconSuccess(response, file, fileList){
      this.isUploading = false
    },

    // 提交应用信息
    submit(){
      this.$refs['formValidate'].validate((valid) => {
            if(valid && this.shotFiles != '' && this.iconFile != '') {
              console.log(11111)
            }
      })
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
      .img_icon{
        padding:20px;
        .title {
          margin-bottom:20px;
          float:left;
        }
        .upBtn {
          margin-top:25px;
        }
        .screenShot {
          float: left;
          margin-right:20px;
          width:200px;
          height:200px;
        }
        .upBtn2 {
          margin:50px 0;
        }
      }
    }
    
    .btn_wrap {
      padding:20px 300px;
    }
    
  }
</style>


