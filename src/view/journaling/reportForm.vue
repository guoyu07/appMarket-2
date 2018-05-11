<template>
  <div>
    <h1><span>当前位置 > </span>日志报表 > 报表</h1>
     <div class="bottom_wrap">
       <Table border :columns="columns" :loading='loading' :data="formData" no-data-text="暂无数据"></Table>
       <Page :total="totalPage" :current='pageNo' show-total class="page_wrap"></Page>
    </div>
  </div>
</template>

<script>
export default {
// created------------------------------------------------------------------
  created(){
    document.title = "日志报表-报表"
  },

// data----------------------------------------------------------------------
  data(){
    return {
      totalPage:3,
      pageNo:1,
      loading:false,
      columns:[
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: "报表名称",
            key: 'formName',
        },
        {
            title: "类型",
            key: 'type',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 220,
            render: (h, params) => {
                return h('div', [
                    h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
  
                                this.$router.push({path:"/index/formDetail",query:{type:params.row.reportType}})
                            }
                        }
                    }, '详情')
                ]);
            }
        }
      ],
      formData:[
        {
          reportType:'1',
          formName:"设备报表",
          type:"设备"
        },
        {
          reportType:'2',
          formName:"客户端统计报表",
          type:"设备"
        },
        {
          reportType:'3',
          formName:"数据流量报表",
          type:"设备"
        },
      ]
    }
  },

// methods-------------------------------------------------------------------
  methods:{
    
  }
}
</script>

<style lang="scss" scoped type="text/css">

</style>