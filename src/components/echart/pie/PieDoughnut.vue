<template>
  <div>
    <div ref="chartCanvas" :style="chartStyle"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

export default {
  name: "PieDoughnut",
  props: {
    width: {
      type: String,
      required: false,
      default: '550px'
    },
    height: {
      type: String,
      required: false,
      default: '350px'
    }
  },
  data() {
    return {
      data: [],
      option: []
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
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接注册' },
        { value: 580, name: 'Email' },
        { value: 484, name: '插屏广告' },
        { value: 300, name: '视频广告' }
      ]
    },
    fillOption() {
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
