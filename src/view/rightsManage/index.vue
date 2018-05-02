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
                    <Button type="primary"  @click="addModal=true"><Icon type="plus"></Icon> 添加角色</Button>
                </div>
           </div>
           <Table border :columns="columns" :data="roleData" no-data-text="暂无数据"></Table>            
           <Page :total="2" show-total class="page_wrap"></Page>
      </div>
    </div>


    <!-- 添加角色模态框 -->
    <Modal
        title="添加角色"
        v-model="addModal"
        @on-ok="confirmAdd"
        class-name="vertical-center-modal">
       <Form :model="addRoleData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="角色名称">
            <Input v-model="addRoleData.mask"  placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色描述">
            <Input v-model="addRoleData.description"  placeholder="请输入角色描述"></Input>
          </FormItem>
        </Form>
    </Modal>


    <!-- 编辑模态框 -->
    <Modal
        title="编辑角色"
        v-model="editModal"
        @on-ok="confirmEdit"
        class-name="vertical-center-modal">
        <Form :model="editRoleData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="角色名称">
            <Input v-model="editRoleData.mask"  placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="角色描述">
            <Input v-model="editRoleData.description"  placeholder="请输入角色描述"></Input>
          </FormItem>
        </Form>
    </Modal>
    <!-- 删除模态框 -->
    <Modal
        title="删除角色"
        v-model="deleteModal"
        @on-ok="confirmDelete"
        class-name="vertical-center-modal">
        <p class="modalp">确定删除该角色吗？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  created(){
    document.title = "权限管理"
  },
  data(){
    return {
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
      roleData: [
        {
            mask: '管理员',
            description: "管理员",
        },
        {
            mask: '普通成员',
            description: "普通成员",
        },
        
      ],
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

  methods: {
      // 确认添加
      confirmAdd(){

      },

      // 确认编辑
      confirmEdit(){

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