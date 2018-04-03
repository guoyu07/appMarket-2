<template>
  <div id="policeManage">
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
            <Input v-model="query" size="large" placeholder="警员编号" style="width:200px;float:left;margin-right:10px;"></Input>
            <Input v-model="query" size="large" placeholder="姓名" style="width:200px;float:left;margin-right:10px;"></Input>
            <Input v-model="query" size="large" placeholder="警务通" style="width:200px;float:left;"></Input>
            <Button type="success" size="large" style="float:left;margin-left:20px;">查询</Button>
            <Button type="primary" size="large" style="float:left;margin-left:10px;">添加</Button>
            <Button type="primary" size="large" icon='ios-cloud-upload-outline' style="float:left;margin-left:10px;">导入</Button>
            <Button type="error" size="large" style="float:left;margin-left:10px;">批量删除</Button>
            <Button type="info" size="large" style="float:left;margin-left:10px;">发送消息</Button>
          </div>
          <!-- 表格 -->
          <div class="table_wrap">
            <Table  ref="selection" border :columns="columns" :data="tableData"  @on-selection-change='selectChange'></Table>
            <Page :total="2" size="small" show-total></Page>
          </div>

        </div>
      </Col>
    </Row>

    <!-- 编辑模态框 -->
    <Modal v-model="editModal" title="民警修改" :mask-closable='false' class="nofoot" >
        <div class="editForm">
          <Form :model="editForm" :label-width="80">
            <FormItem label="组织名称">
                <Input v-model="editForm.name" placeholder="组织名称"></Input>
            </FormItem>
            <FormItem label="上级组织">
                <Input v-model="editForm.name" placeholder="上级组织"></Input>
            </FormItem>
             <FormItem>
                <Button type="success" size='large'>立即提交</Button>
                <Button style="margin-left: 8px" size='large'>取消</Button>
            </FormItem> 
          </Form>
        </div>
    </Modal>

    <!-- 删除模态框 -->
    <Modal v-model="delModal" title='民警删除' :mask-closable='false'>
      <p style="font-size:16px">确定删除该民警？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuTree:[
                  {
                      title: '合肥开元',
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
                              title: '技术部',
                              expand: false,
                          },
                          {
                              title: '维修部',
                              expand: false,
                          },
                          {
                              title: '一监区',
                              expand: false,
                          },
                          {
                              title: '二监区',
                              expand: true,
                          },
                          {
                              title: '三监区',
                              expand: true,
                          },
                        ]
                  }
      ],
      query: '',
      columns:[
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '警号',
            key: 'name'
        },
        {
            title: '姓名',
            key: 'age'
        },
        {
            title: '性别',
            key: 'age'
        },
        {
            title: '组织',
            key: 'address'
        },
        {
            title: '警务通',
            key: 'address'
        },
        {
            title: '设备编号',
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
    document.title = '基础信息-民警管理'
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
    // 获取选中项及选中行数据
    selectChange(selection) {
      console.log(selection)
    }

  }
}
</script>

<style scoped lang='scss' type='text/css'>
  #policeManage{
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


