<template>
  <div id="userLog">
    <h1><span>当前位置 > </span>日志报表 > 日志 > 用户日志</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="80">
          <FormItem label="操作类型" v-show='tabName=="name1"'>
            <Input v-model="searchData.actionType"  placeholder="请输入操作类型"></Input>
          </FormItem>
          <FormItem label="用户类型">
            <Select v-model="searchData.userType"  style="width:100px">
                <Option value="0">全部</Option>
                <Option value="1">平台用户</Option>
                <Option value="2">手机用户</Option>
            </Select>
          </FormItem>
          <FormItem label="时间" v-show='tabName=="name1"'>
              <DatePicker type="date" placeholder="请选择时间" style="width: 220px" v-model="searchData.time"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary">筛选</Button>
          </FormItem>
        </Form>
      </div>

       <!-- tab标签页 -->
      <div class="tab_wrap">
        <Tabs value="name1"  :animated="false" @on-click="tabChange">

            <!-- 设备日志 -->
            <TabPane label="设备日志" name="name1">
                <Table border :columns="columns1" :data="actionData" no-data-text="暂无数据"></Table>                          
            </TabPane>

            <!-- 登录日志 -->
            <TabPane label="登录日志" name="name2">
                <Table border :columns="columns2" :data="loginData" no-data-text="暂无数据"></Table>            
            </TabPane>

        </Tabs>
        
      </div>
    </div>

  </div>
</template>

<script>
export default {
  created(){
    document.title = "日志报表-日志-用户日志"
  },

  data(){
    return {
      searchData:{
        actionType:'',
        userType: '0',
        time: ''
      },
      columns1:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "用户类型",
            key: 'appName',
        },
        {
            title: "操作类型",
            key: 'installTime',
        },
        {
            title: "操作者",
            key: 'installTime',
        },
        {
            title: "影响对象",
            key: 'installTime',
        },
        {
            title: "具体操作",
            key: 'installTime',
        },
        {
            title: "操作时间",
            key: 'installTime',
        },
      ],
      columns2:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "用户类型",
            key: 'appName',
        },
        {
            title: "操作类型",
            key: 'installTime',
        },
        {
            title: "操作者",
            key: 'installTime',
        },
        {
            title: "IP地址",
            key: 'installTime',
        },
        {
            title: "操作时间",
            key: 'installTime',
        },
      ],
      actionData:[],
      loginData:[],
      tabName:'name1'
    }
  },

  methods: {
    tabChange(name){
      console.log(name)
      this.tabName = name
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #userLog{
    .search_wrap {
        background:#fff;
        padding:20px 20px 0 0;
    }
    .tab_wrap{
      background:#fff;
      
    }
  }
</style>