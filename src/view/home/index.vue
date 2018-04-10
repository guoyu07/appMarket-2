<template>
  <div id="homepage">
    <h1>首页</h1>
    
  </div>
</template>

<script>
export default {
  
  data(){
    return {
    }
  },
  created(){
    document.title = '首页-应用市场后台管理系统'
    console.log(this.$store.state.role)
  },
  computed: {
    token(){
      return this.$store.state.token
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped type="text/css">
#homepage {


}

</style>


