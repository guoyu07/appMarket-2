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
                    <Button type="primary" v-has='btnId' @click="exportExcel"><Icon type="ios-download-outline" style="font-size:14px"></Icon> 导出</Button>
                </div>
           </div>
           <Table border :columns="columns" :loading='loading' :data="formData" no-data-text="暂无数据"></Table>            
           <Page :total="totalPage" :current='pageNo' @on-change='changePage' show-total class="appPage page_wrap"></Page>
      </div>
    </div>
    
  </div>
</template>

<script>
import env from '../../js/env.js'
export default {
  created(){
    this.reportType= this.$route.query.type
    this.formName = this.reportType==1?"设备报表":(this.reportType==2?'客户端统计报表':'数据流量报表')
    this.columns = this.reportType==1?this.columns1:(this.reportType==2?this.columns2:this.columns3)
    this.btnId = this.reportType==1?'record_report_device_export':(this.reportType==2?'record_report_client_export':'record_report_flow_export')
    document.title = "日志报表-报表-详情"
    this.queryTable()
  },

  data(){
    return {
      btnId:"",
      loading:false,
      totalPage:1,
      pageNo:1,
      formName:'',
      startRow:1,
      columns:[],
      columns1:[
        {
            // type: 'index',
            align: 'center',
            title: "序号",
             render:(h,params)=>{
              return h('div',params.index + this.startRow)
            }
        },
        {
            title: "设备名称",
            key: 'name',
        },
        {
            title: "设备归属",
            key: 'belongto',
            render:(h,params)=>{
              return h('div',this.allBelongTo[params.row.belongto])
            }
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
            key: 'plateName',
            render:(h,params)=>{
              return h('div',params.row.plateName=='01'?'Andriod':'其他')
            }
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
            render:(h,params)=>{
              return h('div',this.isRooted[params.row.rooted])
            }
        },
        {
            title: "设备状态",
            key: 'state',
            render:(h,params)=>{
              return h('div',params.row.state=='0'?'异常':'正常')
            }
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
            // type: 'index',
            align: 'center',
            title: "序号",
             render:(h,params)=>{
              return h('div',params.index + this.startRow)
            }
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
            key: 'plateName',
            render:(h,params)=>{
              return h('div',params.row.plateName=='01'?'Andriod':'其他')
            }
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
            // type: 'index',
            align: 'center',
            title: "序号",
             render:(h,params)=>{
              return h('div',params.index + this.startRow)
            }
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
            render:(h,params)=>{
              return h('div',this.allBelongTo[params.row.belongto])
            }
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
      formData:[],
      allBelongTo:{
        '01':'企业',
        '02':'个人'
      },
      isRooted:{
        '0':'否',
        '1':'是'
      }
    }
  },

// methods------------------------------------------------------------------------------------------------
    methods:{
        // 查询表格
        queryTable(){
            this.loading=true
            this.axios.post('/device/listReportData',{
                reportType:this.reportType,
                pageNo:this.pageNo,
                pageSize:10
            }).then(res=>{
                this.loading = false
                if(res && res.success=='1' && res.data){
                    const data = res.data
                    this.formData = data.list
                    this.totalPage = data.total
                    this.startRow = data.startRow
                }
            })
        },

        // 改变页码
        changePage(current){
            this.pageNo = current
            this.queryTable()
        },

        // 导出报表
        exportExcel(){

            window.location.href = env.apiPath + '/document/exportExcel?reportType=' + this.reportType
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