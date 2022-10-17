<template>
	<div style="margin-top: 15px;">
		<el-row>
			<el-col :span="12" :offset="6">
				<h2 style="margin-left: 200px;">官网：https://gitee.com/flxe/Vue-Tree-Chart</h2>
				<div style="text-align: right;">
					<label>切换为竖向</label>
					<el-checkbox v-model="vertical" @change="checkSwitch"></el-checkbox>
				</div>
				<TreeChart :json="treeData" />
			</el-col>
		</el-row>
	</div>
</template>

<script>
import TreeChart from "vue-tree-chart";
import imageUrl from "../../assets/logo.png"

export default {
	name: "TreeChartPage",
	components: {
    	TreeChart
	},
	data() {
		return {
			vertical: false,
			treeData: {
				name: 'root',
				image_url: imageUrl,
				class: ["rootNode"],
				children: [
					{
						name: 'children1',
						image_url: imageUrl
					},
					{
						name: 'children2',
						image_url: imageUrl,
						mate: [{
							name: 'mate',
							image_url: imageUrl
						}],
						children: [
							{
								name: 'grandchild',
								image_url: imageUrl
							},
							{
								name: 'grandchild2',
								image_url: imageUrl
							},
							{
								name: 'grandchild3',
								image_url: imageUrl
							}
						]
					},
					{
						name: 'children3',
						image_url: imageUrl
					}
				]
			}
		}
	},
	methods: {
		checkSwitch(val) {
			console.log('=======>', val)
		}
	}
}
</script>