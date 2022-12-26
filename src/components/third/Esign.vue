<template>
  <div>
    <h2>在线签名 - https://github.com/JaimeCheng/vue-esign</h2>
		<h4 :style="styleObject" @click="changeColor">随机码：{{ randomCode }}</h4>
    <div>
			<vue-esign ref="esign" :width="800" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" style="border: 1px solid #000000;"/>
			<button @click="handleReset">清空画板</button> 
			<button @click="handleGenerate">生成图片</button>
			<el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" v-model="resultImg" />
    </div>
	</div>
</template>

<script>
import vueEsign from 'vue-esign'
import { nanoid } from 'nanoid'

export default {
	name: "esign",
	components: { vueEsign },
  data() {
		return {
			lineWidth: 6,
			lineColor: '#000000',
			bgColor: '',
			resultImg: '',
			isCrop: false,
			styleObject: {
				color: 'green',
			}
		}
  },
	computed: { 
		randomCode() {
			return `nanoId: ${nanoid()}  uuid: ${this.uuid()}`
		},
	},
	methods: {
		handleReset () {
			this.$refs.esign.reset()
		},
		handleGenerate () {
			this.$refs.esign.generate().then(res => {
				this.resultImg = res
			}).catch(err => {
				alert(err) // 画布没有签字时会执行这里 'Not Signned'
			})
		},
		changeColor() {
			this.styleObject.color = this.$randomColor();
		}
	}
}
</script>

<style scoped>
div {
	margin: 15px;
}
</style>