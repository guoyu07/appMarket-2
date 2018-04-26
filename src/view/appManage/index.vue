<template>
  <div id="appManage">
    <h1><span>当前位置 > </span>应用管理</h1>
    <div class="bottom_wrap">
      <div class="search_wrap">
        <Form inline :model="searchData">
          <FormItem>
            <Input v-model="searchData.appName" size="large" placeholder="请输入应用名"></Input>
          </FormItem>
          <FormItem>
            <Select v-model="searchData.type" size="large" style="width:100px">
                <Option value="0">全部</Option>
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large">确定</Button>
          </FormItem>
        </Form>
        <Button type="primary" style="margin-right:15px" @click="$router.push({path:'/index/addApp'})">添加应用</Button>
        <Button type="primary" style="margin-right:15px">启用</Button>
        <Button type="primary" style="margin-right:15px">禁用</Button>
        <Button type="primary" style="margin-right:15px">黑名单</Button>
        <Button type="primary" >白名单</Button>
      </div>
      <Table border :columns="columns" :data="appData"></Table>
    </div>
    
  </div>
  
</template>


<script>
export default {
  created(){
    document.title = "应用管理"
  },

  data(){
    return{
      searchData: {
        appName: "",
        type: "0"
      },
      columns: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            type: 'index',
            width: 70,
            align: 'center',
            title: "序号"
        },
        {
            title: "类型",
            key: 'type',
        },
        {
            title: '应用名',
            key: 'appName'
        },
        {
            title: '版本号',
            key: 'num'
        },
        {
            title: '应用标签',
            key: 'appTip'
        },
        {
            title: '下载次数',
            key: 'downNum',
        },
        {
            title: '更新时间',
            key: 'updateTime'
        },
        {
            title: '状态',
            key: 'status',
            width:70
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 220,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            marginRight: '10px',
                            cursor:"pointer"
                        },
                        on: {
                            click: () => {
                                // this.show(params.index)
                                
                            }
                        }
                    }, '版本升级'),
                    h('span', {
                        style: {
                            marginRight: '10px',
                            cursor:"pointer"
                        },
                        on: {
                            click: () => {
                                // this.remove(params.index)
                            }
                        }
                    }, '详情'),
                     h('span', {
                        style: {
                            marginRight: '10px',
                            cursor:"pointer"
                        },
                        on: {
                            click: () => {
                                this.$router.push({path:"/index/dispatchRight"})
                            }
                        }
                    }, '编辑'),
                    h('span', {
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => {
                                this.$router.push({path:"/index/dispatchRight"})
                            }
                        }
                    }, '下发')
                ]);
            }
        }
      ],
      appData: [
        {
          type:"白名单",
          appName: "微信",
          num: "v3.0",
          appTip: '工作',
          downNum: '11',
          updateTime: '2018-04-03 14:14:14',
          status: "启用"

        }
      ]
      
    }
  },

}
</script>

<style lang='scss' scoped  type="text/css">

</style>
