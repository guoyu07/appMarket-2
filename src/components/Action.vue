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
      'hasName', 'textName','id','pageNo'
    ],
  methods:{
    ...mapActions(['setPage1']),
    handleClick(){
      this.setPage1(this.pageNo)      
      if(this.textName=='版本升级'){
         this.$router.push({path:"/index/editApp",query:{type:0,id:this.id,pageNo:this.pageNo}})        
      }else if(this.textName=='详情'){
        this.$router.push({path:"/index/appDetail",query:{id:this.id,pageNo:this.pageNo}})
      }else {
        this.$router.push({path:"/index/editApp",query:{type:1,id:this.id,pageNo:this.pageNo}})
      }
    }
  }
}
</script>
