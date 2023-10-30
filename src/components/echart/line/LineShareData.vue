<template>
  <div>
    <div ref="chartCanvas" :style="chartStyle"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { UniversalTransition, LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  CanvasRenderer,
  UniversalTransition,
  LabelLayout
]);

export default {
  name: "LineShareData",
  props: {
    width: {
      type: String,
      required: false,
      default: '800px'
    },
    height: {
      type: String,
      required: false,
      default: '450px'
    }
  },
  data() {
    return {
      data: [],
      option: {}
    }
  },
  computed: {
    chartStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    const myChart = echarts.init(this.$refs.chartCanvas)
    const that = this
    setTimeout(function () {
      console.log(that.option)
      myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });
      myChart.setOption(that.option);
      that.option && myChart.setOption(that.option)
    })

  },
  methods: {
    init() {
      this.fillData()
      this.fillOption()
    },
    fillData() {
      this.data = [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }
      ]
    },
    fillOption() {
      this.option = {
        title: {
          text: '联动和共享数据'
        },
        legend: {},
        tooltip: {
          trigger: 'axis',
            showContent: false
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['奶茶', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
            ['抹茶拿铁', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ['奶酪可可', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
            ['核桃布朗尼', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: this.data
      }
    }
  }
}
</script>

<style scoped>

</style>
