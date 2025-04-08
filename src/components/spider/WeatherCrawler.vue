<template>
  <div class="app-container">
    <h2 style="text-align: center;">天气信息</h2>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-table :data="cityList" stripe style="width: 100%; margin-bottom: 15px;" max-height="750" @row-dblclick="queryWeather">
          <el-table-column
            prop="pk.ch"
            label="城市"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pk.en"
            label="拼音"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pk.code"
            label="代码">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="params.keywords" size="mini" placeholder="输入关键字搜索" clearable @change="search"/>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="params.pageSize"
          layout="total, prev, pager, next"
          :total="total"
          style="text-align: center;">
        </el-pagination>
      </el-col>
      <el-col :span="14">
        <el-input
          type="textarea"
          :autosize="{ minRows: 35, maxRows: 35}"
          readonly
          v-model="weatherInfo">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listCity, getCityWeather } from '@/api/spider/weather'
export default {
  name: "WeatherCrawlerPage",
  data() {
    return {
      params: {
        keywords: null,
        pageNo: 1,
        pageSize: 50,
      },
      total: 0,
      cityList: [],
      weatherInfo: ''
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    getCityList() {
      listCity(this.params).then(resp => {
        this.total = resp.totalElements
        this.cityList = resp.content
      })
    },
    search(keywords) {
      this.params.pageNo = 1
      this.params.keywords = keywords
      this.getCityList()
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize
      this.getCityList()
    },
    handleCurrentChange(pageNo) {
      this.params.pageNo = pageNo
      this.getCityList()
    },
    queryWeather(row, column, event) {
      getCityWeather(row.pk.code).then(resp => {
        this.weatherInfo = resp.data

      })
    }
  }
}
</script>

<style scoped>

</style>
