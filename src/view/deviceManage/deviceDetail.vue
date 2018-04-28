<template>
  <div id="deviceDetail">
    <h1><span>当前位置 > </span><a href="#/index/deviceManage">设备管理</a><span> > </span><span class="title_active">详情</span></h1>
    <div class="bottom_wrap">
      <!-- tab标签页 -->
      <div class="tab_wrap">
        <Tabs value="name1"  :animated="false">

            <!-- 基本信息 -->
            <TabPane label="基本信息" name="name1">
              <div class="clearfix">
                <div class="left_content">
                  <Form :label-width="120" style="width:60%;margin:0 auto;">
                    <FormItem label="设备类型">Andrio手机</FormItem>
                    <FormItem label="设备归属">企业</FormItem>
                    <FormItem label="资产编号">12345678</FormItem>
                    <FormItem label="设备名称">Q787</FormItem>
                    <FormItem label="设备序列号">12345</FormItem>
                    <FormItem label="操作系统">Andriod</FormItem>
                    <FormItem label="系统版本">7.0</FormItem>
                    <FormItem label="激活时间">2018-04-02  14:14</FormItem>
                    <FormItem label="最近上线">2018-04-02  14:14</FormItem>
                    <FormItem label="上次更新时间">2018-04-02  14:14</FormItem>
                    <FormItem label="设备厂商">ZXH</FormItem>
                    <FormItem label="型号">ZXH-Q787</FormItem>
                    <FormItem label="CPU">dsdhfbhb</FormItem>
                  </Form>
                </div>
                <div class="right_content">
                  <Form :label-width="120" style="width:60%;margin:0 auto;">
                    <FormItem label="RAM">2GB</FormItem>
                    <FormItem label="ROM总容量">20GB</FormItem>
                    <FormItem label="ROM可用容量">20GB</FormItem>
                    <FormItem label="相机">前置503万像素，后置1297万像素</FormItem>
                    <FormItem label="蓝牙MAC地址">1234</FormItem>
                    <FormItem label="WiFiMAC地址">435</FormItem>
                    <FormItem label="SD卡容量">2GB</FormItem>
                    <FormItem label="SD卡可用容量">2GB</FormItem>
                    <FormItem label="SD卡序列号">1234</FormItem>
                    <FormItem label="电源状态">100%</FormItem>
                    <FormItem label="是否Rooted/越狱">否</FormItem>
                    <FormItem label="IMEI">123435</FormItem>
                    <FormItem label="IMSI">12343qw5</FormItem>
                  </Form>
                </div>
              </div>
              
            </TabPane>

            <!-- 应用安装 -->
            <TabPane label="应用安装" name="name2">
                <Table border :columns="columns" :data="appInstallData" no-data-text="暂无数据"></Table>            
            </TabPane>

            <!-- 底部按钮 -->
            <div class="wrap btn_wrap">
                <Button type="primary" size="large" style="margin-right:20px" @click="$router.push({path:'/index/deviceManage'})">返回</Button>
            </div>
        </Tabs>
        
      </div>
      
    </div>
  </div>
</template>


<script>
export default {
  created(){
    document.title="设备管理-详情"
  },
  data(){
    return {
      columns:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "应用名称",
            key: 'appName',
        },
        {
            title: "安装时间",
            key: 'installTime',
        }
      ],
      appInstallData:[
        {
          appName: 'QQ',
          installTime: '2018-04-02'
        },
        {
          appName: '微信',
          installTime: '2018-04-03'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
  #deviceDetail {
    .tab_wrap{
      background:#fff;
      .left_content,.right_content{
        float: left;
        width:50%;
      }
    }

    .btn_wrap {
      padding:20px 300px;
      margin-top:20px;
    }
  }
</style>


