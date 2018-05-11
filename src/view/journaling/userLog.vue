<template>
  <div id="adminLog">
    <h1><span>当前位置 > </span>日志报表 > 日志 > 管理员日志</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="80">
          <FormItem label="操作类型" v-show='tabName=="name1"'>
            <Input v-model="searchData.optType"  placeholder="请输入操作类型"></Input>
          </FormItem>
          <FormItem label="用户类型">
            <Select v-model="searchData.userType"  style="width:100px">
                <Option value="-1">全部</Option>
                <Option value="1">平台用户</Option>
                <Option value="2">手机用户</Option>
            </Select>
          </FormItem>
          <FormItem label="时间" v-show='tabName=="name1"'>
              <DatePicker  type="daterange" format="yyyy/MM/dd" placeholder="请选择时间" style="width: 220px" v-model="time"></DatePicker>
          </FormItem>
          <FormItem v-if='tabName=="name1"'>
            <Button type="primary"  @click='queryLog'>筛选</Button>
          </FormItem>
          <FormItem v-else>
            <Button type="primary"  @click='queryLoginLog'>筛选</Button>
          </FormItem>
        </Form>
      </div>

       <!-- tab标签页 -->
      <div class="tab_wrap">
        <Tabs value="name1"  :animated="false" @on-click="tabChange">

            <!-- 操作日志 -->
            <TabPane label="设备日志" name="name1">
                <Table border :columns="columns1" :loading='loading1' :data="actionData" no-data-text="暂无数据"></Table>
                <Page :total="totalPage1" :current='pageNo1' @on-change='changePage1' show-total class="page_wrap"></Page>                          
            </TabPane>

            <!-- 登录日志 -->
            <TabPane label="登录日志" name="name2">
                <Table border :columns="columns2" :loading='loading2' :data="loginData" no-data-text="暂无数据"></Table>
                <Page :total="totalPage2" :current='pageNo2' @on-change='changePage2' show-total class="page_wrap"></Page>                                                     
            </TabPane>

        </Tabs>
        
      </div>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import {format} from '../../util/util.js'
export default {
  created(){
    document.title = "日志报表-日志-管理员日志"
    this.queryLoginLog()
    this.queryLog()
  },

  data(){
    return {
      type:'1',
      time:null,
      loading1:false,
      loading2:false,
      pageNo1:1,
      pageNo2:1,
      totalPage1:1,
      totalPage2:1,
      startRow1:1,
      startRow2:1,
      searchData:{
        optType:'',
        userType: '-1',
        fromDate: "",
        toDate:"",
        pageSize:10
      },
      columns1:[
        {
            // type: 'index',
            align: 'center',
            title: "序号",
            render:(h,params)=>{
              return h('div',params.index + this.startRow1)
            }
        },
        {
            title: "用户类型",
            key: 'userType',
        },
        {
            title: "操作类型",
            key: 'optType',
        },
        {
            title: "操作者",
            key: 'userId',
        },
        {
            title: "影响对象",
            key: 'affectedObj',
        },
        {
            title: "具体操作",
            key: 'optDesc',
        },
        {
            title: "操作时间",
            key: 'optDate',
        },
      ],
      columns2:[
        {
            // type: 'index',
            align: 'center',
            title: "序号",
             render:(h,params)=>{
              return h('div',params.index + this.startRow2)
            }
        },
        {
            title: "用户类型",
            key: 'userType',
        },
        {
            title: "操作类型",
            key: 'optType',
        },
        {
            title: "操作者",
            key: 'userId',
        },
        {
            title: "IP地址",
            key: 'operatorIp',
        },
        {
            title: "操作时间",
            key: 'optDate',
        },
      ],
      actionData:[],
      loginData:[],
      tabName:'name1'
    }
  },

  methods: {
    // tab栏切换
    tabChange(name){
      console.log(name)
      this.tabName = name
    },

    changePage1(current){
      this.pageNo1 = current
      this.queryLog()
    },
    changePage2(current){
      this.pageNo2 = current
      this.queryLoginLog()
    },
    // 查询非登录日志
    queryLog(){
      this.loading1 = true
      this.axios.post('/userPerm/listoptLogs',{
        ...this.searchData,
        pageNo:this.pageNo1,
        logType:'2'
      }).then(res=>{
        if(res&&res.success=='1'&&res.data){
          this.loading1 = false
          const data = res.data
          this.actionData = data.list
          this.totalPage1 = data.totalPage1
          this.startRow1 = data.startRow
        }
      })
    },

    // 查询登录日志
    queryLoginLog(){
      this.loading2 = true
      this.axios.post('/userPerm/listoptLogs',{
        userType:this.searchData.userType,
        pageNo:this.pageNo2,
        logType:'1'
      }).then(res=>{
        if(res&&res.success=='1'&&res.data){
          this.loading2 = false
          const data = res.data
          this.loginData = data.data
          this.totalPage2 = data.totalPage2
          this.startRow2 = data.startRow
        }
      })
    }

  },

  watch:{
    'time':function(){
      console.log(this.time)
      this.searchData.fromDate = this.time[0]!=''?new Date(this.time[0]).format("yyyy-MM-dd"):''
      this.searchData.toDate = this.time[1]!=""?new Date(this.time[1]).format("yyyy-MM-dd"):''
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #adminLog{
    .search_wrap {
        background:#fff;
        padding:20px 20px 0 0;
    }
    .tab_wrap{
      background:#fff;
      
    }
  }
</style>