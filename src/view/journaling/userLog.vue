<template>
  <div id="userLog">
    <h1><span>当前位置 > </span>日志报表 > 日志 > 用户日志</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="80">
          <!-- <FormItem label="操作类型">
            <Input v-model="searchData.optType"  placeholder="请输入操作类型"></Input>
          </FormItem> -->
          <FormItem label="用户类型">
            <Select v-model="searchData.userType"  style="width:100px">
                <Option value="-1">全部</Option>
                <Option value="1">平台用户</Option>
                <Option value="2">手机用户</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="时间">
              <DatePicker  type="daterange" format="yyyy/MM/dd" placeholder="请选择时间" style="width: 220px" v-model="time"></DatePicker>
          </FormItem> -->
          <FormItem>
            <Button type="primary"  @click='queryLoginLog'>筛选</Button>
          </FormItem>
        </Form>
      </div>
      <div class="tab_wrap">
        <h1>登录日志</h1>
        <Table border :columns="columns" :loading='loading' :data="loginData" no-data-text="暂无数据"></Table>
        <Page :total="totalPage" :current='pageNo' @on-change='changePage' show-total class="page_wrap"></Page>                                                     
      </div>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import {format} from '../../util/util.js'
export default {
  created(){
    document.title = "日志报表-日志-用户日志"
    this.queryTable()
  },

  data(){
    return {
      type:'1',
      time:null,
      loading:false,
      pageNo:1,
      totalPage:1,
      startRow:1,
      searchData:{
        optType:'',
        userType: '-1',
        fromDate: "",
        toDate:"",
        pageSize:10
      },
      allOptType:{
        '19':'登陆成功'
      },
      columns:[
        {
            // type: 'index',
            align: 'center',
            title: "序号",
             render:(h,params)=>{
              return h('div',params.index + this.startRow)
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
            render:(h,params)=>{
              return h('div',this.allOptType[params.row.optType])
            }
        },
        {
            title: "操作者",
            key: 'userName',
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
    }
  },

  methods: {
    changePage(current){
      this.pageNo = current
      this.queryTable()
    },
    queryLoginLog(){
      this.pageNo = 1
      this.queryTable()
    },
    // 查询登录日志
    queryTable(){
      this.loading = true
      this.axios.post('/userPerm/listoptLogs',{
        userType:this.searchData.userType,
        pageNo:this.pageNo,
        pageSize:10,
        logType:'2',
        isadmin:'0'
      }).then(res=>{
        this.loading = false
        if(res&&res.success=='1'&&res.data){
          const data = res.data
          this.loginData = data.list
          this.totalPage = data.total
          this.startRow = data.startRow
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }

  },

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
  #userLog{
    padding-bottom:50px;
    .search_wrap {
        background:#fff;
        padding:20px 20px 0 0;
    }
    .tab_wrap{
      background:#fff;
      
    }
  }
</style>