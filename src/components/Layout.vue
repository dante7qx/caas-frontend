<template>
  <div id="layout">
       <h2>布局，共24格</h2>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark"></div></el-col> 
      <el-col :span="8" :offset="4"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col> 
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col> 
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <!-- 每一栏的间隔，通过 gutter 来指定，默认是0 -->
    <h2 v-text="gutter"></h2>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col> 
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col> 
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col> 
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <!-- 栅格的偏移通过 offset 进行指定 -->
    <h2>{{offset}}</h2>
    <el-row>
      <el-col :span="6" :offset="12"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="3" :offset="3"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="12" :offset="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="2" :offset="1"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :push="12"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <!-- 栅格通过 flex 进行对齐 -->
    <h2>{{flex}}</h2>
    <el-row type="flex" class="row-bg">
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="space-around" align="bottom">
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <h2>响应式布局，xs、sm、md、lg 和 xl</h2>
    <el-row :gutter="20">
      <el-col :xs="6" :sm="6" :md="4" :lg="12" :xl="1"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :xs="6" :sm="6" :md="4" :lg="12" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :xs="6" :sm="6" :md="4" :lg="12" :xl="1"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :xs="6" :sm="6" :md="4" :lg="12" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    data () {
        return {
            msg: '欢迎来到饿了吗 Element UI !',
            gutter: "栅格之间的间距通过 gutter 进行指定，默认是0",
            offset: "栅格之间的偏移通过 offset 进行指定",
            flex: "栅格通过 flex 进行对齐, 将 type 属性赋值为 'flex'，可以启用 flex 布局，\
            并可通过 justify 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。"
        }
    }
}
</script>

<style scoped>
  h1, h2, h3, h4 {
    text-align: center;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .row-bg {
    padding: 10px 0;
    background-color: rgb(199, 236, 144);
  }
</style>
