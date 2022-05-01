<template>
	<div>
		<h3 style="margin-left: 20px;">假日API地址： http://timor.tech/api/holiday</h3>
		<el-calendar v-model="curDate">
			<template
				slot="dateCell"
				slot-scope="{data}">
					<div :class="data.isSelected ? 'is-selected' : ''">
						{{ data.day.split('-').slice(2).join('-') }}  {{ data.isSelected ? '✔️' : ''}}
					</div>
					<div style="display: flex;" > 
						<div v-for="item in clockList" :key="item.day" style="margin-right: 5px;">
							<el-tag :type="item.holiday ? 'success' : 'danger'" effect="dark" v-show="item.day === data.day.split('-').slice(1).join('-')">
								{{ item.label }}
							</el-tag>
						</div>
					</div>
      </template>
		</el-calendar>
	</div>
</template>

<script>
export default {
	name: "HolidayPane",
	data() {
		return {
			API_URI: 'http://timor.tech/api/holiday/year/',
			curDate: new Date(),
			queryDate: '',
			clockList: [
			]
		}
	},
	created() {
		this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", e => {
        console.log('上个月头天: ' + this.curDate);
				this.getMonthDayStatus(this.curDate)
      });
			// 点击下一月
			let nextBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        console.log('下个月头天: ' + this.curDate);
				this.getMonthDayStatus(this.curDate)
      });
			//点击今天
      let todayBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      todayBtn.addEventListener("click", () => {
        console.log('今天: ' + this.curDate);
				this.getMonthDayStatus(this.curDate)
      });
		})
		this.getMonthDayStatus(this.curDate)
	},
	methods: {
		getMonthDayStatus(queryDate) {
			const queryMonth = this.$moment(queryDate).format('YYYY-MM')
			fetch(`${this.API_URI}${queryMonth}`)
				.then(response => response.json())
				.then(data => {
					if(data.code === 0) {
						this.resp2data(data.holiday)
					}
				});
		},
		resp2data(obj) {
			this.clockList = []
			for (const [key, val] of Object.entries(obj)) {
				this.clockList.push({day: key, holiday: val.holiday, label: val.name})
			}
		}
	}
}
</script>