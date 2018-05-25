<template>
    <div class="layout">
        <Layout>
            <!-- 头部 -->
            <Head></Head>
            <Row>
                <Col span="4">
                     <!-- 侧边栏 -->
                     <MenuComponent></MenuComponent>
                </Col>
                <Col span="20">
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
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.layout-content-main {
    // padding: 20px;
    height: 100%;
    overflow: auto;
    margin-bottom: 20px;
}




</style>

