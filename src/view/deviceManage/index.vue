<template>
  <div id="deviceManage">
    <h1><span>当前位置 > </span>设备管理</h1>
    <div class="bottom_wrap">
      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData">
          <FormItem label="">
            <Input v-model="searchData.searchText"  placeholder="用户名/IME"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click='queryDeviceTable'>筛选</Button>
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
                    <Button type="primary" v-has='"device_add"'  @click="addDevice"><Icon type="plus"></Icon> 添加设备</Button>
                </div>
           </div>
           <Table border :columns="columns" :loading='loading' :data="deviceData" no-data-text="暂无数据"></Table>            
           <Page :total="totalPage" :current='searchData.pageNo' @on-change='changePage' show-total class="page_wrap"></Page>
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
            <Select v-model="addDeviceData.userName" filterable style="width:200px" @on-change='handleUserChange'>
                <Option :value="item.userName" v-for='(item,index) in userData' :key='index'>{{item.userName}}</Option>
            </Select>

          </FormItem>
          <FormItem label="设备平台" prop="plateName">
            <Select v-model="addDeviceData.plateName"  style="width:200px">
                <Option value="01">Andriod</Option>
            </Select>
          </FormItem>
          <FormItem label="设备类型" prop="type">
            <Select v-model="addDeviceData.type"  style="width:200px">
                <Option value="01">手机</Option>
            </Select>
          </FormItem>
          <FormItem label="设备归属" prop="belongto">
            <Select v-model="addDeviceData.belongto"  style="width:200px">
                <Option value="01">企业</Option>
                <Option value="02">个人</Option>
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
import qs from 'qs'
import {mapActions,mapGetters} from 'vuex'
export default {
// created-----------------------------------------------------------------------------------
  created(){
    document.title = "设备管理"
    this.searchData.pageNo = this.devicePage
    this.queryTable()
    this.queryUser()
  },

// computed---------------------------------------------------------------------------------
  computed:{
    ...mapGetters(['devicePage'])
  },

// data-------------------------------------------------------------------------------------
  data(){
    return {
      userData:[],
      loading:false,
      searchData:{
        searchText:'',
        pageNo:1,
        pageSize:10
      },
      startRow:1,
      totalPage:1,
      ruleValidate:{
          userName:[
            { required: true,  message:'请选择用户', trigger: 'change' },
          ],
          plateName:[
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
            // type: 'index',
            align: 'center',
            title: "序号",
            render:(h,params)=>{
              return h('div',params.index + this.startRow)
            }
        },
        {
            title: '设备名称',
            key: 'name'
        },
        {
            title: '用户名',
            key: 'userName'
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
            key: 'belongto',
            render:(h,params)=>{
              return h('div',this.allBelongTo[params.row.belongto])
            }
        },
        // {
        //     title: '系统版本',
        //     key: 'sysVersion'
        // },
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
                                this.setPage3(this.searchData.pageNo)
                                this.$router.push({path:'/index/deviceDetail',query:{id:params.row.id}})     
                            }
                        }
                    }, '详情')
                  ]);
            }
        }
      ],
      deviceData: [],
      addModal: false,
      addDeviceData: {
          userName:'',
          phone:"",
          plateName:'01',
          type: '01',
          belongto:'01',
          assetNum: '',
          name:'',
          imei:"",
          model:''
      },
      allBelongTo:{
        '01':'企业',
        '02':'个人'
      },


    }
  },

// methods----------------------------------------------------------------------------------
  methods: {
      ...mapActions(['setPage3']),
      // 查询表格
      queryTable(){
        this.loading=true
        this.axios.post('/device/listDevices',this.searchData)
        .then(res=>{
          this.loading=false
          if(res&&res.success=='1'&&res.data){
            const data = res.data
            this.deviceData = data.list
            this.totalPage = data.total
            this.startRow = data.startRow
            
            this.setPage3(1)
          }
        })
      },

      // 点击筛选按钮
      queryDeviceTable(){
        this.searchData.pageNo = 1
        this.queryTable()
      },

      // 切换页码
      changePage(current){
        this.searchData.pageNo =current
        this.queryTable()
      },

      // 查询所有启用状态的用户
      queryUser(){
        this.axios.get("/userPerm/listAppUsers").then(res => {
          if(res&&res.success=='1'){
            this.userData = res.data
          }
        })
      },

      // 点击添加设备按钮
      addDevice(){
        this.$refs['formValidate'].resetFields() 
        this.addModal=true
      },

      // 确认添加
      confirmAdd(){
        this.$refs['formValidate'].validate((valid) => {
            if(valid) {
              this.axios.get('/device/addDevice',{params:this.addDeviceData})
              .then(res=>{
                if(res&&res.success=='1'){
                  this.$Message.success("操作成功！")
                  this.addModal=false
                  this.searchData.searchText=''
                  this.searchData.pageNo=1
                  this.queryTable()
                }else{
                  this.$Message.error("操作失败！")
                  this.addModal=false
                }
              })
            }
        })
      },
// 匹配用户名对应的手机号
      handleUserChange(){
          console.log(this.userData)
          this.addDeviceData.phone = this.userData.filter(item=>{
              return item.userName==this.addDeviceData.userName
          })[0]['phone']
        
      }
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