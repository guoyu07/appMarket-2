<template>
  <div id="dispatchRight">
    
    <h1><span>当前位置 > </span><a href="#/index/rightsManage">权限管理</a><span> > </span><span class="title_active">分配权限</span></h1>
    <div class="bottom_wrap clearfix">
        <div class="btn_wrap">
            <Button type="primary" style="margin-right:15px" @click="selectAll(flag)">{{flag==true?'全选':'取消全选'}}</Button>
            <Button type="primary" style="margin-right:15px" @click="openAll(flag1)">{{flag1==true?'全部展开':'全部折叠'}}</Button>
        </div>
        <div class="tree_wrap">
            <div class="title">应用管理</div>
            <div class="inner">
                <Tree :data="appData" ref='tree' show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">用户管理</div>
            <div class="inner">
                <Tree :data="userData" ref='tree1' show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">权限管理</div>
            <div class="inner">
                <Tree :data="rightsData" ref='tree2' show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">设备管理</div>
            <div class="inner">
                <Tree :data="deviceData" ref='tree3' show-checkbox multiple></Tree>
                <div class="treeM"></div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div class="tree_wrap">
            <div class="title">日志报表</div>
            <div class="inner">
                <Tree :data="logData" ref='tree4' show-checkbox multiple></Tree>
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
import {setValue} from '../../util/util.js'
export default {
// created----------------------------------------------------------------------------------------------
  created(){
    document.title="权限管理-分配权限";
    // 获取用户id
    this.roleId = this.$route.query.roleId
    this.queryTree()
  },

// data-------------------------------------------------------------------------------------------------
  data(){
    return {
      spinShow:false,
      roleId:"",
      data:[],
      appData:[],
      userData:[],
      rightsData:[],
      deviceData:[],
      logData:[],
      flag:true,
      flag1:false,
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
            setTimeout(()=>{
                $(".ivu-checkbox-indeterminate").removeClass("ivu-checkbox-indeterminate")

            },100)
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
           var auth = this.$refs.tree.getCheckedNodes().map(item=>{
               return item.id
           }).concat(this.$refs.tree1.getCheckedNodes().map(item=>{
               return item.id
           }),this.$refs.tree2.getCheckedNodes().map(item=>{
               return item.id
           }),this.$refs.tree3.getCheckedNodes().map(item=>{
               return item.id
           }),this.$refs.tree4.getCheckedNodes().map(item=>{
               return item.id
           })).join(";")

          this.axios.get('/userPerm/correlationPermissions',{
              params:{
                  roleId:this.roleId,
                  permissionIds:auth
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


