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
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

export default {
  name: "BarSeriesLayout",
  props: {
    width: {
      type: String,
      required: false,
      default: '550px'
    },
    height: {
      type: String,
      required: false,
      default: '650px'
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
    this.option && myChart.setOption(this.option)
  },
  methods: {
    init() {
      this.fillData()
      this.fillOption()
    },
    fillData() {
      this.data = [
        ['商品', '2012', '2013', '2014', '2015'],
        ['抹茶拿铁', 41.1, 30.4, 65.1, 53.3],
        ['奶茶', 86.5, 92.1, 85.7, 83.1],
        ['奶酪可可', 24.1, 67.2, 79.5, 86.4]
      ]
    },
    fillOption() {
      this.option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.data,
        },
        xAxis: [
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          { type: 'bar', seriesLayoutBy: 'row' },
          { type: 'bar', seriesLayoutBy: 'row' },
          { type: 'bar', seriesLayoutBy: 'row' },
          // These series are in the second grid.
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
