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
              <p>主题：微信</p>
              <p>包名：WeChat</p>
              <p>签名：123344567</p>
            </div>
            <div class="right">
              <p>版本号：微信</p>
              <p>版本名：WeChat</p>
              <p>更新时间：123344567</p>
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
            <Form :model="appInfo" :label-width="120" :rules="ruleValidate">
              <FormItem label="应用名："  prop="appName">
                <Input v-model="appInfo.appName" placeholder="建议20字以内，不超过100个字。" style="width:400px"></Input>
              </FormItem>
              <FormItem label="应用标签："  prop="tag">
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
                <Input v-model="appInfo.abstract" placeholder="8个字以内，简要说明产品的特色和卖点。"></Input>
              </FormItem>
              <FormItem label="应用描述：">
                <Input type="textarea" v-model="appInfo.description" :autosize="{minRows: 2,maxRows: 5}" placeholder="一段话描述你的产品，1000汉字以内，做好分段排版，禁止添加链接"></Input>
              </FormItem>
              <FormItem label="新版特征：">
                <Input type="textarea" v-model="appInfo.feature" :autosize="{minRows: 2,maxRows: 5}" placeholder="列举产品的几点特征，使用序号标识，做好换行，1000汉字以内"></Input>
              </FormItem>
              <FormItem label="权限获取说明：">
                <Input type="textarea" v-model="appInfo.rights" :autosize="{minRows: 2,maxRows: 5}" placeholder="举例：获取通讯录权限是为了方便用户添加好友；获取地理位置权限是为了方便用户找到距离自己最近的商铺。"></Input>
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

        <!-- 图标和截图 -->
        <div class="wrap">
          <h2>图标和截图</h2>
          <div class="appInfo">
            <Form :label-width="100">
                <FormItem label="应用图标">
                  <div style="width:60px;height:60px;margin:10px 0;border:1px solid #ccc"></div>
                  <div>
                    <Upload action="" :before-upload="handleBeforeUpload">
                        <Button type="success" icon="ios-cloud-upload-outline">重新上传</Button>
                    </Upload>
                  </div>
                </FormItem>
                <FormItem label="应用截图">
                  <div class="shot_wrap">
                    <Icon type="close-circled" class="delShot"></Icon>
                  </div>
                  <div class="shot_wrap">
                    <Icon type="close-circled" class="delShot"></Icon>
                  </div>
                  <div class="shot_wrap">
                    <Icon type="close-circled" class="delShot"></Icon>
                  </div>
                  <div class="shot_wrap">
                    <Icon type="close-circled" class="delShot"></Icon>
                  </div>
                </FormItem>
              </Form>
          </div>
        </div>

        <!-- 底部按钮 -->
      <div class="wrap btn_wrap">
          <Button size="large" style="margin-right:20px" @click="$router.push({path:'/index/appManage'})">取消</Button>
          <Button type="primary" size="large">提交</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$route.query)
    document.title = "应用管理-编辑"
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
      },
      ruleValidate:{
         appName: [
            { required: true, message: '请输入应用名', trigger: 'blur' }
         ],
      }
    }
  },

  methods: {
    // 上传apk
    handleBeforeUpload(){

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


