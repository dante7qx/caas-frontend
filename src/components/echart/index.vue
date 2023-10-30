<template>
  <div class="app-container">
    <h2 style="text-align: center;">Apache Echarts — <a href="https://echarts.apache.org/zh/index.html" target="_blank">https://echarts.apache.org/zh/index.html</a></h2>
    <el-collapse v-model="activeChart" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          折线图 <i class="el-icon-data-line"></i>
        </template>
        <line-polar2 class="chart-component" />
        <line-area-stack class="chart-component" />
        <line-share-data class="chart-component" />
        <line-stack class="chart-component" />
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          柱状图 <i class="el-icon-s-data"></i>
        </template>
        <bar-basic class="chart-component" />
        <bar-y-category class="chart-component" />
        <mix-line-bar class="chart-component" />
        <bar-series-layout class="chart-component" />
        <mix-bar-pie class="chart-component" />
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          饼图 <i class="el-icon-s-help"></i>
        </template>
        <pie-basic class="chart-component" />
        <pie-doughnut class="chart-component" />
        <pie-half-donut class="chart-component" />
        <pie-scroll class="chart-component" />
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          仪表盘 <i class="el-icon-help"></i>
        </template>
        <gauge-basic class="chart-component" />
        <gauge-speed class="chart-component" />
        <gauge-stage class="chart-component" />
        <gauge-multi-title class="chart-component" />
        <gauge-barometer class="chart-component" />
        <gauge-clock class="chart-component" />
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          K线图 <i class="el-icon-s-operation"></i>
        </template>
        <k-line-stock class="chart-component" :width="kLineWidth" height="500px" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import LinePolar2 from "./line/LnePolar2"
import LineStack from "./line/LineStack"
import LineAreaStack from "./line/LineAreaStack"
import lineShareData from "./line/LineShareData"
import BarBasic from "./bar/BarBasic"
import BarYCategory from "./bar/BarYCategory"
import MixLineBar from "./bar/MixLineBar"
import MixBarPie from "./bar/MixBarPie"
import BarSeriesLayout from "./bar/BarSeriesLayout"
import PieBasic from "./pie/PieBasic"
import KLineStock from "./k/KLineStock"
import PieDoughnut from "./pie/PieDoughnut"
import PieHalfDonut from "./pie/PieHalfDonut"
import PieScroll from "./pie/PieScroll"
import GaugeBasic from "./gauge/GaugeBasic"
import GaugeSpeed from "./gauge/GaugeSpeed"
import GaugeStage from "./gauge/GaugeStage"
import GaugeMultiTitle from "./gauge/GaugeMultiTitle"
import GaugeBarometer from "./gauge/GaugeBarometer"
import GaugeClock from "./gauge/GaugeClock"

export default {
  name: "EchartsPage",
  components: {
    KLineStock, LinePolar2, lineShareData, LineStack, LineAreaStack,
    BarBasic, BarYCategory, MixLineBar, MixBarPie, BarSeriesLayout,
    PieBasic, PieDoughnut, PieHalfDonut, PieScroll,
    GaugeBasic, GaugeSpeed, GaugeStage, GaugeMultiTitle, GaugeBarometer, GaugeClock
  },
  data() {
    return {
      activeChart: '1',
      kLineWidth: `${document.documentElement.clientWidth}` - 50 + 'px'
    }
  },
  created() {
    console.log(this.kLineWidth)
  }
}
</script>

<style scoped>
.chart-component {
  margin-bottom: 20px;
  display: inline-block;
  float: left;
  clear: right;
}
</style>
