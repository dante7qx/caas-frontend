<template>
	<div>
		<el-calendar v-model="curDate">
			<template
				slot="dateCell"
				slot-scope="{data}">
					<div :class="data.isSelected ? 'is-selected' : ''" @click.prevent.stop="calendarOnClick(data)">
						{{ data.day.split('-').slice(2).join('-') }} 
					</div>
					<div style="display: flex;" > 
						<div v-for="item in clockList" :key="item.id" style="margin-right: 5px;">
							<el-tag type="success" effect="dark" v-if="item.day === data.day" @click.prevent.stop="clockStatusOnClick(item)">
								{{ item.status }}
							</el-tag>
						</div>
					</div>
      </template>
		</el-calendar>
		<el-row>
			<el-col :offset="12">
				<el-button type="danger">{{queryDate}}</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			curDate: new Date(),
			queryDate: '',
			clockList: [
				{
					id: 1,
					day: '2022-04-15',
					status: '请假'
				},
				{
					id: 2,
					day: '2022-04-15',
					status: '出差'
				},
				{
					id: 3,
					day: '2022-04-16',
					status: '迟到'
				},
				{
					id: 4,
					day: '2022-04-17',
					status: '早退'
				}
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
      });

			// 点击下一月
			let nextBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        console.log('下个月头天: ' + this.curDate);
      });

			//点击今天
      let todayBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      todayBtn.addEventListener("click", () => {
        console.log('今天: ' + this.curDate);
      });
		})
	},
	methods: {
		calendarOnClick(data) {
			this.queryDate = data.day
		},
		clockStatusOnClick(bizData) {
			this.queryDate = '业务数据【' + bizData.id + '】' + bizData.status;
		},
	}
}
</script>