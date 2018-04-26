<template>
  <div id="rightsManage">
    <h1><span>当前位置 > </span>权限管理</h1>
    <div class="bottom_wrap">
        <div class="add_button">
          <Button type="primary">添加角色</Button>
        </div>
        <Table border :columns="columns" :data="roleData"></Table>
    </div>

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
            width: 60,
            align: 'center',
            title: "序号"
        },
        {
            title: '角色名称',
            key: 'roleName'
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
                                // this.show(params.index)
                                
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
                                // this.remove(params.index)
                            }
                        }
                    }, '删除'),
                     h('Button', {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.$router.push({path:"/index/dispatchRight"})
                            }
                        }
                    }, '分配权限')
                ]);
            }
        }
      ],
      roleData: [
        {
            roleName: '管理员',
            description: "管理员",
        },
        {
            roleName: '普通成员',
            description: "普通成员",
        },
        
      ]
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #rightsManage {
    .add_button {
      margin-bottom:10px;
    }
  }
</style>