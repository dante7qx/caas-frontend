<template>
  <div>
    <div ref="chartCanvas" :style="chartStyle"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

export default {
  name: "LnePolar2",
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
      for (let i = 0; i <= 360; i++) {
        let t = (i / 180) * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        this.data.push([r, i])
      }
    },
    fillOption() {
      this.option = {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: this.data
          }
        ],
        animationDuration: 2000
      };
    }
  }
}
</script>

<style scoped>

</style>
