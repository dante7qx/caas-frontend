<template>
  <div id="home">
		<h1>欢迎来到精灵Spirit</h1>
		<div class="IPClass">{{ ipPosition.province + ' - ' + ipPosition.city + ' - ' + ipPosition.ip}}</div>
		<div v-html="info"></div>
  </div>
</template>
<script>
import info from '@/assets/info.txt'

export default {
	data() {
		return {
			info,
			ipPosition: {}
		}
	},
	created() {
		// 字符串压缩、解压
		const LZString = require("lz-string")
		let string ='eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImNhMTY1YzNlLTgzN2UtNDcyNS1hOWMyLTJhNDI4NTU0YTQzNCJ9.mRdjUwZyicT-CluBXyaW-fS_G2Q5eJ1QTBaWw9hes1jxyALkEiXb8GP-1kKqThdBwBnL584BOWhB9k1RfBzZ7Q';
		console.log("样本大小为：" + string.length); //参考：字符长度 20000
		let compressed = LZString.compress(string);
		console.log(compressed)
		console.log("压缩样本的大小为：" + compressed.length); //参考：压缩后字符长度 9800
		string = LZString.decompress(compressed);
		console.log("Sample is：" + string);
	},
	mounted() {
		this.ipPosition = JSON.parse(localStorage.getItem('UserIPPosition'))
	},
	methods: {
		getUserIP(onNewIP) {},
	}
}
</script>
<style scoped>
#home div {
    text-align: center;
}
.IPClass {
	color: #27a8e1;
	font-size: 10px;
}
</style>
