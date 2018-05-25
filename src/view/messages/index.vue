<template>
  <div id="message">
    <h1><span>当前位置 >> </span> 消息</h1>

      <!-- 条件选择部分 -->
      <div style="padding:20px 20px 0 20px">
        <div class="search_wrap">
          <Form inline :model="searchData"  :label-width="55">
            <FormItem label="类型">
              <Select v-model="searchData.type"  style="width:100px">
                  <Option value="-1">全部</Option>
                  <Option value="2">通知</Option>
                  <Option value="1">消息</Option>
              </Select>
            </FormItem>
            <FormItem label="时间">
               <DatePicker type="daterange" placeholder="请选择时间" style="width: 220px" v-model="time"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click='query'>筛选</Button>
            </FormItem>
          </Form>
        </div>

        <!-- 表格 -->
      <div class="table_wrap">
          <div class="messagelists">
              <Icon type="navicon-round"></Icon> 消息列表
          </div>
          <Table border :columns="columns" :loading='loading' :data="messageData" no-data-text="暂无数据"></Table>            
          <Page :total="totalPage" @on-change='changePage' :current='searchData.pageNo' show-total class="page_wrap"></Page>
      </div>
      </div>

      
      
  </div>
</template>

<script>
import {format} from '../../util/util.js'
import {mapActions} from 'vuex'
export default {
// created-----------------------------------------------------------------------------------
  created(){
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
    this.searchData.userId = userInfo['userId']

    this.queryTable()
  },

// data-------------------------------------------------------------------------------------------
  data(){
    return {
      time:null,
      loading:false,
      allType:{
        '1':'消息',
        '2':'通知'
      },
      searchData: {
        type: '-1',
        pageNo:1,
        pageSize:10,
        fromDate:"",
        toDate:"",
        userId:'',
      },
      totalPage:1,
      startRow:1,
      columns:[
        {
            key:"status",
            title: "状态",
            render: (h, params) => {
              return h('div', [
                      h('Icon', {
                          props: {
                              type: "ios-filing-outline"
                          },
                          style: {
                            fontSize:'24px'
                          }
                      })
                  ]);
          }
        },
        {
            title: "类型",
            render:(h,params)=>{
              return h('div',this.allType[params.row.type])
            }
        },
        {
            title: '消息内容',
            key: 'content'
        },
        {
            title: '消息时间',
            key: 'createDate'
        },
      ],
      messageData: []
    }
  },

// methods------------------------------------------------------------------------------------
  methods:{
    ...mapActions(['setCount']),
    query(){
      this.searchData.pageNo = 1
      this.queryTable()
    } ,   
    // 查询表格
    queryTable(){
      this.loading = true
      this.axios.post('/notification/listByPage',this.searchData)
      .then(res=>{
        this.loading = false
        if(res && res.success=='1' && res.data){
          const data = res.data
          this.messageData  = data.list
          this.totalPage = data.total
          this.startRow = data.startRow
          this.setCount(0)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },

    // 页码改变
    changePage(current){
      this.searchData.pageNo  = current
      this.queryTable()
    }
  },

// watch--------------------------------------------------------------------------------------------------
   watch:{
    'time':function(){
      // console.log(this.time)
      this.searchData.fromDate = this.time[0]!=''?new Date(this.time[0]).format("yyyy-MM-dd"):null
      this.searchData.toDate = this.time[1]!=""?new Date(this.time[1]).format("yyyy-MM-dd"):null
    }
  }

}
</script>

<style lang='scss' scoped  type="text/css">
  #message{
    padding-bottom:50px;
    .search_wrap {
       background:#fff;
       padding:20px 20px 0 0;
    }
    .table_wrap{
      background:#fff;
      padding:0 0 20px 0;
      .messagelists{
        padding:20px;
        
      }
    }
    
  }
  
</style>


