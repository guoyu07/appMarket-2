<template>
  <div id="dispatchRight">
    <input type='checkbox'/>
    <h1><span>当前位置 > </span><a href="#/index/rightsManage">权限管理</a><span> > </span><span class="title_active">分配权限</span></h1>
    <div class="bottom_wrap clearfix">
        <div class="btn_wrap">
            <Button type="primary" style="margin-right:15px" @click="selectAll(flag)">{{flag==true?'全选':'取消全选'}}</Button>
            <Button type="primary" style="margin-right:15px" @click="openAll(flag1)">{{flag1==true?'全部展开':'全部折叠'}}</Button>
        </div>
        <div class="tree_wrap">
            <div class="title">应用管理</div>
            <div class="inner">
                <Trees :data='appData'></Trees>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">用户管理</div>
            <div class="inner">
                <Trees :data="userData"></Trees>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">权限管理</div>
            <div class="inner">
                <Trees :data="rightsData"></Trees>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">设备管理</div>
            <div class="inner">
                <Trees :data="deviceData"></Trees>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">日志报表</div>
            <div class="inner">
                <Trees :data="logData"></Trees>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      
    </div>
    <!-- 底部按钮 -->
    <div class="wrap btn_wrap_b">
        <Button size="large" style="margin-right:20px" @click="$router.push({path:'/index/rightsManage'})">取消</Button>
        <Button type="primary" size="large" @click='submit'>提交</Button>
    </div>
  </div>
</template>

<script>
import {setValue,getId} from '../../util/util.js'
import Trees from '../../components/Trees.vue'
export default {
// created----------------------------------------------------------------------------------------------
  created(){
    document.title="权限管理-分配权限";
    // 获取用户id
    this.roleId = this.$route.query.roleId
    this.queryTree()
  },

  components:{
      Trees
  },

// data-------------------------------------------------------------------------------------------------
  data(){
    return {
      spinShow:false,
      roleId:"",
      data:[],
      appData: [],
      userData:[],
      rightsData:[],
      deviceData:[],
      logData:[],
      flag:true,
      flag1:false,
      idList:[]
    }
  },

// methods----------------------------------------------------------------------------------------------
   methods:{
       // 权限树查询
       queryTree(){
           this.spinShow=true
           this.axios.get('userPerm/getPermissionTree',{params:{
               roleId:this.roleId
                } 
           })
           .then(res=>{
               if(res&&res.success=='1'){
                   this.spinShow=false
                   const data = res.data
                   this.data = data.map(item=>{
                       return [item]
                   })
                   this.appData = this.data[0]
                   this.userData = this.data[1]
                   this.rightsData = this.data[2]
                   this.deviceData = this.data[3]
                   this.logData = this.data[4]

               }
           })
       },

       // 全选
       selectAll(flag){
           this.flag = flag
           setValue(this.appData,'checked',flag)
           setValue(this.userData,'checked',flag)
           setValue(this.rightsData,'checked',flag)
           setValue(this.deviceData,'checked',flag)
           setValue(this.logData,'checked',flag)
            this.flag=!flag
       },

       // 全部展开
       openAll(flag){
           
           setValue(this.appData,'expand',flag)
           setValue(this.userData,'expand',flag)
           setValue(this.rightsData,'expand',flag)
           setValue(this.deviceData,'expand',flag)
           setValue(this.logData,'expand',flag)
           this.flag1 = !flag
       },

       //确定提交权限
       submit(){
           getId(this.appData,this.idList)
           getId(this.userData,this.idList)
           getId(this.rightsData,this.idList)
           getId(this.deviceData,this.idList)
           getId(this.logData,this.idList)
          
          this.axios.get('/userPerm/correlationPermissions',{
              params:{
                  roleId:this.roleId,
                  permissionIds:this.idList.join(";")
              }
          }).then(res=>{
              if(res&&res.success=='1'){
                  this.$Message.success('操作成功！')
                  this.$router.push({path:'/index/rightsManage'})
              }else{
                  this.$Message.error('操作失败！')
              }
          })
       },

   },

// watch---------------------------------------------------------------------------------
    watch:{
        'userData':{
            handler:(curVal,oldVal)=>{
                if(curVal[0].children[0].checked==false && curVal[0].children[1].checked==false){
                    curVal[0].checked = false
                }
            },
            deep:true
        },
        'logData':{
            handler:(curVal,oldVal)=>{
                if(curVal[0].children[0].checked==false && curVal[0].children[1].checked==false){
                    curVal[0].checked = false
                }
                if(curVal[0].children[0].children[0].checked==false&&curVal[0].children[0].children[1].checked==false){
                    curVal[0].children[0].checked = false
                }
                if(curVal[0].children[1].children[0].checked==false&&curVal[0].children[1].children[1].checked==false&&curVal[0].children[1].children[2].checked==false){
                    curVal[0].children[1].checked = false
                }
            },
            deep:true
        }
    }

}
</script>

<style lang="scss" scoped type="text/css">
    #dispatchRight{
        .bottom_wrap{
            background:#fff;
            margin:20px;
            min-height:475px;
            .btn_wrap{
                margin-bottom:20px;
            }
            .tree_wrap{
                width:20%;
                float:left;
                position:relative;
                padding:0 10px 0 0;
                .inner{
                    border:1px solid #ccc;
                }
                .title{
                    text-align:center;
                    height:40px;
                    line-height:40px;
                    background:#63c185;
                    color:#fff;
                }
            }
        }
        .btn_wrap_b {
            padding:20px;
            margin:0 20px;
            text-align:center;
            background:#fff;
        } 
    }
</style>


