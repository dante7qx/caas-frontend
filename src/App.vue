<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/layout">Layout</el-menu-item>
      <el-menu-item index="/container">Container</el-menu-item>
      <el-submenu index="3">
        <template slot="title">表单</template>
        <el-menu-item index="/dynacomponent">动态组件</el-menu-item>
        <el-menu-item index="/button">按钮</el-menu-item>
        <el-menu-item index="/date">日期控件</el-menu-item>
        <el-menu-item index="/upload">上传</el-menu-item>
        <el-menu-item index="/cascade">级联选择</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">窗口</template>
          <el-menu-item index="/dialog">对话框</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">表格</template>
        <el-menu-item index="/table">el-ui 表格</el-menu-item>
        <el-menu-item index="/tableform">表格表单</el-menu-item>
      </el-submenu>
      <el-menu-item index="/tree">树</el-menu-item>
      <el-menu-item index="/transfer">穿梭框</el-menu-item>
      <el-menu-item index="/calendar">日历</el-menu-item>
      <el-menu-item index="/otherwiget">其他ELementUI组件</el-menu-item>
      <el-menu-item index="/smalltest">小功能测试</el-menu-item>
      <el-submenu index="5">
        <template slot="title">第三方组件</template>
        <el-menu-item index="/esign">在线签名</el-menu-item>
        <el-menu-item index="/holidaypane">节假日面板</el-menu-item>
        <el-menu-item index="/waterbottom">页面水印</el-menu-item>
        <el-menu-item index="/jsenc">非对称加、解密</el-menu-item>
      </el-submenu>
      
    </el-menu>
    <!--
    <keep-alive>
      <router-view class="main"></router-view>
    </keep-alive>
    -->
    <router-view class="main"></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '欢迎来到CaaS 前端演示',
      activeIndex: '1',
      activeIndex2: '/home'
      
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }
  h1 {
    text-align: center;
  }
  .main {
    height: 1010px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .app-container {
    margin: 15px;
  }
  .dialog-footer {
    text-align: right;
  }
.el-form .el-form-item__content .el-input.is-disabled .el-input__inner {
    border: 0;
    background-color:white;
    color: #606266;
  }
</style>
