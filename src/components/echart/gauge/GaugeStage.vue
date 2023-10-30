<template>
  <div>
    <div ref="chartCanvas" :style="chartStyle"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";

export default {
  name: "GaugeStage",
  props: {
    width: {
      type: String,
      required: false,
      default: '650px'
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
    setInterval(function () {
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: +(Math.random() * 100).toFixed(2)
              }
            ]
          }
        ]
      });
    }, 1500);
    this.option && myChart.setOption(this.option)
  },
  methods: {
    init() {
      this.fillData()
      this.fillOption()
    },
    fillData() {
      this.data = [{ value: 80 }]
    },
    fillOption() {
      this.option = {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 40,
              fontSize: 12
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} km/h',
              color: 'inherit',
              fontSize: 18
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
