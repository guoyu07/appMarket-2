<template>
  <div id="deviceManage">
    <h1><span>当前位置 > </span>设备管理</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData">
          <FormItem label="">
            <Input v-model="searchData.search"  placeholder="用户名/IME"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">筛选</Button>
          </FormItem>
        </Form>
      </div>
      <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 设备列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary"  @click="addDevice"><Icon type="plus"></Icon> 添加设备</Button>
                </div>
           </div>
           <Table border :columns="columns" :data="deviceData" no-data-text="暂无数据"></Table>            
           <Page :total="2" show-total class="page_wrap"></Page>
      </div>
    </div>


    <!-- 添加设备模态框 -->
    <Modal
        title="添加设备"
        v-model="addModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
       <Form ref="formValidate" :rules="ruleValidate" :model="addDeviceData"  :label-width="80" style="width:70%;margin:10px auto 0">
          <FormItem label="用户名" prop="userName">
            <Select v-model="addDeviceData.userName"  style="width:200px">
                <Option value="0">小雪</Option>
                <Option value="1">张三</Option>
                <Option value="2">小明</Option>
            </Select>
          </FormItem>
          <FormItem label="设备平台" prop="platName">
            <Select v-model="addDeviceData.platName"  style="width:200px">
                <Option value="0">Andriod</Option>
            </Select>
          </FormItem>
          <FormItem label="设备类型" prop="type">
            <Select v-model="addDeviceData.type"  style="width:200px">
                <Option value="0">手机</Option>
            </Select>
          </FormItem>
          <FormItem label="设备归属" prop="belongto">
            <Select v-model="addDeviceData.belongto"  style="width:200px">
                <Option value="0">企业</Option>
                <Option value="1">个人</Option>
            </Select>
          </FormItem>
          <FormItem label="资产编号" prop="assetNum">
            <Input v-model="addDeviceData.assetNum"  placeholder="请输入资产编号"></Input>
          </FormItem>
          <FormItem label="设备名称" prop="name">
            <Input v-model="addDeviceData.name"  placeholder="请输入设备名称"></Input>
          </FormItem>
          <FormItem label="IMEI" prop="imei">
            <Input v-model="addDeviceData.imei"  placeholder="请输入IMEI"></Input>
          </FormItem>
          <FormItem label="设备型号" prop="model">
            <Input v-model="addDeviceData.model"  placeholder="请输入设备型号"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large" @click="addModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmAdd">确定</Button>
        </div>
    </Modal>

  </div>
</template>

<script>
export default {
  created(){
    document.title = "设备管理"
  },
  data(){
    return {
      searchData:{
        search:''
      },
      ruleValidate:{
          userName:[
            { required: true,  message:'请选择用户', trigger: 'change' },
          ],
          platName:[
            { required: true,  message:'请选择设备平台', trigger: 'change' },
          ],
          type: [
            { required: true,  message:'请选择设备类型', trigger: 'change' },
          ],
          belongto:[
            { required: true,  message:'请选择设备归属', trigger: 'change' },
          ],
          assetNum: [
            { required: true,  message:'请输入资产编号', trigger: 'blur' },
          ],
          name:[
            { required: true,  message:'请输入设备名称', trigger: 'blur' },
          ],
          imei:[
            { required: true,  message:'请输入imei', trigger: 'blur' },
          ],
          model:[
            { required: true,  message:'请输入设备型号', trigger: 'blur' },
          ],
      },
      columns: [
        {
            type: 'index',
            align: 'center',
            title: "序号"
        },
        {
            title: '设备名称',
            key: 'name'
        },
        {
            title: '设备型号',
            key: 'model'
        },
        {
            title: 'IMEI',
            key: 'imei'
        },
        {
            title: '归属',
            key: 'belongto'
        },
        {
            title: '系统版本',
            key: 'sysVersion'
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
                                this.$router.push({path:'/index/deviceDetail'})
                                
                            }
                        }
                    }, '详情')
                  ]);
            }
        }
      ],
      deviceData: [
        {
            name: 'Q787',
            model: "ZXH-Q787",
            imei:'1234455',
            belongto:'企业',
            sysVersion: '7.0',
        }
        
      ],
      addModal: false,
      addDeviceData: {
          userName:'',
          platName:'0',
          type: '0',
          belongto:'0',
          assetNum: '',
          name:'',
          imei:"",
          model:''
      }

    }
  },

  methods: {
      // 点击添加设备按钮
      addDevice(){
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

  }
}
</script>

<style lang="scss" scoped type="text/css">
  #deviceManage {
    .search_wrap {
        background:#fff;
        padding:20px 20px 0 20px;
    }
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