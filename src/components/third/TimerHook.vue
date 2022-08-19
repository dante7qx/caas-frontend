<template>
  <div style="margin: 10px;">
    <h2>倒计时组件 — https://vac.js.org/</h2>
		<countdown :end-time="new Date().getTime() + 10000">
			<template
				v-slot:process="anyYouWantedScopName">
					<span>{{ `倒计时: ${anyYouWantedScopName.timeObj.ceil.s} 秒` }}</span>
				</template>
			<template
				v-slot:finish>
					<span>重新发送</span>
			</template>
		</countdown>
  </div>
</template>
<script>
export default {
	name: "TimerHook",
	data() {
		return {
			
		}
  },
	computed: { 
		timeCount() {
			return ''
		},
	},
	created() {
		console.log(this.$moment())
	},
	methods: {
		genTimer () {
			
		},
		
	}
}
</script>