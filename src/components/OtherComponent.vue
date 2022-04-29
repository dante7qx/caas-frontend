<template>
  <div>
   	<h2>Notification 通知</h2>
		<el-button plain @click="open1">成功</el-button>
		<el-button plain @click="open2">警告</el-button>
		<el-button plain @click="open3">消息</el-button>
		<el-button plain @click="open4">错误</el-button>
		<el-button plain @click="open5">自定义</el-button>
		<h2>Loading 加载</h2>
		<div ref="loadingEmpty" style="border:1px solid #000000;" @click="showLoading">
			<el-empty description="空状态"></el-empty>
		</div>
		<el-tooltip placement="top">
			<div slot="content">多行信息<br/>第二行信息</div>
			<h2 style="width: 130px;">步骤条</h2>
		</el-tooltip>
		<el-steps :active="1" simple>
			<el-step title="步骤 1" icon="el-icon-edit"></el-step>
			<el-step title="步骤 2" icon="el-icon-upload"></el-step>
			<el-step title="步骤 3" icon="el-icon-picture"></el-step>
		</el-steps>
		<el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
			<el-step title="步骤 1" ></el-step>
			<el-step title="步骤 2" ></el-step>
			<el-step title="步骤 3" ></el-step>
		</el-steps>
		<h2>走马灯</h2>
		<el-carousel :interval="4000" type="card" height="200px">
			<el-carousel-item v-for="item in 6" :key="item">
				<h3 class="medium">{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
		<h2>InfiniteScroll 无限滚动</h2>
		<ul class="infinite-list" v-infinite-scroll="infiniteScrollLoad" style="height: 280px; overflow:auto">
			<li :key="i" v-for="i in count" class="infinite-list-item">{{ i }}</li>
		</ul>
	<div style="height: 100px;"></div>
	</div>
</template>
<script>

export default {
	name: "OtherWiget",
  data() {
		return {
			count: 0
		}
  },
	methods: {
		open1() {
			this.$notify({
				title: '成功',
				message: '这是一条成功的提示消息',
				type: 'success'
			});
		},
		open2() {
			this.$notify({
				title: '警告',
				message: '这是一条警告的提示消息',
				type: 'warning'
			});
		},
		open3() {
			this.$notify.info({
				title: '消息',
				message: '这是一条消息的提示消息'
			});
		},
		open4() {
			this.$notify.error({
				title: '错误',
				message: '这是一条错误的提示消息'
			});
		},
		open5() {
			const h = this.$createElement;
			this.$notify({
				title: '待办记录',
				message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'),
				position: 'bottom-right',
				showClose: false,
				duration: 1000,
				offset: 200
			});
		},
		showLoading() {
			const loading = this.$loading({
				lock: true,
				text: '拼命加载中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)',
				target: this.$refs.loadingEmpty
			});
			setTimeout(() => {
				loading.close();
			}, 2000);
		},
		infiniteScrollLoad() {
			this.count += 2
		}
	}
}
</script>

<style scoped>
div {
	margin: 15px;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>