<template>
  <div>
    <div ref="chartCanvas" :style="chartStyle"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { TooltipComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);

export default {
  name: "GaugeBasic",
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
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    },
    fillOption() {
      this.option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
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
