<template>
  <div>
    <h2>在线签名 - https://github.com/JaimeCheng/vue-esign</h2>
    <div>
			<vue-esign ref="esign" :width="800" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" style="border: 1px solid #000000;"/>
			<button @click="handleReset">清空画板</button> 
			<button @click="handleGenerate">生成图片</button>
    </div>
	</div>
</template>
<script>
import vueEsign from 'vue-esign'

export default {
	name: "esign",
	components: { vueEsign },
  data() {
		return {
			lineWidth: 6,
			lineColor: '#000000',
			bgColor: '',
			resultImg: '',
			isCrop: false
		}
  },
	methods: {
		handleReset () {
			this.$refs.esign.reset()
		},
		handleGenerate () {
			this.$refs.esign.generate().then(res => {
				this.resultImg = res
				console.log(this.resultImg)
			}).catch(err => {
				alert(err) // 画布没有签字时会执行这里 'Not Signned'
			})
		}
	}
}
</script>

<style scoped>
div {
	margin: 15px;
}
</style>