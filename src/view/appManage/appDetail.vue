<template>
  <div id="appDetail">
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">详情</span></h1>
    <div class="bottom_wrap">
      
        <!-- 简介 -->
        <div class="intro">
          <p style="margin-left:20%">{{appInfo.name}}</p>
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
        </div>

        <!-- 应用信息 -->
        <div class="wrap">
          <h2>应用信息</h2>
          <div class="appInfo">
              <Form :label-width="100">
                <FormItem label="应用名">{{appInfo.name}}</FormItem>
                <FormItem label="应用标签">{{appInfo.tag}}</FormItem>
                <FormItem label="种类">{{appInfo.type}}</FormItem>
                <FormItem label="分类">{{appInfo.classify}}</FormItem>
                <FormItem label="一句话简介">{{appInfo.summary}}</FormItem>
                <FormItem label="应用描述">{{appInfo.introduce}}</FormItem>
                <FormItem label="新版本特征">{{appInfo.featureDesc}}</FormItem>
                <FormItem label="权限获取说明">{{appInfo.authority}}</FormItem>
                <FormItem label="收费描述">{{appInfo.ifChare}}</FormItem>
                <FormItem label="广告状态">{{appInfo.hasAd}}</FormItem>
                <FormItem label="支持语言">{{appInfo.supportLanguage}}</FormItem>
              </Form>
          </div>
        </div>

        <!-- 图标和截图 -->
        <div class="wrap">
          <h2>图标和截图</h2>
          <div class="appInfo">
            <Form :label-width="100">
                <FormItem label="应用图标">
                  <div style="width:60px;height:60px;margin-top:10px;border:1px solid #ccc">
                    <img :src="appInfo.iconUrl" alt="">
                  </div>
                </FormItem>
                <FormItem label="应用截图">
                  <div class="urls" v-for='(item,index) in appInfo.captureUrls' :key='index'>
                    <img src="" alt="">
                  </div>
                </FormItem>
              </Form>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="wrap btn_wrap">
            <Button type="primary" size="large" style="margin-right:20px" @click="$router.push({path:'/index/appManage'})">返回</Button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
// created-----------------------------------------------------------------------------------
  created(){
    document.title = "应用管理-详情"
  },

// data--------------------------------------------------------------------------------------
  data(){
    return {
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
        iconUrl:"",
        captureUrls:[1,2,3]
      },
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
          width:70%;
          margin-left:20%;
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
      .urls{
        width:100px;
        height:200px;
        margin:10px 20px 0 0;
        border:1px solid #ccc;
        float:left;
      }
      .btn_wrap {
        padding:20px;
        margin-top:20px;
        text-align:center
      }
    }
  }
</style>


