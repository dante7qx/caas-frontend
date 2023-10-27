<template>
  <div>
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      v-model="value"
      :data="data">
    </el-transfer>
  </div>
</template>
<script>
export default {
  data() {
    const generateData = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  }
}
</script>

<style scoped>
div {
    margin: 15px;
}
</style>
<style>
.el-transfer-panel__body{
  height: 300px;
}
.el-transfer-panel__list.is-filterable{
  height: 300px;
} 
</style>

