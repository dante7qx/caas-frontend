<template>
  <div class="app-container">
    <el-container>
      <el-aside width="45%">
        <h2 style="text-align: center;">文本</h2>
        <el-input v-model="modityTxt" type="textarea" style="width: 100%;" :rows="20" resize="none" />
        <div style="margin-top: 15px; text-align: right;">
          <el-button type="primary" @click="diffHtml">保存<i class="el-icon-success el-icon--right"></i></el-button>
        </div>
      </el-aside>
      <el-main>
        <h2 style="text-align: center;">修改痕迹</h2>
        <div v-for="(item, index) in revisionMark" key="index">
          <span v-html="item" class="diff-html-text"></span>
          <el-divider></el-divider>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import htmldiff from './htmldiff.js'
export default {
  name: 'DiffHtml',
  data () {
    return {
      inputTxt: `
      STUN（Session Traversal Utilities for NAT）和TURN（Traversal Using Relays around NAT）是两种用于解决NAT（Network Address Translation）问题的协议。

NAT是一种网络技术，用于连接私有网络到公共网络。然而，NAT会影响网络连接的可靠性和速度，尤其是在实时通信场景下，如视频会议、实时语音、游戏、直播等。

STUN是一种协议，用于检测NAT类型和IP地址。当两台设备（如计算机或手机）在不同的网络环境中，STUN可以帮助它们交换IP地址信息，以建立P2P直接连接，避免使用中继或服务器。STUN服务通常是由一些STUN服务器提供的。

但是，有时候STUN可能无法帮助客户端建立P2P连接，因为NAT会阻止P2P消息的传输。这时候就需要使用TURN协议，TURN是一种中继（relay）技术，可以帮助端到端连接的两个设备之间建立一个中继节点来传输消息，以实现可靠的实时通信。中继节点可以是一个TURN服务器或其他的中转设备。TURN服务通常由一些TURN服务器提供。

总的来说，STUN和TURN是两种用于解决NAT问题的重要协议，它们为实时通信场景提供了一些必要的技术支持，使得实时通信更加可靠和高效。
      `,
      modityTxt: '',
      revisionMark: []
    }
  },
  created () {
    this.modityTxt = this.inputTxt
  },
  methods: {
    diffHtml() {
      if(this.inputTxt) {
        this.revisionMark.push(htmldiff.until.getHTMLDiff(this.modityTxt, this.inputTxt))
        this.inputTxt = this.modityTxt
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
