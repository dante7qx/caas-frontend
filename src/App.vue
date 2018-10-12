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
        <el-menu-item index="/button">按钮</el-menu-item>
        <el-menu-item index="/form">表单</el-menu-item>
        <el-menu-item index="/date">日期控件</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">窗口</template>
          <el-menu-item index="/dialog">对话框</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/table">表格</el-menu-item>
      <el-menu-item index="/tree">树</el-menu-item>
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
    height: 610px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
