<template>
  <div class="app-container">
    <el-container>
      <el-header style="text-align: center;">
        <h1>文本差异化比对 — https://github.com/dfoverdx/htmldiff-js</h1>
      </el-header>
      <el-container>
      <el-aside width="45%">
        <h2 style="text-align: center;">文本</h2>
        <el-input v-model="inputTxt" type="textarea" style="width: 100%;" :rows="20" resize="none" />
        <div style="margin-top: 15px; text-align: right;">
          <el-button type="primary" @click="diffHtml">保存<i class="el-icon-success el-icon--right"></i></el-button>
        </div>
      </el-aside>
      <el-main>
        <h2 style="text-align: center;">修改痕迹</h2>
        <div v-for="(item, index) in revisionMark" :key="index">
          <span v-html="item" class="diff-html-text"></span>
          <el-divider></el-divider>
        </div>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HtmlDiff from './htmldiff.js'
export default {
  name: 'DiffHtml',
  data () {
    return {
      inputTxt: `
      STUN是一种协议，用于检测NAT类型和IP地址。当两台设备（如计算机或手机）在不同的网络环境中，STUN可以帮助它们交换IP地址信息，以建立P2P直接连接，避免使用中继或服务器。STUN服务通常是由一些STUN服务器提供的。
      `,
      modifyTxt: '',
      revisionMark: []
    }
  },
  created () {
    this.modifyTxt = this.inputTxt
  },
  methods: {
    diffHtml() {
      if(this.inputTxt) {
        this.revisionMark.push(HtmlDiff.execute(this.modifyTxt, this.inputTxt))
        this.modifyTxt = this.inputTxt
      }
    }
  }
}
</script>

<style>
.diff-html-text ins {
    background-color: #cfc;
    text-decoration: none;
}

.diff-html-text del {
  color: #999;
  background-color: #FEC8C8;
}
</style>
