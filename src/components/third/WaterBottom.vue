<template>
	<div>
		<h3 style="text-align:center">
			<p>watermark.js是一个给B/S网站系统加水印的插件，确保系统保密性，安全性，降低数据泄密风险。</p>
			<p>简单易上手，支持多属性配置，支持本地和npm包引入，支持commonjs和es6引入。</p>
			<p>全局API有init()，load()，remove()方法。使用的是css3的pointer-events事件穿透属性和opacity透明属性，Shadow DOM(影子DOM)结构进行水印内容封装，随机插入到body下</p>
			<p>水印插件内容，包含1、版本及功能，2、水印插件-使用，3、水印插件-testTool（测试工具），4、内置方法，5、支持各种属性配置使用，等等。</p>
			<p>注意：基于本项目源码从事科研、论文、系统开发，"最好"在文中或系统中表明来自于本项目的内容和创意，否则所有贡献者可能会鄙视你和你的项目。 使用本项目源码请尊重程序员职业和劳动</p>
		</h3>
	</div>
</template>
<script>
import watermark from "watermark-dom";

export default {
  name: "AppMain",
  mounted() {
    watermark.load({ watermark_txt: "Hello 水印" });
  }
}
</script>