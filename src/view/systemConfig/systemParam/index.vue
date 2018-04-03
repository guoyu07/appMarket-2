<template>
  <div id="systemParam">
    <!-- 查询条件 -->
    <div class="query_wrap clearfix">
      <Input v-model="key" size="large" placeholder="请输入枚举KEY" style="width:200px;float:left;"></Input>
      <Input v-model="value" size="large" placeholder="请输入枚举VALUE" style="width:200px;float:left;margin-left:10px"></Input>
      <Input v-model="desc" size="large" placeholder="请输入枚举DESC" style="width:200px;float:left;margin-left:10px"></Input>
      <Button type="success" size="large" style="float:left;margin-left:20px;">查询</Button>
      <Button type="primary" size="large" style="float:left;margin-left:10px;">添加</Button>
    </div>
    <!-- 表格 -->
    <div class="table_wrap">
      <Table border :columns="columns" :data="tableData"></Table>
      <Page :total="2" size="small" show-total></Page>
    </div>

     <!-- 编辑模态框 -->
    <Modal v-model="editModal" title="系统参数修改" :mask-closable='false' class="nofoot" >
        <div class="editForm">
          <Form :model="editForm" :label-width="80">
            <FormItem label="枚举KEY">
                <Input v-model="editForm.name" placeholder="枚举KEY"></Input>
            </FormItem>
            <FormItem label="枚举VALUE">
                <Input v-model="editForm.address" placeholder="枚举VALUE"></Input>
            </FormItem>
             <FormItem label="枚举DESC">
                <Input v-model="editForm.name" placeholder="枚举DESC"></Input>
            </FormItem>
            <FormItem label="排序">
                <Input v-model="editForm.address" placeholder="排序"></Input>
            </FormItem>
             <FormItem>
                <Button type="success" size='large'>立即提交</Button>
                <Button style="margin-left: 8px" size='large'>取消</Button>
            </FormItem> 
          </Form>
        </div>
    </Modal>

    <!-- 删除模态框 -->
    <Modal v-model="delModal" title='系统参数删除' :mask-closable='false'>
      <p style="font-size:16px">确定删除该系统参数？</p>
    </Modal>

  </div>
</template>

<script>
export default {
  data(){
    return {
      key:'',
      value:'',
      desc: '',
      columns:[
        {
            title: '枚举KEY',
            key: 'address'
        },
        {
            title: '枚举VALUE',
            key: 'address'
        },
        {
            title: '枚举DESC',
            key: 'address'
        },{
            title: '排序',
            key: 'address'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => {
                                this.edit(params.index)
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => {
                                this.del(params.index)
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ],
      tableData: [
        {
            name: '管理员',
            address: '管理员'
        },
        {
            name: '管理员',
            address: '管理员'
        },
      ],
      editModal: false,
      editForm: {
        name: '',
        address: ''
      },
      delModal: false,
      disModal: false,
      disForm: ''
    }
  },
  created(){
    document.title = '系统配置-系统参数'
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
  }
}
</script>

<style scoped lang='scss' type='text/css'>
  #systemParam {
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