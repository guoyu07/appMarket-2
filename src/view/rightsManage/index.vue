<template>
  <div id="rightsManage">
    <h1><span>当前位置 > </span>权限管理</h1>
    <div class="bottom_wrap">
         <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 角色列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary"  @click="addRole"><Icon type="plus"></Icon> 添加角色</Button>
                </div>
           </div>
           
           <div style="position:relative">
                <Table border :columns="columns" :loading="loading" :data="roleData" no-data-text="暂无数据"></Table>            
                <Page :total="2" show-total class="page_wrap"></Page>
                <!-- <Spin fix v-if='loading'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>loading...</div>
                </Spin> -->
           </div>
      </div>
    </div>


    <!-- 添加角色模态框 -->
    <Modal
        title="添加角色"
        v-model="addModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
       <Form ref="formValidate" :rules="ruleValidate" :model="addRoleData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="角色名称" prop="mask">
            <Input v-model="addRoleData.mask"  placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色描述" prop="description">
            <Input v-model="addRoleData.description"  placeholder="请输入角色描述"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="addModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmAdd">确定</Button>
        </div>
    </Modal>


    <!-- 编辑模态框 -->
    <Modal
        title="编辑角色"
        v-model="editModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <Form ref="formValidate1" :rules="ruleValidate"  :model="editRoleData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="角色名称" prop="mask">
            <Input v-model="editRoleData.mask"  placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色描述" prop="description">
            <Input v-model="editRoleData.description"  placeholder="请输入角色描述"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="editModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmEdit">确定</Button>
        </div>
    </Modal>
    <!-- 删除模态框 -->
    <Modal
        title="删除角色"
        v-model="deleteModal"
        :mask-closable="false"
        @on-ok="confirmDelete"
        class-name="vertical-center-modal">
        <p class="modalp">确定删除该角色吗？</p>
    </Modal>
  </div>
</template>

<script>
export default {
// created------------------------------------------------------------------------------
  created(){
    document.title = "权限管理"
    this.queryTable()
  },

// data---------------------------------------------------------------------------------
  data(){
    return {
      loading:false,
      ruleValidate:{
        mask:[
          { required: true,  message:'请输入角色名称', trigger: 'blur' },
        ],
        description:[
          { required: true, message:'请输入角色描述' , trigger: 'blur' },
        ],
      },
      columns: [
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: '角色名称',
            key: 'mask'
        },
        {
            title: '角色描述',
            key: 'description'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                this.editModal = true
                                
                            }
                        }
                    }, '编辑'),
                    h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                this.deleteModal = true
                            }
                        }
                    }, '删除'),
                     h('a', {
                        style: {
                            marginRight: '10px',
                            color:'#63c185'
                        },
                        on: {
                            click: () => {
                                this.$router.push({path:'/index/dispatchRight'})
                            }
                        }
                    }, '分配权限')
                ]);
            }
        }
      ],
      roleData: [],
      deleteModal:false,
      editModal:false,
      addModal: false,
      addRoleData: {
          mask:'',
          description:''
      },
      editRoleData: {
          mask:'管理员',
          description:'管理员管理员管理员'
      }

    }
  },

// methods------------------------------------------------------------------------------
  methods: {
    // 查询表格
    queryTable(){
      this.loading = true
      this.axios.get("/userPerm/qryRoleList").then(res=>{
        if(res&&res.success==1){
          this.roleData = res.data
          this.loading = false
        }
      })
    },

      // 点击添加角色按钮
      addRole(){
        this.$refs['formValidate'].resetFields() 
        this.addModal=true
      },

      // 确认添加
      confirmAdd(){
        this.$refs['formValidate'].validate((valid) => {
            if(valid) {
            console.log(11111)
            }
        })
      },

      // 确认编辑
      confirmEdit(){
          this.$refs['formValidate1'].validate((valid) => {
            if(valid) {
            console.log(11111)
            }
        })
      },

      // 确认删除
      confirmDelete(){

      }
  }

}
</script>

<style lang="scss" scoped type="text/css">
  #rightsManage {
    .table_wrap{
            background:#fff;
            padding:0 0 20px 0;
        .actions{
            padding:20px;
            .btns_wrap{
                float:right;
            }
        }
        .applists{
            float: left;
            margin-top:5px;
        }
    }
  }
</style>