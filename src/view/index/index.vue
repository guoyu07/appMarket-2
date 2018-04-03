<template>
    <div class="layout">
        <Layout>
            <!-- 头部 -->
            <Head></Head>
            <Row>
                <Col span="3">
                     <!-- 侧边栏 -->
                     <MenuComponent></MenuComponent>
                </Col>
                <Col span="21">
                    <div class="layout-content-main">
                        <!-- 路由匹配到的组件将渲染在这里 -->
                        <router-view></router-view>
                    </div>
                </Col>
            </Row>
           
        
        </Layout>
    </div>
</div>
</template>

<script>
    import Head from '../../components/Head.vue'
    import Menu from '../../components/Menu.vue'
    export default {
        components: {
            "Head": Head,
            "MenuComponent": Menu,
        },
        data(){
            return {
                
            }
        },

        methods: {
            
        }
    }
</script>

<style scoped lang="scss" type="text/css">
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-nav{
    // width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.layout-content-main {
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
    margin-bottom: 20px;
}




</style>

