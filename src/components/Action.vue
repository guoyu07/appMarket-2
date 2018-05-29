<template>
  <Button v-has="hasName" type='text' v-text='textName' @click="handleClick(id)" style="font-size:14px;padding:0;color:#63c185"></Button>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      
    }
  },
  props: [
      'hasName', 'textName','id','pageNo','state'
    ],
  methods:{
    ...mapActions(['setPage1']),
    handleClick(){
       
      switch (this.hasName) {
        // 应用管理 版本升级、详情、编辑
        case 'app_upper':
          if(this.state=='2'){
              return
          }else{
            this.setPage1(this.pageNo);
            this.$router.push({path:"/index/editApp",query:{type:0,id:this.id}});
          }
          break;
        case 'app':
          this.setPage1(this.pageNo);
          this.$router.push({path:"/index/appDetail",query:{id:this.id}})
          break;
        case 'app_edit':
         if(this.state=='2'){
              return
          }else{
            this.setPage1(this.pageNo);
            this.$router.push({path:"/index/editApp",query:{type:1,id:this.id}})
          }
          break;
      }     
    }
  }
}
</script>
