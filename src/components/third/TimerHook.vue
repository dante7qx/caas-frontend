<template>
  <div style="margin: 10px;">
    <h2>倒计时组件 — https://vac.js.org/</h2>
		<countdown :end-time="nextTime">
			<template v-slot:process="anyYouWantedScopName">
				<span>{{ `倒计时: ${anyYouWantedScopName.timeObj.ceil.s} 秒` }}</span>
			</template>
			<template v-slot:finish>
				<span @click="genTimer">重新发送</span>
			</template>
		</countdown>
  </div>
</template>
<script>
export default {
	name: "TimerHook",
	data() {
		return {
			timeCount: new Date().getTime() + 10000
		}
  },
	computed: {
		nextTime() {
			return this.timeCount
		}
	},
	created() {
		console.log(this.$moment())
	},
	methods: {
		genTimer () {
			this.timeCount = new Date().getTime() + 10000
		}
	}
}
</script>