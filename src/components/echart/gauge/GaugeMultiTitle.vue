<template>
  <div>
    <div ref="chartCanvas" :style="chartStyle"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

export default {
  name: "GaugeMultiTitle",
  props: {
    width: {
      type: String,
      required: false,
      default: '500px'
    },
    height: {
      type: String,
      required: false,
      default: '500px'
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
    setInterval(function () {
      that.data[0].value = +(Math.random() * 100).toFixed(2);
      that.data[1].value = +(Math.random() * 100).toFixed(2);
      that.data[2].value = +(Math.random() * 100).toFixed(2);
      myChart.setOption({
        series: [
          {
            data: that.data
          }
        ]
      });
    }, 2000);
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
          value: 20,
          name: 'Good',
          title: {
            offsetCenter: ['-40%', '80%']
          },
          detail: {
            offsetCenter: ['-40%', '95%']
          }
        },
        {
          value: 40,
          name: 'Better',
          title: {
            offsetCenter: ['0%', '80%']
          },
          detail: {
            offsetCenter: ['0%', '95%']
          }
        },
        {
          value: 60,
          name: 'Perfect',
          title: {
            offsetCenter: ['40%', '80%']
          },
          detail: {
            offsetCenter: ['40%', '95%']
          }
        }
      ]
    },
    fillOption() {
      this.option = {
        series: [
          {
            type: 'gauge',
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                color: '#FAC858'
              }
            },
            pointer: {
              icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
              width: 8,
              length: '80%',
              offsetCenter: [0, '8%']
            },
            progress: {
              show: true,
              overlap: true,
              roundCap: true
            },
            axisLine: {
              roundCap: true
            },
            data: this.data,
            title: {
              fontSize: 14
            },
            detail: {
              width: 40,
              height: 14,
              fontSize: 14,
              color: '#fff',
              backgroundColor: 'inherit',
              borderRadius: 3,
              formatter: '{value}%'
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
