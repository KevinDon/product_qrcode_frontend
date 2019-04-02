const chartDataHandler = {
  /**
   * sku日访问统计数据处理
   * @param chart echarts
   * @param data
   * @param vm
   */
  skuDailyChangHandle: function (chart, data, vm) {
    //  清除旧数据
    chart.clear();

    let _legend = [], _day = [], _series = {}, _seriesData = [];
    data.forEach((item, index) => {
      _legend.push(item['sku'])
      _day.push(item['dy'])
      if (_series[item['sku']] != undefined && _series[item['sku']]['data'] != undefined) {
        _series[item['sku']]['data'].push(item['num'])
      } else {
        var _data = [item['num']]
        _series[item['sku']] = {
          name: item['sku'],
          type: 'line',
          // stack: 'total',
          smooth: true,
          label: {show: true, position: 'top'},
          encode: {
            x: 'dy', y: 'num'
          },
          data: _data
        }
      }
    })
    Object.keys(_series).forEach(function (key) {
      _seriesData.push(_series[key])
    });

    let chartOptions = {
      title: {text: '日访问量统计图'},
      tooltip: {trigger: 'axis'},
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: '85%',
        top: '10%',
        width: '8%',
        tooltip: {
          show: true
        },
        textStyle: {
          fontSize: 11
        },
        data: Array.from(new Set(_legend))
      },
      grid: {left: '5%', right: '15%', bottom: '5%', containLabel: true},
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {yAxisIndex: false},
        }
      },
      dataZoom: [{type: 'slider', start: 0, end: 100}],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Array.from(new Set(_day))
      },
      yAxis: {type: 'value'},
      series: _seriesData
    };
    !!!chart || chart.setOption(chartOptions);
    return chartOptions;
  },
  /**
   * sku月访问统计数据处理
   * @param chart
   * @param data
   * @param vm
   */
  skuMonthlyChangeHandle: function (chart, data, vm) {
    console.log('数据', data, chart);
    chart.clear();

    let _legend = [], _mon = [], _series = {}, _seriesData = [];
    data.forEach((item, index) => {
      _legend.push(item['sku'])
      _mon.push([item['yr'], item['mo']].join('-'));
      if (_series[item['sku']] != undefined && _series[item['sku']]['data'] != undefined) {
        _series[item['sku']]['data'].push(item['num'])
      } else {
        var _data = [item['num']]
        _series[item['sku']] = {
          name: item['sku'],
          type: 'line',
          // stack: 'total',
          smooth: true,
          label: {show: true, position: 'top'},
          encode: {
            x: 'dy', y: 'num'
          },
          data: _data
        }
      }
    })
    Object.keys(_series).forEach(function (key) {
      _seriesData.push(_series[key])
    });

    let chartOptions = {
      title: {text: '月访问量统计图'},
      tooltip: {trigger: 'axis'},
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: '85%',
        top: '10%',
        width: '8%',
        tooltip: {
          show: true
        },
        textStyle: {
          fontSize: 11
        }, data: Array.from(new Set(_legend))
      },
      grid: {left: '5%', right: '15%', bottom: '5%', containLabel: true},
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {yAxisIndex: false},
        }
      },
      dataZoom: [{type: 'slider', start: 0, end: 100}],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Array.from(new Set(_mon))
      },
      yAxis: {type: 'value'},
      series: _seriesData
    };
    !!!chart || chart.setOption(chartOptions);
    return chartOptions;
  },
  /**
   * 周表
   * @param chart
   * @param data
   * @param vm
   * @returns {{title: {text: string}, tooltip: {trigger: string}, legend: {data: any[]}, grid: {left: string, right: string, bottom: string, containLabel: boolean}, toolbox: {feature: {saveAsImage: {}, dataZoom: {yAxisIndex: boolean}}}, dataZoom: {type: string, start: number, end: number}[], xAxis: {type: string, boundaryGap: boolean, data: any[]}, yAxis: {type: string}, series: Array}}
   */
  skuWeeklyChangeHandle: function (chart, data, vm) {
    console.log('数据', data, chart);
    chart.clear();

    let _legend = [], _week = [], _series = {}, _seriesData = [];
    data.forEach((item, index) => {
      _legend.push(item['sku'])
      _week.push([item['yr'], 'w', item['wk']].join('-'));
      if (_series[item['sku']] != undefined && _series[item['sku']]['data'] != undefined) {
        _series[item['sku']]['data'].push(item['num'])
      } else {
        var _data = [item['num']]
        _series[item['sku']] = {
          name: item['sku'],
          type: 'line',
          // stack: 'total',
          smooth: true,
          label: {show: true, position: 'top'},
          encode: {
            x: 'dy', y: 'num'
          },
          data: _data
        }
      }
    })
    Object.keys(_series).forEach(function (key) {
      _seriesData.push(_series[key])
    });

    let chartOptions = {
      title: {text: '周访问量统计图'},
      tooltip: {trigger: 'axis'},
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: '85%',
        top: '10%',
        width: '8%',
        tooltip: {
          show: true
        },
        textStyle: {
          fontSize: 11
        }, data: Array.from(new Set(_legend))
      },
      grid: {left: '5%', right: '15%', bottom: '5%', containLabel: true},
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {yAxisIndex: false},
        }
      },
      dataZoom: [{type: 'slider', start: 0, end: 100}],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Array.from(new Set(_week))
      },
      yAxis: {type: 'value'},
      series: _seriesData
    };
    !!!chart || chart.setOption(chartOptions);
    return chartOptions;
  },
  chartResizeHandle: function (chart, width, Height) {
    chart.resize('auto', 'auto')
  }
};

export default chartDataHandler
