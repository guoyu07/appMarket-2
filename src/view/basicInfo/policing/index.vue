<template>
  <div id="policing">
    <!-- 查询条件 -->
    <div class="query_wrap clearfix">
      <Input v-model="query" size="large" placeholder="请输入设备编号" style="width:200px;float:left;"></Input>
      <Input v-model="query" size="large" placeholder="请输入设备名称" style="width:200px;float:left;margin-left:10px;"></Input>
      <Input v-model="query" size="large" placeholder="请输入警务通号码" style="width:200px;float:left;margin-left:10px;"></Input>
      <Input v-model="query" size="large" placeholder="请输入IMEI" style="width:200px;float:left;margin-left:10px;"></Input>
      <Button type="success" size="large" style="float:left;margin-left:20px;margin-left:20px;">查询</Button>
    </div>
    <!-- 表格 -->
    <div class="table_wrap">
      <Table border :columns="columns" :data="tableData"></Table>
      <Page :total="2" size="small" show-total></Page>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      query:'',
      columns:[
        {
            title: '设备编号',
            key: 'name',
        },
        {
            title: '设备名称',
            key: 'address'
        },
        {
            title: '设备型号',
            key: 'address'
        },
        {
            title: '警务通号码',
            key: 'address'
        },
        {
            title: 'IMEI',
            key: 'address'
        },
        {
            title: '是否启用',
            key: 'address'
        },
        {
            title: '设备状态',
            key: 'address'
        },
      ],
      tableData: [
        {
            name: '管理员',
            address: '1'
        },
        {
            name: '管理员',
            address: '2'
        },
        {
            name: '管理员1',
            address: '2'
        },
        {
            name: '管理员',
            address: '2'
        },
        {
            name: '管理员1',
            address: '1'
        },
        {
            name: '管理员1',
            address: '2'
        },
      ],
      editModal: false,
      editForm: {
        name: '',
        address: ''
      },
      delModal: false,
      disModal: false,
      disForm: {}
    }
  },
  created(){
    document.title = '基础信息-警务通'      
  },
  mounted(){
    
  },
  methods: {
    // 点击编辑
    edit() {
      this.editModal = true;
    },
    // 点击删除
    del() {
      this.delModal = true;
    },
    // 点击分配菜单
    distribute() {
      this.disModal = true;
    },

  }
}
</script>

<style scoped lang='scss' type='text/css'>
  #policing {
      border: 1px solid #ccc;
      height:100%;
      
    .query_wrap {
        padding: 15px;
        background:#eee;
      }
    .table_wrap {
        padding: 15px;
      }
    
  }
</style>

