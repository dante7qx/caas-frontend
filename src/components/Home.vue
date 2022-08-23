<template>
  <div id="home">
		<h1>欢迎来到 CaaS 容器云</h1>
		<div class="IPClass">{{ ipPosition.province + ' - ' + ipPosition.city + ' - ' + ipPosition.ip}}</div>
		<div v-html="info"></div>
  </div>
</template>
<script>
import info from '../assets/info.txt'

export default {
	data() {
		return {
			info,
			ipPosition: {}
		}
	},
	mounted() {
		this.ipPosition = JSON.parse(localStorage.getItem('UserIPPosition'))
	},
	methods: {
		getUserIP(onNewIP) {}
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