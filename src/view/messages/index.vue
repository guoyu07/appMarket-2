<template>
  <div id="message">
    <h1><span>当前位置 >> </span> 消息</h1>

      <!-- 条件选择部分 -->
      <div style="padding:20px 20px 0 20px">
        <div class="search_wrap">
          <Form inline :model="searchData"  :label-width="55">
            <FormItem label="类型">
              <Select v-model="searchData.type"  style="width:100px">
                  <Option value="0">全部</Option>
                  <Option value="1">通知</Option>
                  <Option value="2">消息</Option>
              </Select>
            </FormItem>
            <FormItem label="时间">
               <DatePicker type="date" placeholder="请选择时间" style="width: 220px" v-model="searchData.time"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary">筛选</Button>
            </FormItem>
          </Form>
        </div>

        <!-- 表格 -->
      <div class="table_wrap">
          <div class="messagelists">
              <Icon type="navicon-round"></Icon> 消息列表
          </div>
          <Table border :columns="columns" :data="messageData" no-data-text="暂无数据"></Table>            
          <Page :total="2" show-total class="page_wrap"></Page>
      </div>
      </div>

      
      
  </div>
</template>

<script>
export default {
  created(){

  },
  data(){
    return {
      searchData: {
        type: '0',
        time:''
      },
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
            key: 'type',
        },
        {
            title: '消息内容',
            key: 'content'
        },
        {
            title: '消息时间',
            key: 'time'
        },
      ],
      messageData: [
        {
          status:1,
          type:"通知",
          content: "您的账号信息已修改成功",
          time:"2018-04-27"
        }
      ]
    }
  },

  methods:{

  }

}
</script>

<style lang='scss' scoped  type="text/css">
  #message{
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


