<template>
  <div id="formDetail">
     <h1><span>当前位置 > </span><span>日志报表 > </span><a href="#/index/reportForm">报表</a><span> > </span><span class="title_active">{{formName}}</span></h1>

     <div class="bottom_wrap">
      <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> {{formName}}
                </div>
                <div class="btns_wrap">
                    <Button type="primary"><Icon type="ios-download-outline" style="font-size:14px"></Icon> 导出</Button>
                </div>
           </div>
           <Table border :columns="columns" :data="formData" no-data-text="暂无数据"></Table>            
           <Page :total="2" show-total class="appPage page_wrap"></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.formName = this.$route.query.type==1?"设备报表":(this.$route.query.type==2?'客户端统计报表':'数据流量报表')
    this.columns = this.$route.query.type==1?this.columns1:(this.$route.query.type==2?this.columns2:this.columns3)
    document.title = "日志报表-报表-详情"
  },

  data(){
    return {
      formName:'',
      columns:[],
      columns1:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "设备名称",
            key: 'name',
        },
        {
            title: "设备归属",
            key: 'belongto',
        },
        {
            title: "用户名",
            key: 'userName',
        },
        {
            title: "手机号",
            key: 'phone',
        },
        {
            title: "设备型号",
            key: 'model',
        },
        {
            title: "平台",
            key: 'platName',
        },
        {
            title: "系统版本",
            key: 'sysVersion',
        },
        {
            title: "序列号",
            key: 'serialNum',
        },
        {
            title: "IMEI",
            key: 'imei',
        },
        {
            title: "是否Rooted/越狱",
            key: 'rooted',
        },
        {
            title: "设备状态",
            key: 'state',
        },
        {
            title: "激活时间",
            key: 'activeDate',
        },
        {
            title: "更新时间",
            key: 'updateDate',
        },
      ],
      columns2:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "设备名称",
            key: 'name',
        },
        {
            title: "用户名",
            key: 'userName',
        },
        {
            title: "手机号",
            key: 'phone',
        },
        {
            title: "平台",
            key: 'platName',
        },
        {
            title: "当前版本",
            key: 'sysVersion',
        },
        {
            title: "激活时间",
            key: 'activeDate',
        }
      ],
      columns3:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "用户名",
            key: 'userName',
        },
        {
            title: "手机号",
            key: 'phone',
        },
        {
            title: "设备名称",
            key: 'name',
        },
        {
            title: "设备归属",
            key: 'belongto',
        },
        {
            title: "月份",
            key: 'month',
        },
        {
            title: "上网方式",
            key: 'netType',
        },
        {
            title: "数据流量",
            key: 'count',
        },
      ],
      formData:[]
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #formDetail {
    .table_wrap{
             background:#fff;
             padding:0 0 20px 0;
            .actions{
                padding:20px;
                .btns_wrap{
                    float:right;
                }
            }
            .applists{
                float: left;
                margin-top:5px;
            }
        }
  }
</style>