<template>
  <div>
    <h1><span>当前位置 > </span>日志报表 > 报表</h1>
     <div class="bottom_wrap">
       <Table border :columns="columns" :data="formData" no-data-text="暂无数据"></Table>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    document.title = "日志报表-报表"
  },

  data(){
    return {
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
                                if(params.row.formName=='设备报表'){
                                  this.$router.push({path:"/index/formDetail",query:{type:1}})
                                }else if(params.row.formName=='客户端统计报表'){
                                  this.$router.push({path:"/index/formDetail",query:{type:2}})                                  
                                }else{
                                  this.$router.push({path:"/index/formDetail",query:{type:3}})                                  
                                }
                                
                                
                            }
                        }
                    }, '详情')
                ]);
            }
        }
      ],
      formData:[
        {
          formName:"设备报表",
          type:"设备"
        },
        {
          formName:"客户端统计报表",
          type:"设备"
        },
        {
          formName:"数据流量报表",
          type:"设备"
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">

</style>