<template>
  <div id="addApp">
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">添加应用</span></h1>
    <div class="bottom_wrap">
      <!-- 上传安装包 -->
      <div class="wrap upload_wrap">
        <h2>上传安装包</h2>
        <div class="upload">
          <Upload action="" :before-upload="handleBeforeUpload">
              <Button type="success" icon="ios-cloud-upload-outline">上传apk</Button>
          </Upload>
        </div>
      </div>

      <!-- 填写应用信息 -->
      <div class="wrap appInfo_wrap ">
        <h2>填写应用信息（均必填）</h2>
        <div class="form_wrap">
          <!-- 表单 -->
          <Form :model="appInfo" :label-width="120">
            <FormItem label="应用名：">
               <Input v-model="appInfo.appName" placeholder="应用名"></Input>
            </FormItem>
            <FormItem label="应用标签：">
              <Select v-model="appInfo.tag" placeholder="请选择" style="width:200px">
                  <Option value="1">工作</Option>
                  <Option value="2">生活</Option>
              </Select>
            </FormItem>
            <FormItem label="种类：">
              <Select v-model="appInfo.type" placeholder="请选择" style="width:200px">
                  <Option value="1">应用</Option>
              </Select>
            </FormItem>
            <FormItem label="分类：">
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
            <FormItem label="一句话简介：">
               <Input v-model="appInfo.abstract" placeholder="一句话简介"></Input>
            </FormItem>
            <FormItem label="应用描述：">
               <Input type="textarea" v-model="appInfo.description" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
            </FormItem>
            <FormItem label="新版特征：">
               <Input type="textarea" v-model="appInfo.feature" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
            </FormItem>
            <FormItem label="权限获取说明：">
               <Input type="textarea" v-model="appInfo.rights" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
            </FormItem>
            <FormItem label="收费描述：">
                <RadioGroup v-model="appInfo.fee">
                    <Radio label="1">完全免费</Radio>
                    <Radio label="2">部分功能收费</Radio>
                    <Radio label="3">部分内容收费</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="广告状态：">
                <RadioGroup v-model="appInfo.adStatus">
                    <Radio label="1">无广告</Radio>
                    <Radio label="2">内嵌广告</Radio>
                    <Radio label="3">通知栏广告</Radio>
                    <Radio label="4">含广告</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="支持语言：">
                <RadioGroup v-model="appInfo.language">
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
          <p class="title">应用图标：请上传尺寸512*512，大小200K以内，JPG、PNG格式，建议使用直角图标。</p>
          <div style="margin-bottom:20px;">
            <Upload
                multiple
                type="drag"
                action=""
                 style="width:150px;height:150px;">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p class="upBtn"><Button type="success">上传图片</Button></p>
                </div>
            </Upload>
          </div>

          <p class="title">应用截图：请上传2-4张截图（尺寸保持一致），单张图片不超过1M。截图不能小于320*480像素，推荐480*800像素。JPG、PNG格式。</p>
          <div class="clearfix">
            <div class="screenShot">
              <Upload
                  multiple
                  type="drag"
                  action="">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="upBtn2"><Button type="success">上传截图</Button></p>
                  </div>
              </Upload>
            </div>
            <div class="screenShot">
              <Upload
                  multiple
                  type="drag"
                  action="">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="upBtn2"><Button type="success">上传截图</Button></p>
                  </div>
              </Upload>
            </div>
            <div class="screenShot">
              <Upload
                  multiple
                  type="drag"
                  action="">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="upBtn2"><Button type="success">上传截图</Button></p>
                  </div>
              </Upload>
            </div>
            <div class="screenShot">
              <Upload
                  multiple
                  type="drag"
                  action="">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p class="upBtn2"><Button type="success">上传截图</Button></p>
                  </div>
              </Upload>
            </div>

          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="wrap btn_wrap">
          <Button size="large" style="margin-right:20px">取消</Button>
          <Button type="primary" size="large">提交应用</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    document.title="应用管理-添加应用";
  },
  data(){
    return {
      appInfo:{
        appName: "",
        tag: "",
        type: "1",
        classify: "",
        abstract:"",
        description: "",
        feature: "",
        rights: "",
        fee: "",
        adStatus: "",
        language: ""
      }
    }
  },
  methods: {
    handleBeforeUpload(file){
      console.log(file)
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var data; 
        var that = this
        reader.onload = function(e){ 
          console.log(e)
          console.log(this.result)
        }
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
    }
    .wrap {
      border:1px solid #ccc;
      border-radius:5px;
      background:#eaf1f8;
    }
    .upload_wrap {
      margin-bottom:20px;
      .upload {
        text-align:center;
        margin:30px auto;
      }
    }
    .appInfo_wrap {
       margin-bottom:20px;
      .form_wrap {
        width:500px;
        margin:30px auto;
      }
    }
    .upload_img_wrap{
      margin-bottom:20px;
      .img_icon{
      padding:20px;
      .title {
        margin-bottom:20px;
      }
      .upBtn {
        margin-top:25px;
      }
      .screenShot {
        float: left;
        margin-right:20px;
        width:200px;
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


