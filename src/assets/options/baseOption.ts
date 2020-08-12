import 'echarts-wordcloud';

const base = {
  tooltip: {
    trigger: 'axis',
    confine: true
  },
  grid: {
    left: '4%',
    right: '7%',
    bottom: 44,
    containLabel: true
  },
  legend: {
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    type: 'scroll',
    pageIconSize: 15
  }
};

// 饼图
export const pieOption = {
  ...base,
  tooltip: {
    trigger: 'item',
    formatter: function(params: any) {
      const { seriesName, name, marker, percent, value } = params;
      return `${seriesName}</br> ${marker}${name}: ${value} (${percent}%)`;
    },
    confine: true
  },
  legend: {
    ...base.legend,
    left: '68%',
    top: '20%',
    orient: 'vertical',
    data: []
  },
  series: [
    {
      name: '',
      type: 'pie',
      center: ['35%', '57%'],
      // radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(83,110,194, 0.3)'
      },
      data: []
    }
  ]
};

// 折线&柱状
export const lineAndBarOption = {
  ...base,
  legend: {
    ...base.legend,
    bottom: 8
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: ['#e8e8e8']
      }
    },
    axisLabel: {
      formatter: function(value: any) {
        if (value > 1000000000) {
          return (Number(value) / 1000000000).toFixed(0) + 'b';
        } else if (value > 1000000) {
          return (Number(value) / 1000000).toFixed(0) + 'm';
        } else if (value > 1000) {
          return (Number(value) / 1000).toFixed(0) + 'k';
        } else {
          return value;
        }
      }
    }
  }
};

// 矩形树图
export const treeMapOption = {
  tooltip: {
    confine: true,
    formatter: function(params: any) {
      const { name, value, treePathInfo, marker } = params;
      return (
        marker +
        `${name}\n数量：${value}   占比：${((value / treePathInfo[0].value) * 100).toFixed(2)}%`
      );
    }
  },
  series: [
    {
      name: 'total',
      roam: false,
      type: 'treemap',
      label: {
        normal: {
          position: 'insideTopLeft',
          lineHeight: 20,
          fontSize: 12,
          formatter: function(params: any) {
            const { name, value, treePathInfo } = params;
            return `${name}\n数量：${value}   占比：${(
              (value / treePathInfo[0].value) *
              100
            ).toFixed(2)}%`;
          }
        }
      },
      upperLabel: {
        show: false,
        height: 30
      },
      nodeClick: 'false',
      visibleMin: 30,
      breadcrumb: {
        show: false
        // top: '86%',
        // itemStyle: {
        //   color: '#e8e8e8',
        //   borderWidth: 0,
        //   shadowBlur: 0,
        //   textStyle: {
        //     color: 'rgba(0,0,0,0.65)'
        //   }
        // }
      },
      height: '65%',
      bottom: 50,
      levels: [],
      // leafDepth: 1,
      data: []
    }
  ]
};

// 词云
export const wordCloudOption = {
  tooltip: {
    confine: true,
    show: true
  },
  series: [
    {
      gridSize: 10,
      sizeRange: [10, 20],
      type: 'wordCloud',
      size: ['80%', '80%'],
      rotationRange: [-45, 90],
      rotationStep: 45,
      shape: 'pentagon',
      width: '88%',
      top: 40,
      // textPadding: 0,
      // height: '88%',
      // autoSize: {
      //   enable: true,
      //   minSize: 14
      // },
      data: []
    }
  ]
};

// 雷达
export const radarOption = {
  legend: {
    ...base.legend,
    bottom: 8,
    data: []
  },
  tooltip: {},
  radar: {
    radius: '55%',
    axisLabel: {
      fontSize: 10,
      margin: 4
    },
    name: {
      textStyle: {
        color: 'rgba(0,0,0,0.65)'
      }
    },
    indicator: [
      // { name: '销售（sales）', max: 6500 },
      // { name: '管理（Administration）', max: 16000 },
      // { name: '信息技术（Information Techology）', max: 30000 },
      // { name: '客服（Customer Support）', max: 38000 },
      // { name: '研发（Development）', max: 52000 },
      // { name: '市场（Marketing）', max: 25000 }
    ]
  },
  series: [
    {
      type: 'radar',
      areaStyle: { opacity: 0.2 },
      data: [
        // {
        //   value: [4300, 10000, 28000, 35000, 50000, 19000],
        //   name: '预算分配（Allocated Budget）'
        // },
        // {
        //   value: [5000, 14000, 28000, 31000, 42000, 21000],
        //   name: '实际开销（Actual Spending）'
        // }
      ]
    }
  ]
};

export const guageOption = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: {
    type: 'gauge',
    detail: {
      fontSize: 20,
      offsetCenter: [0, '80%']
    },
    pointer: {
      length: '70%'
    },
    data: [],
    splitLine: {
      length: 15,
      lineStyle: {
        color: '#fefefe',
        opacity: 0.5,
        width: 1
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fefefe',
        opacity: 0.5,
        width: 0.5
      }
    },
    axisLine: {
      lineStyle: {
        color: [
          [0.3, '#72c3df'],
          [0.7, '#eda394'],
          [1, '#6d74ee']
        ],
        width: 15
      }
    }
  }
};
