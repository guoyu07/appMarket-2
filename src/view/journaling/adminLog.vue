<template>
  <div id="adminLog">
    <h1><span>当前位置 > </span>日志报表 > 日志 > 管理员日志</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="80">
          <FormItem label="操作类型" v-show='tabName=="name1"'>
            <Select v-model="searchData.optType"  style="width:200px">
                <Option value="-1">全部</Option>                
                <Option :value="item.optType" v-for='(item,index) in optData' :key='index'>{{item.optDesc}}</Option>
            </Select>
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
            <TabPane label="操作日志" name="name1">
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
    this.queryOptType()
    this.queryTable1()
    // this.queryTable2()
    
  },

  data(){
    return {
      optData:[],
      allOptData:{},
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
        optType:'-1',
        userType: '-1',
        fromDate:null,
        toDate:null,
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
             render:(h,params)=>{
              return h('div',params.row.userType=='1'?'平台用户':'手机用户')
            }
        },
        {
            title: "操作类型",
            key: 'optType',
            render:(h,params)=>{
              return h('div',this.allOptData[params.row.optType])
            }
        },
        {
            title: "操作者",
            key: 'userName',
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
            render:(h,params)=>{
              return h('div',this.allOptData[params.row.optType])
            }
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
    queryLog(){
      this.pageNo1 = 1
      this.queryTable1()
    },
    queryLoginLog(){
      this.pageNo2 = 1
      this.queryTable2()
    },
    // 查询操作类型
    queryOptType(){
      this.axios.get('/userPerm/getOptType').then(res=>{
        if(res&&res.success==1){
          const data = res.data
          this.optData = data
          data.forEach(item=>{
           this.allOptData[item.optType] = item.optDesc
          })
          console.log(this.allOptData )
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    // tab栏切换
    tabChange(name){
      // console.log(name)
      this.searchData.optType = '-1'
      this.searchData.userType = '-1'
      this.searchData.fromDate = null
      this.searchData.toDate = null
      this.tabName = name
      name=='name1'?this.queryLog():this.queryLoginLog()
    },

    changePage1(current){
      this.pageNo1 = current
      this.queryTable1()
    },
    changePage2(current){
      this.pageNo2 = current
      this.queryTable2()
    },
    // 查询非登录日志
    queryTable1(){
      this.loading1 = true
      this.axios.post('/userPerm/listoptLogs',{
        ...this.searchData,
        pageNo:this.pageNo1,
        logType:'1',
      }).then(res=>{
        this.loading1 = false
        if(res&&res.success=='1'&&res.data){
          const data = res.data
          this.actionData = data.list
          this.totalPage1 = data.total
          this.startRow1 = data.startRow
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },

    // 查询登录日志
    queryTable2(){
      this.loading2 = true
      this.axios.post('/userPerm/listoptLogs',{
        userType:this.searchData.userType,
        pageNo:this.pageNo2,
        pageSize:10,
        logType:'2',
        isadmin:'1'
      }).then(res=>{
        this.loading2 = false
        if(res&&res.success=='1'&&res.data){
          const data = res.data
          this.loginData = data.list
          this.totalPage2 = data.total
          this.startRow2 = data.startRow
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }

  },

// watch------------------------------------------------------------------------------------------------
  watch:{
    'time':function(){
      // console.log(this.time)
      this.searchData.fromDate = this.time[0]!=''?new Date(this.time[0]).format("yyyy-MM-dd"):null
      this.searchData.toDate = this.time[1]!=""?new Date(this.time[1]).format("yyyy-MM-dd"):null
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #adminLog{
    padding-bottom:20px;
    .search_wrap {
        background:#fff;
        padding:20px 20px 0 0;
    }
    .tab_wrap{
      background:#fff;
      
    }
  }
</style>