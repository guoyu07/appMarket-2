<template>
  <div id="homepage">

    <h1><span>当前位置 > </span>首页</h1>
    <div class="bottom_wrap">
      
        <!-- 统计数据部分 -->
        <div class="statistics">

            <!-- 应用 -->
            <div class="app_num">
              <div class="num">
                <p class="number">50</p>
                <p>安卓应用</p>
              </div>
              <div class="name">
                <p class="right_icon"><span class="mar-20 item">应用</span><Icon type="cube"></Icon></p>
              </div>
            </div>

              <!-- 用户 -->
            <div class="user_num">

              <div class="num">
                <p class="number">128</p>
                <p>在线用户</p>
              </div>

              <div class="num">
                <p class="number">108</p>
                <p>已激活用户</p>
              </div>

              <div class="num">
                <p class="number">120</p>
                <p>未激活用户</p>
              </div>
              
              <div class="name">
                <p class="right_icon right"><span class="mar-20 item">用户</span><Icon type="ios-people"></Icon></p>
              </div>
            </div>

        </div>

        <!-- 图表部分 -->
        <div class="charts_wrap">
            <div class="charts">
              <div class="left">
                <h2>设备报表</h2>
                <div id="chart1" class="chart_bg"></div>
              </div>
              <div class="right">
                <h2>客户端统计</h2>
                <div id="chart2" class="chart_bg"></div>
              </div>
            </div>

            <div class="charts">
              <div class="left">
                <h2>设备违规统计</h2>
                <div id="chart3" class="chart_bg"></div>
              </div>
              <div class="right">
                <h2>应用安装情况</h2>
                <div id="chart4" class="chart_bg"></div>
              </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
var Highcharts = require('highcharts')
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts)
export default {

// data------------------------------------------------------------------------------------------ 
  data(){
    return {
    }
  },

// created----------------------------------------------------------------------------------------
  created(){
    document.title = '首页-应用市场管理平台'
  },

// mounted----------------------------------------------------------------------------------------
  mounted(){
    
    this.renderPie({
      ele:"chart1",
      title:"设备型号分布图",
      data:[
                ['787手机', 45.0],
                ['华为手机', 26.8],
            ],
    })
    this.renderPie({
      ele:"chart2",
      title:"Andriod客户端版本分布图",
      data:[
                ['Andriod8.0', 45.0],
                ['Andriod7.0', 26.8],
                ['Andriod9.0', 76.8],
                ['Andriod9.0', 76.8],
                ['Andriod9.0', 76.8],
            ],
    })
    this.renderPie({
      ele:"chart3",
      title:"违规设备分布图",
      data:[
                ['正常设备', 45.0],
                ['违规设备', 26.8],
            ],
    })
    this.renderColumn({
      ele:"chart4",
      data:[{
                name: '应用名称',
                data: [{
                    name: 'qq',
                    y: 56.33},
                    {
                    name: '微信',
                    y: 24.03},
                    {
                    name: '微博',
                    y: 10.38}, 
                    {
                    name: '网易新闻',
                    y: 4.77}, 
                    {
                    name: '知乎',
                    y: 0.91}, 
                    {
                    name: '抖音',
                    y: 0.2}, 
                    {
                    name: '简书',
                    y: 6.72}, 
                    {
                    name: '支付宝',
                    y: 3.98
                }]
            }],

    })
  },

// computed----------------------------------------------------------------------------------------
  computed: {
    token(){
      return this.$store.state.token
    }
  },

// methods-----------------------------------------------------------------------------------------
  methods: {
     // 渲染饼图
     renderPie(options){
        Highcharts.chart(options.ele, {
            chart: {
                // plotBackgroundColor: null,
                // plotBorderWidth: null,
                // plotShadow: false
            },
            colors:['#f45853','#7bd5e9','#73dcb6','#ffbe31'],
            credits: {
                enabled: false,
            },
             exporting: {
              enabled: false
            },
            title: {
                text: options.title,
                y:220
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                  size:180,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    center: ['50%','25%']
                },
            },
            series: [{
                type: 'pie',
                name: options.title,
                innerSize: '50%',
                data: options.data
            }]
        });
     },

     // 渲染柱状图
     renderColumn(options){
       Highcharts.chart('chart4', {
            chart: {
                type: 'column'
            },
            colors:['#64c086'],
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '',
                },
                max: 100
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
            },
            series: options.data
        });
     }

  }

}
</script>

<style lang="scss" scoped type="text/css">
#homepage {
  .statistics {
    width:1130px;
    height:100px;
    margin:0 auto 20px;
    .num {
        float: left;
        width:150px;
        height:100%;
        text-align:center;
        p{
          color:#fff;
        }
        p.number {
          font-size:34px;
          margin-top:10px;
        }
      }
    .app_num {
      float: left;
      width:380px;
      height:100%;
      border-radius:5px;
      background:#7bd5e9;
    }
    .right_icon{
        height: 100px;
        line-height: 100px;
        margin-left: 50%;
        font-size: 40px;
        color:#fff;
        .item{
          color: rgba(0,0,0,.3);
        }
      }

    .user_num{
      height:100px;
      width:700px;
      background:#73dcb6;
      margin-left:450px;
      border-radius:5px;
      .right {
        margin-left:500px;
      }
    }
    

  }

  .charts_wrap{
    .charts{
      height:300px;
      display: flex;
      text-align:justify;
      margin-bottom:30px;
      .left,.right {
        height:100%;
        width:50%;
        border:1px solid #ccc;
        border-radius:5px;
        h2{
          height: 50px;
          line-height:50px;
          text-indent:20px;
          background:#f1f1f1;
          border-bottom:1px solid #ccc;
        }
      }
      .right{
        margin-left:20px;
      }
      .chart_bg{
        background:#fff;
      }
      #chart1,#chart2,#chart3,#chart4{
        width:100%;
        height:250px;
      }
    }
  }

}

</style>


