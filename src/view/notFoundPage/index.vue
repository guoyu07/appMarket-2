<template>
    <div @click="returnHome">
      <img src="../../assets/img/404.jpg" alt="" >
    </div>
</template>



<script>
export default {
  created(){
    document.title = "404 not found"
  },
  methods: {
    returnHome(){
      this.$router.push({path:"/index/homepage"})
    }
  }
}
</script>


<style lang="scss" scoped  type="text/css">
  img {
    width:90%;
    cursor: pointer;
  }
</style>


