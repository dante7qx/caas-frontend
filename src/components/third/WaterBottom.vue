<template>
	<div>
		<h3 style="text-align:center">
			<p>watermark.js是一个给B/S网站系统加水印的插件，确保系统保密性，安全性，降低数据泄密风险。</p>
			<p>简单易上手，支持多属性配置，支持本地和npm包引入，支持commonjs和es6引入。</p>
			<p>全局API有init()，load()，remove()方法。使用的是css3的pointer-events事件穿透属性和opacity透明属性，Shadow DOM(影子DOM)结构进行水印内容封装，随机插入到body下</p>
			<p>水印插件内容，包含1、版本及功能，2、水印插件-使用，3、水印插件-testTool（测试工具），4、内置方法，5、支持各种属性配置使用，等等。</p>
			<p>注意：基于本项目源码从事科研、论文、系统开发，"最好"在文中或系统中表明来自于本项目的内容和创意，否则所有贡献者可能会鄙视你和你的项目。 使用本项目源码请尊重程序员职业和劳动</p>
		</h3>
    <div style="margin-left: 48%">
      <el-link type="success" @click="addWaterMark">添加水印</el-link>
      <el-link type="danger" @click="clearWaterMark">清除水印</el-link>
    </div>

	</div>
</template>
<script>
import watermark from "watermark-dom-plus";

export default {
  name: "WaterMaskPage",
  data() {
    return {
      date: new Date()
    };
  },
  mounted() {
    let that = this
    this.addWaterMark()
    this.timer = setInterval(() => {
      that.date = new Date()
      this.addWaterMark()
    }, 1000)

  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      watermark.remove()
    }
  },
  methods: {
    addWaterMark() {
      watermark.load({
        watermark_txt: "灭陨 " + this.$moment(this.date).format('yyyyMMDD HH:mm:ss'),
        watermark_alpha: 0.3,
        watermark_fontsize: "16px"
      });
    },
    clearWaterMark() {
      watermark.remove();
    }
  }
}
</script>
