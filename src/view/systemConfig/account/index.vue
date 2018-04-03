<template>
  <div id='account'>
    <Row>
      <!-- 左侧菜单栏 -->
      <Col span='4'>
        <div class='left_content'>
          <Tree :data="menuTree"></Tree>
        </div>
      </Col>
      <!-- 右侧内容 -->
      <Col span='20'>
        <div class='right_content'>
          <!-- 查询条件 -->
          <div class="query_wrap clearfix">
            <Input v-model="query" size="large" placeholder="请输入账号" style="width:200px;float:left;"></Input>
            <Input v-model="query" size="large" placeholder="请输入姓名" style="width:200px;float:left;margin-left:10px;"></Input>
            <Button type="success" size="large" style="float:left;margin-left:20px;">查询</Button>
            <Button type="primary" size="large" style="float:left;margin-left:10px;">添加</Button>
          </div>
          <!-- 表格 -->
          <div class="table_wrap">
            <Table border :columns="columns" :data="tableData"></Table>
            <Page :total="10" size="small" show-total></Page>
          </div>

        </div>
      </Col>
    </Row>

    <!-- 编辑模态框 -->
    <Modal v-model="editModal" title="登录账号修改" :mask-closable='false' class="nofoot" >
        <div class="editForm accountModal">
          <Form :model="editForm" :label-width="80">
            <FormItem label="账号">
                <Input v-model="editForm.name" placeholder="菜单名称"></Input>
            </FormItem>
            <FormItem label="姓名">
                <Input v-model="editForm.name" placeholder="菜单描述"></Input>
            </FormItem>
            <FormItem label="性别">
                <Input v-model="editForm.name" placeholder="菜单地址"></Input>
            </FormItem>
            <FormItem label="选择角色">
                <Select v-model="editForm.roleName" style="width:40%">
                    <Option value="1">管理员</Option>
                    <Option value="2">无权限角色</Option>
                </Select>
            </FormItem>
            <FormItem label="组织">
                <Input v-model="editForm.name" placeholder="菜单排序"></Input>
            </FormItem> 
             <FormItem>
                <Button type="success" size='large'>立即提交</Button>
                <Button style="margin-left: 8px" size='large'>取消</Button>
            </FormItem> 
          </Form>
          <div class="avatar_upload">
            <Upload
              ref="upload"
              title="点击更换头像，使用jpg,png,jpeg格式"
              :show-upload-list="false"
              :format="['jpg','jpeg','png','apk']"
              :max-size="2048" 
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              action=""
              style="display: inline-block;">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" style="cursor: pointer;width:195px;height:185px" />
              <i v-else  class="icon iconfont icon-touxiang" style="font-size: 180px;height: 200px;color: rgb(255, 255, 255); margin-left: 7px;position: relative;top: -34px; cursor: pointer;"></i>
          </Upload>
          </div>
        </div>
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
            title: '账号',
            key: 'name'
        },
        {
            title: '姓名',
            key: 'age'
        },
        {
            title: '性别',
            key: 'address'
        },
        {
            title: '组织',
            key: 'address'
        },
        {
            title: '角色',
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
                    }, '编辑')
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
        {
            name: '首页',
            age: '首页',
            address: '一级'
        },
        {
            name: '首页',
            age: '首页',
            address: '一级'
        }
      ],
      editModal: false,
      editForm: {
        name: '1',
        roleName: ''
      },
       imageUrl: '',
    }
  },
  created(){
    document.title = '系统配置-登录账号'
  },
  methods:{
    // 点击编辑
    edit(index) {
        this.editModal = true;
    },

    handleBeforeUpload (file) {
          const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png')
          const isLt2M = file.size / 1024 / 1024 < 2
          if (!isJPG) {
              this.$Message.error('上传头像图片只能是 JPG、JPEG、PNG 格式!')
              return isJPG
          }
          if (!isLt2M) {
              this.$Message.error('上传头像图片大小不能超过 2MB!')
              return isLt2M
          }
           console.log(file)
          var reader = new FileReader();
          reader.readAsDataURL(file);
          var data;
          var that = this
          reader.onload = function(e){  
            console.log(this.result)
              data = this.result
              that.imageUrl = data
              console.log('json',JSON.stringify(data))
          }
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      }
  }
}
</script>

<style scoped lang='scss' type='text/css'>
   #account{
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
  .avatar_upload {
      position: absolute;
      right: 30px;
      top: 100px;
      background: #ccc;
      height: 190px;
      width: 195px;
    }
</style>

