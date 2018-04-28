<template>
  <div id="appDetail">
    <h1><span>当前位置 > </span><a href="#/index/appManage">应用管理</a><span> > </span><span class="title_active">详情</span></h1>
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
        </div>

        <!-- 应用信息 -->
        <div class="wrap">
          <h2>应用信息</h2>
          <div class="appInfo">
              <Form :label-width="100">
                <FormItem label="应用名">微信</FormItem>
                <FormItem label="应用标签">工作</FormItem>
                <FormItem label="种类">应用</FormItem>
                <FormItem label="分类">生活服务</FormItem>
                <FormItem label="一句话简介">通信工具</FormItem>
                <FormItem label="应用描述">政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通</FormItem>
                <FormItem label="新版本特征">政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通</FormItem>
                <FormItem label="权限获取说明">政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通政务通</FormItem>
                <FormItem label="收费描述">完全免费</FormItem>
                <FormItem label="广告状态">无广告</FormItem>
                <FormItem label="支持语言">中文</FormItem>
              </Form>
          </div>
        </div>

        <!-- 图标和截图 -->
        <div class="wrap">
          <h2>图标和截图</h2>
          <div class="appInfo">
            <Form :label-width="100">
                <FormItem label="应用图标"><div style="width:60px;height:60px;margin-top:10px;border:1px solid #ccc"></div></FormItem>
                <FormItem label="应用截图">
                  <div style="width:100px;height:200px;margin:10px 20px 0 0;border:1px solid #ccc;float:left"></div>
                  <div style="width:100px;height:200px;margin:10px 20px 0 0;border:1px solid #ccc;float:left"></div>
                  <div style="width:100px;height:200px;margin:10px 20px 0 0;border:1px solid #ccc;float:left"></div>
                  <div style="width:100px;height:200px;margin:10px 20px 0 0;border:1px solid #ccc;float:left"></div>
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
  created(){
    document.title = "应用管理-详情"
  },
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
      .btn_wrap {
        padding:20px;
        margin-top:20px;
        text-align:center
      }
    }
  }
</style>


