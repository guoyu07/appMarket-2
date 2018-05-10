<template>
  <div id="appManage">
    <h1><span>当前位置 > </span>应用管理</h1>
    
    <div class="bottom_wrap">

      <!-- 条件选择部分 -->
      <div class="search_wrap">
        <Form inline :model="searchData"  :label-width="55">
          <FormItem label="应用名">
            <Input v-model="searchData.content"  placeholder="请输入应用名"></Input>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="searchData.state"  style="width:100px">
                <Option value="-1">全部</Option>
                <Option value="1">启用</Option>
                <Option value="2">禁用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click='queryTable'>筛选</Button>
          </FormItem>
        </Form>
      </div>

      <!-- 表格 -->
      <div class="table_wrap">
          <div class="actions clearfix">
                <div class="applists">
                    <Icon type="navicon-round"></Icon> 应用列表
                </div>
                <div class="btns_wrap">
                    <Button type="primary" v-has="'addbtn'" style="margin-right:15px" @click="$router.push({path:'/index/addApp'})"><Icon type="plus"></Icon> 添加应用</Button>
                    <Button type="primary" v-has="'addbtn'"  class='isDisabled' style="margin-right:15px"  @click="isSelected('1')?handleClick('1'):''">启用</Button>
                    <Button type="primary" v-has="'addbtn'"  class='isDisabled' style="margin-right:15px"  @click="isSelected('2')?handleClick('2'):''">禁用</Button>
                    <Button type="primary" class='isDisabled' style="margin-right:15px"  @click="isSelected('3')?handleClick('3'):''">黑名单</Button>
                    <Button type="primary" class='isDisabled'  @click="isSelected('4')?handleClick('4'):''" >白名单</Button>
                </div>
           </div>

           <div style="position:relative">
                <Table border :columns="columns" :loading="loading" :data="appData" @on-selection-change="selectAppChange" no-data-text="暂无数据"></Table>            
                <Page :total="totalPage" show-total class="appPage page_wrap"></Page>
                <!-- <Spin fix v-if='loading'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>loading...</div>
                </Spin> -->
           </div>
           
      </div>
      
    </div>
    
    <!-- 启用、禁用、黑白名单 模态框 -->
    <Modal
        :title="title"
        v-model="actionModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p class="modalp">{{content}}</p>
        <div slot="footer">
            <Button  size="large" @click="actionModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmAction(flag)">确定</Button>
        </div>
    </Modal>
  
    <!-- 下发模态框 -->
    <Modal
        title="用户"
        v-model="dispatchModal"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <div style="margin-bottom:20px">
            <Input type="text" placeholder="姓名/用户名/手机号" v-model="searchUser" style="width:250px;margin-right:20px"></Input>
            <Button type="primary">筛选</Button>
        </div>
        <Table border ref="selection" :columns="columns2" :data="userData" @on-selection-change="selectUserChange" no-data-text="暂无数据"></Table>
        <div slot="footer">
            <Button  size="large" @click="dispatchModal=false">取消</Button>
            <Button type="primary" size="large" @click="confirmDispatch">确定</Button>
        </div>
    </Modal>
    <Action></Action>
  </div>
  
</template>


