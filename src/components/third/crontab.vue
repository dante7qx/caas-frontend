<template>
	<div>
		<div class="box">
			<el-input v-model="input" placeholder class="inp"></el-input>
			<el-button type="primary" @click="showDialog">生成 cron</el-button>
		</div>
		<el-dialog title="生成 cron" :visible.sync="showCron">
			<vcrontab @hide="showCron=false" @fill="crontabFill" :expression="expression"></vcrontab>
		</el-dialog>
	</div>
</template>

<script>
import vcrontab from 'vcrontab'
export default {
	components: { vcrontab },
	data() {
		return {
			input: "",
			expression: "",
			showCron: false
		};
	},
	methods: {
			crontabFill(value) {
					//确定后回传的值
					this.input = value;
			},
			showDialog() {
					this.expression = this.input;//传入的 cron 表达式，可以反解析到 UI 上
					this.showCron = true;
			}
	}
};
</script>
<style scoped>
.box {
	margin: 15px;
}
</style>