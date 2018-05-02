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
                    <FormItem label="设备类型">{{deviceData.type}}</FormItem>
                    <FormItem label="设备归属">{{deviceData.belongto}}</FormItem>
                    <FormItem label="资产编号">{{deviceData.assetNum}}</FormItem>
                    <FormItem label="设备名称">{{deviceData.name}}</FormItem>
                    <FormItem label="设备序列号">{{deviceData.serialNum}}</FormItem>
                    <FormItem label="操作系统">{{deviceData.actSys}}</FormItem>
                    <FormItem label="系统版本">{{deviceData.sysVersion}}</FormItem>
                    <FormItem label="激活时间">{{deviceData.activeDate}}</FormItem>
                    <FormItem label="最近上线">{{deviceData.lastDate}}</FormItem>
                    <FormItem label="上次更新时间">{{deviceData.updateDate}}</FormItem>
                    <FormItem label="设备厂商">{{deviceData.manufacturer}}</FormItem>
                    <FormItem label="型号">{{deviceData.model}}</FormItem>
                    <FormItem label="CPU">{{deviceData.cpu}}</FormItem>
                  </Form>
                </div>
                <div class="right_content">
                  <Form :label-width="120" style="width:60%;margin:0 auto;">
                    <FormItem label="RAM">{{deviceData.ram}}</FormItem>
                    <FormItem label="ROM总容量">{{deviceData.rom}}</FormItem>
                    <FormItem label="ROM可用容量">{{deviceData.availableRom}}</FormItem>
                    <FormItem label="相机">{{deviceData.camera}}</FormItem>
                    <FormItem label="蓝牙MAC地址">{{deviceData.bluetoothMac}}</FormItem>
                    <FormItem label="WiFiMAC地址">{{deviceData.wifi}}</FormItem>
                    <FormItem label="SD卡容量">{{deviceData.totalSd}}</FormItem>
                    <FormItem label="SD卡可用容量">{{deviceData.availableSd}}</FormItem>
                    <FormItem label="SD卡序列号">{{deviceData.serialnumberSd}}</FormItem>
                    <FormItem label="电源状态">{{deviceData.battState}}</FormItem>
                    <FormItem label="是否Rooted/越狱">{{deviceData.rooted}}</FormItem>
                    <FormItem label="IMEI">{{deviceData.imei}}</FormItem>
                    <FormItem label="IMSI">{{deviceData.imsi}}</FormItem>
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
      deviceData:{
        type:"",
        belongto:"",
        assetNum:"",
        name:"",
        serialNum:"",
        actSys:"",
        sysVersion:"",
        activeDate:"",
        lastDate:"",
        manufacturer:"",
        model:"",
        cpu:"",
        ram:"",
        rom:"",
        availableRom:"",
        camera:"",
        bluetoothMac:"",
        wifi:"",
        totalSd:"",
        availableSd:"",
        serialnumber:"",
        battState:"",
        rooted:"",
        imei:"",
        imsi:""
      },
      columns:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "应用名称",
            key: 'name',
        },
        {
            title: "安装时间",
            key: 'createDate',
        }
      ],
      appInstallData:[
        {
          name: 'QQ',
          createDate: '2018-04-02'
        },
        {
          name: '微信',
          createDate: '2018-04-03'
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