<script>
import {breakTips} from '../../util/util'
import Action from '../../components/Action.vue'
export default {
    components:{
        Action
    },
// created------------------------------------------------------------------------------------
  created(){
    document.title = "应用管理";
    this.queryTable()
  },

// data---------------------------------------------------------------------------------------
  data(){
    return{
      perms:null,
      loading:false,
      totalPage:1,
      currentPage:1,
      searchData: {
        content: "",
        state: "-1",
        pageNo:1,
        pageSize:10
      },
      flag:'1',
      title:"",
      content:"",
      // 应用表格
      columns: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            type: 'index',
            width: 70,
            align: 'center',
            title: "序号"
        },
        {
            title: "类型",
            key: 'isBlacklist',
            render:(h,params)=>{
                return ('div',params.row.isBlacklist=='0'?'黑名单':'白名单')
            }
        },
        {
            title: '应用名',
            key: 'name'
        },
        {
            title: '版本号',
            key: 'versionId'
        },
        {
            title: '应用标签',
            key: 'tag',
            render:(h,params)=>{
                return ('div',params.row.tag=='1'?'工作':'生活')
            }
        },
        {
            title: '下载次数',
            key: 'downCnt',
            sortable: true
        },
        {
            title: '更新时间',
            key: 'updateDate',
            sortable: true
        },
        {
            title: '状态',
            key: 'state',
            width:70,
            render:(h,params)=>{
                return ('div',params.row.state=='1'?'启用':'禁用')
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 220,
            render: (h, params) => {
                
                return h('div', {
                    attrs: {
                        class:'action_wrap'
                    }
                },[
                    h(Action, {
                        style: {
                            marginRight: '10px',
                            padding:0
                            // color:'#63c185',
                        },
                        props: {
                            hasName: 'addbtn',
                            textName: '版本升级',
                            id:params.row.name
                        }
                    }),
                    h(Action, {
                        style: {
                            marginRight: '10px',
                            padding:0
                            
                            // color:'#63c185',
                        },
                        props: {
                            hasName: 'addbtn',
                            textName: '详情',
                            // id:params.row.name
                        }
                    }),
                    h(Action, {
                        style: {
                            marginRight: '10px',
                            padding:0
                            
                            // color:'#63c185',
                        },
                        props: {
                            hasName: 'addbtn',
                            textName: '编辑',
                            id:params.row.name
                        }
                    }),
                    h('a', {
                        style: {
                            // marginRight: '10px',
                            color:params.row.isBlacklist=="白名单"?'#ccc':'#63c185',
                            cursor:params.row.isBlacklist=="白名单"?'not-allowed':'pointer'
                        },
                        on: {
                            click: () => {
                                if(params.row.isBlacklist=='白名单'){
                                    return
                                }
                                this.$refs.selection.selectAll(false);
                                this.searchUser = ''
                                this.dispatchModal = true
                            }
                        }
                    }, '下发')
                ]);
            }
        }
      ],
      appData: [],
      // 模态框
      actionModal:false,
      dispatchModal: false,
      // 复选框选中数据
      selectedAppData: [],
      selectedState:null,
      selectedIsBlacklist:null,
      startRow:1,
      selectedUserData: [],
      searchUser: '',  // 下发用户筛选
      // 下发用户表格
      columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
              title: "姓名",
              key: "name"
          },
          {
              title: "用户名",
              key: "userName"
          },
          {
              title: "手机号",
              key: "phone"
          },
      ],
      userData: [
          {
              name: "小雪",
              userName: '开元',
              phone: '18888888888'
          }
      ]
    }
  },

// methods------------------------------------------------------------------------------------
  methods:{

     // 查询表格
     queryTable(){
         this.loading = true
         this.axios.get('/app/listApps',{params:this.searchData})
         .then(res=>{
             if(res && res.success=='1' && res.data){
                 this.loading = false
                 const data = res.data
                 this.totalPage = data.total
                 this.appData = data.list
                 this.startRow = data.startRow
             }else{
                 this.loading = false                 
             }
         })
     },

    // 选中应用改变
     selectAppChange(selection){
        if(selection.length==0){
            this.selectedAppData = ''
        }else{
            this.selectedAppData = selection.map(item=>{
            return item.id
            }).join(";")
            this.selectedState = selection.map(item=>{
            return item.state
            })
            this.selectedIsBlacklist = selection.map(item=>{
            return item.isBlacklist
            })
        }
     },


     // 判断是否选中应用
    isSelected(flag){
      if(this.selectedAppData.length==0){
          this.$Message.warning('请至少选择一项应用！');
          breakTips()
          return false
      }else if(flag=='1'){
        if(this.selectedState.indexOf("1")!=-1){
          this.$Message.warning('含有已是启用状态的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }else if(flag=='2'){
        if(this.selectedState.indexOf("2")!=-1){
          this.$Message.warning('含有已是禁用状态的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }else if(flag=='3'){
        if(this.selectedIsBlacklist.indexOf("0")!=-1){
          this.$Message.warning('含有已是黑名单的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }else if(flag=='4'){
        if(this.selectedIsBlacklist.indexOf("1")!=-1){
          this.$Message.warning('含有已是白名单的数据！');
          breakTips()
          return false
        }else{
          return true
        }
      }
    },

    // 按钮点击判断
    handleClick(type){
        this.actionModal = true
        switch (type){
            case '1':
                this.title = '启用';
                this.content = '确定启用该应用吗？';
                this.flag = "1";
                break;
            case '2':
                this.title = '禁用';
                this.content = '确定禁用该应用吗？';
                this.flag = "2";
                break;
            case '3':
                this.title = '黑名单';
                this.content = '确定将该应用的类型修改为黑名单吗？';
                this.flag = "3";
                break;
            case '4':
                this.title = '白名单';
                this.content = '确定将该应用的类型修改为白名单吗？';
                this.flag = "4";
                break;
        }
    },

     // 确定启用/禁用/黑名单/白名单
     confirmAction(flag){
          this.axios.get('/app/changeState',{
              params:{
                  appIds:this.selectedAppData,
                  flag:flag
              }
          })
          .then(res=>{

          })
     },


     // 确定下发
     confirmDispatch(){
        if(this.selectedUserData.length==0){
            this.$Message.warning('请至少选择一位用户！');
            return
        }

        this.dispatchModal = false
     },

     

     // 选中用户改变
     selectUserChange(selection){
         this.selectedUserData = selection
         console.log(this.selectedUserData)
     },

  }

}
</script>

<style lang='scss' scoped  type="text/css">
    #appManage {
        // padding:0 0 50px 0;
       
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
