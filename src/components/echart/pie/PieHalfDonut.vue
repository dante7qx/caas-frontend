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
  name: "PieHalfDonut",
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
        { value: 300, name: '视频广告' },
        {
          // make an record to fill the bottom 50%
          value: 1048 + 735 + 580 + 484 + 300,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        }
      ]
    },
    fillOption() {
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start angle
            startAngle: 180,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + ' (' + param.percent * 2 + '%)';
              }
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
