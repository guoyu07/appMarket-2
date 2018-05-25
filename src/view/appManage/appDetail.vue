<template>
  <div id="appDetail">
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">详情</span></h1>
    <div class="bottom_wrap">
      
        <!-- 简介 -->
        <div class="intro">
          <p style="margin-left:23%">{{appInfo.appName}}</p>
          <div class="info clearfix">
            <img :src="appInfo.logoPath" alt="" class="img_wrap">
            <div class="left">
              <p>主题：{{appInfo.subject}}</p>
              <p>包名：{{appInfo.packageName}}</p>
              <p>包大小：{{appInfo.size}}</p>
            </div>
            <div class="right">
              <p>版本号：{{appInfo.versionNumber}}</p>
              <p>版本名：{{appInfo.versionName}}</p>
              <p>更新时间：{{appInfo.updateDate}}</p>
            </div>
          </div>
        </div>

        <!-- 应用信息 -->
        <div class="wrap">
          <h2>应用信息</h2>
          <div class="appInfo">
              <Form :label-width="100">
                <FormItem label="应用名">{{appInfo.appName}}</FormItem>
                <FormItem label="应用标签">{{appInfo.tag=='1'?'工作':'生活'}}</FormItem>
                <FormItem label="种类">{{appInfo.type=='0'?'应用':'其他'}}</FormItem>
                <FormItem label="分类">{{appClassify[appInfo.classify]}}</FormItem>
                <FormItem label="一句话简介">{{appInfo.summary}}</FormItem>
                <FormItem label="应用描述">{{appInfo.introduce}}</FormItem>
                <FormItem label="新版本特征">{{appInfo.featureDesc}}</FormItem>
                <FormItem label="权限获取说明">{{appInfo.authority}}</FormItem>
                <FormItem label="收费描述">{{appIfChare[appInfo.ifChare]}}</FormItem>
                <FormItem label="广告状态">{{appHasAd[appInfo.hasAd]}}</FormItem>
                <FormItem label="支持语言">{{appSupportLanguage[appInfo.supportLanguage]}}</FormItem>
              </Form>
          </div>
        </div>

        <!-- 图标和截图 -->
        <div class="wrap">
          <h2>图标和截图</h2>
          <div class="appInfo">
            <Form :label-width="100">
                <FormItem label="应用图标">
                  <div style="width:66px;height:66px;margin-top:10px;border:1px solid #ccc">
                    <img :src="appInfo.iconUrl" alt="" style="width:100%;height:100%">
                  </div>
                </FormItem>
                <FormItem label="应用截图">
                  <div class="urls" v-for='(item,index) in uploadList' :key='index'>
                    <img :src="item" alt="" style="width:100%;height:100%;display:block">
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
import {validate,appClassify,appIfChare,appHasAd,appSupportLanguage} from '../../util/util.js'

export default {
// created-----------------------------------------------------------------------------------
  created(){
    document.title = "应用管理-详情"
    this.appId = this.$route.query.id
    this.queryDetail()
  },

// data--------------------------------------------------------------------------------------
  data(){
    return {
      appId:"",
      uploadList:[],
      appClassify:appClassify,
      appIfChare:appIfChare,
      appHasAd:appHasAd,
      appSupportLanguage:appSupportLanguage,
      appInfo: {
        logoPath:"",
        subject:"",
        packageName: "",
        sign:"",
        versionNumber: "",
        versionName:"",
        updateDate:"",
        appName: "",
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
        captureUrls:''
      },
    }
  },

// methods---------------------------------------------------------------------------------------------
  methods:{
    // 查询详情
    queryDetail(){
      this.axios.get('/app/getDetail',{params:{
        appId:this.appId
      }}).then(res=>{
        if(res && res.success=='1'){
          const data = res.data
          this.appInfo = data
          this.uploadList = data.captureUrls.split(";")
        }
      })
      .catch(err=>{
        console.log(err)
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
        .info{
          margin-left:23%;
          
          .img_wrap,.left,.right{
            float:left;
            margin-right:50px;
            p{
              margin-bottom:5px;
            }
          }
          .img_wrap{
            width:48px;
            height: 48px;
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
        width:136px;
        height:242px;
        margin:10px 20px 0 0;
        border:1px solid #ccc;
        float:left;
      }
      .btn_wrap {
        padding:20px;
        padding-left:-webkit-calc(20% + 100px);
        margin-top:20px;
      } 
    }
  }
</style>


