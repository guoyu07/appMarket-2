<template>
  <div id="appDetail">
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">{{$route.query.type==1?'编辑':'版本升级'}}</span></h1>
    <div class="bottom_wrap">
      
        <!-- 简介 -->
        <div class="intro">
          <p style="margin-left:20%">微信</p>
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
              <p>更新时间：{{app.updateDate}}</p>
            </div>
          </div>
          <div class="upload">
            <Upload action="" :before-upload="handleBeforeUpload">
                <Button type="success" icon="ios-cloud-upload-outline">重新上传</Button>
            </Upload>
          </div>
        </div>

        <!-- 应用信息 -->
        <div class="wrap">
          <h2>应用信息</h2>
          <div class="appInfo">
            <!-- 表单 -->
            <Form ref="formValidate" :model="appInfo" :label-width="120" :rules="ruleValidate">
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
                    <Option value="1">生活服务</Option>
                    <Option value="2">购物</Option>
                    <Option value="3">运动健康</Option>
                    <Option value="4">社交</Option>
                    <Option value="5">教育学习</Option>
                    <Option value="6">旅游酒店</Option>
                    <Option value="7">视频</Option>
                    <Option value="8">音乐</Option>
                    <Option value="9">出行</Option>
                    <Option value="10">阅读</Option>
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

        <!-- 图标和截图 -->
        <div class="wrap">
          <h2>图标和截图</h2>
          <div class="appInfo">
            <Form :label-width="100">
                <FormItem label="应用图标">
                  <div style="width:60px;height:60px;margin:10px 0;border:1px solid #ccc">
                    <img src="../../assets/img/1.png" alt="">
                  </div>
                  <div>
                    <Upload action="" :before-upload="handleBeforeUpload">
                        <Button type="success" icon="ios-cloud-upload-outline">重新上传</Button>
                    </Upload>
                  </div>
                  <p style="font-size:12px;margin-bottom:20px">请上传尺寸512*512，大小200K以内，JPG、PNG格式，建议使用直角图标。</p>

                </FormItem>
                <FormItem label="应用截图">
                  <div class="clearfix">
                    <div class="shot_wrap" v-for="(item,index) in appInfo.captureUrls" :key="index">
                      <Icon type="close-circled" class="delShot"></Icon>
                      <img src="" alt="">
                    </div>
                  </div>
                  <p style="font-size:12px;margin-bottom:20px">请上传2-4张截图（尺寸保持一致），单张图片不超过1M。截图不能小于320*480像素，推荐480*800像素。JPG、PNG格式。</p> 
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
  </div>
</template>

<script>
import {validate} from '../../util/util.js'

export default {
// created----------------------------------------------------------------------------------
  created(){
    console.log(this.$route.query)
    document.title = "应用管理-编辑"
  },

// data-------------------------------------------------------------------------------------
  data(){
    return {
      iconFile:'',
      shotFiles:'',
      app: {
        theme:"",
        packageName: "",
        sign:"",
        versionNumber: "",
        name:"",
        updateDate:""
      },
      appInfo:{
        name: "",
        tag: "",
        type: "1",
        classify: "",
        summary:"",
        introduce: "",
        featureDesc: "",
        authority: "",
        ifChare: "",
        hasAd: "",
        supportLanguage: "",
        iconUrl:'',
        captureUrls:[1,2,3]
      },
      ruleValidate:validate
    }
  },

// methods----------------------------------------------------------------------------------
  methods: {
    // 上传apk
    handleBeforeUpload(){

    },

    //提交应用信息
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
  #appDetail {
    .bottom_wrap{
      .intro {
        padding:20px;
        background:#fff;
        .upload {
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
        margin-top:20px;
        .appInfo{
          width:60%;
          margin-left:20%;
          margin-top:20px;
        }
        .icon{
          padding:20px;
          margin-left:21%;
          .title{
            float:left;
            color:#999;
          }
          .icon_img {
            width:60px;
            height: 60px;
            border:1px solid #ccc;
            margin-left:20px;
          }
        }
      }
      .btn_wrap {
        padding:20px;
        margin-top:20px;
        text-align:center
      }
      .appInfo {
        .shot_wrap {
          width:100px;
          height:200px;
          margin:10px 20px 0 0;
          border:1px solid #ccc;
          float:left;
          position:relative;
        }
        .delShot{
          font-size:20px;
          position:absolute;
          right:-10px;
          top:-10px;
          cursor:pointer;
          color:red;
        }
      }
    }
  }
</style>


