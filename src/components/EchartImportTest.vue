<template>
  <div id="EcharImportTest" class="chart">
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  const echarts = require('echarts/echarts.all');


  export default {
    name: "EchartImportTest",
    mounted: function () {
      this.initEchartHandle2()
    },
    methods: {
      initEchartHandle2: function () {
        try {
          let myChart = echarts.init(document.getElementById('EcharImportTest'));
          myChart.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              areaStyle: {}
            }]
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .chart
    width: 600px
    height: 400px
    margin: auto
</style>
