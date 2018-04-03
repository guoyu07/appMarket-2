<template>
  <div id="menuManage">
    <Row>
      <!-- 左侧菜单栏 -->
      <Col span='3'>
        <div class='left_content'>
          <Tree :data="menuTree"></Tree>
        </div>
      </Col>
      <!-- 右侧内容 -->
      <Col span='21'>
        <div class='right_content'>
          <!-- 查询条件 -->
          <div class="query_wrap clearfix">
            <Input v-model="query" size="large" placeholder="请输入菜单名称" style="width:200px;float:left;"></Input>
            <Button type="success" size="large" style="float:left;margin-left:20px;">查询</Button>
            <Button type="primary" size="large" style="float:left;margin-left:10px;">添加</Button>
          </div>
          <!-- 表格 -->
          <div class="table_wrap">
            <Table border :columns="columns" :data="tableData"></Table>
            <Page :total="2" size="small" show-total></Page>
          </div>

        </div>
      </Col>
    </Row>

    <!-- 编辑模态框 -->
    <Modal v-model="editModal" title="菜单修改" :mask-closable='false' class="nofoot" >
        <div class="editForm">
          <Form :model="editForm" :label-width="80">
            <FormItem label="菜单名称">
                <Input v-model="editForm.name" placeholder="菜单名称"></Input>
            </FormItem>
            <FormItem label="菜单描述">
                <Input v-model="editForm.name" placeholder="菜单描述"></Input>
            </FormItem>
            <FormItem label="菜单等级">
                <RadioGroup v-model="editForm.name">
                    <Radio label="1">一级</Radio>
                    <Radio label="2">二级</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="菜单地址">
                <Input v-model="editForm.name" placeholder="菜单地址"></Input>
            </FormItem>
            <FormItem label="菜单图标">
                <Input v-model="editForm.name" placeholder="菜单图标"></Input>
            </FormItem>
            <FormItem label="菜单排序">
                <Input v-model="editForm.name" placeholder="菜单排序"></Input>
            </FormItem> 
             <FormItem>
                <Button type="success" size='large'>立即提交</Button>
                <Button style="margin-left: 8px" size='large'>取消</Button>
            </FormItem> 
          </Form>
        </div>
    </Modal>

    <!-- 删除模态框 -->
    <Modal v-model="delModal" title='菜单删除' :mask-closable='false'>
      <p style="font-size:16px">确定删除该菜单？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuTree:[
                  {
                      title: '监狱管理平台',
                      expand: true,
                      render: (h, { root, node, data }) => {
                          return ([
                              h('span', [
                                  h('Icon', {
                                      props: {
                                          type: 'ios-folder-outline'
                                      },
                                      style: {
                                          marginRight: '8px'
                                      }
                                  }),
                                  h('span', data.title)
                              ]),
                              h('span', {
                                  style: {
                                      display: 'inline-block',
                                      float: 'right',
                                      marginRight: '32px'
                                  }
                              })
                          ]);
                      },
                      children: [
                          {
                              title: '首页',
                              expand: false,
                          },
                          {
                              title: '系统配置',
                              expand: true,
                              children: [
                                  {
                                      title: '菜单管理',
                                      expand: true,
                                  },
                                  {
                                      title: '角色管理',
                                      expand: true
                                  },
                                  {
                                      title: '登录账号',
                                      expand: true
                                  }
                              ]
                          },
                          {
                              title: '基础信息',
                              expand: true,
                              children: [
                                  {
                                      title: '部门管理',
                                      expand: true,
                                  },
                                  {
                                      title: '民警管理',
                                      expand: true
                                  },
                                  {
                                      title: '职工管理',
                                      expand: true
                                  }
                              ]
                          },
                          {
                              title: '通信管理',
                              expand: true,
                              children: [
                                  {
                                      title: '频道管理',
                                      expand: true,
                                  },
                                  {
                                      title: '亲情号码',
                                      expand: true
                                  }
                              ]
                          },
                          {
                              title: '访客管理',
                              expand: true,
                              children: [
                                  {
                                      title: '访客登记',
                                      expand: true,
                                  }
                              ]
                          },
                        ]
                  }
      ],
      query: '',
      columns:[
        {
            title: '菜单名称',
            key: 'name'
        },
        {
            title: '菜单描述',
            key: 'age'
        },
        {
            title: '菜单等级',
            key: 'address'
        },
        {
            title: '上级菜单',
            key: 'address'
        },
        {
            title: '菜单地址',
            key: 'address'
        },
        {
            title: '菜单图标',
            key: 'address'
        },
        {
            title: '菜单排序',
            key: 'address'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
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
      tableData:[
        {
            name: '首页',
            age: '首页',
            address: '一级'
        },
        {
            name: '首页',
            age: '首页',
            address: '一级'
        },
      ],
      editModal: false,
      editForm: {
        name: '1'
      },
      delModal: false
    }
  },
  created(){
    document.title = '系统配置-菜单管理'
  },
  methods:{
    // 点击编辑
    edit(index) {
        this.editModal = true;
    },
    // 点击删除
    del(index) {
        this.delModal = true;
    },

  }
}
</script>

<style scoped lang='scss' type='text/css'>
  #menuManage{
    height: 100%;

    .left_content {
      height:100%;
      border:1px solid #ccc;
      padding: 0 10px;
    }

    .right_content {
      height:100%;
      border:1px solid #ccc;
      margin: 0 10px;

      .query_wrap {
        padding: 15px;
        background:#eee;
      }
      .table_wrap {
        padding: 15px;
      }
    }
  }
</style>


