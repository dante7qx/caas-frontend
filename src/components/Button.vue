<template>
  <div id="button">
    <h2>使用type、plain和round属性来定义 Button 的样式。</h2>
    <div>
      <el-button @click="enable = !enable">默认按钮</el-button>
      <el-button type="primary" :disabled="enable">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    <div>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </div>
    <div>
      <el-button round plain>圆形按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </div>
    <div>
      <el-button type="text">文字按钮</el-button>
      <el-button type="text" :disabled="enable">文字按钮</el-button>
    </div>
    <div>
      <h3>{{icoButton}}</h3>
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share" size="medium"></el-button>
      <el-button type="danger" plain icon="el-icon-delete" size="small"></el-button>
      <el-button type="primary" icon="el-icon-search" size="mini">搜素</el-button>
      <el-button type="primary">上传 <i class="el-icon-upload"></i></el-button>
      <el-button type="primary" :loading="enable">加载中</el-button>
    </div>
    <el-button-group>
      <h3>按钮组</h3>
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
    <div>
      <h3>ICON图标</h3>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-upload"></i>
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          icoButton: '图标按钮',
          enable: true
      }
  }
}
</script>

<style scoped>
div {
    margin: 15px;
}
</style>

