<template>
  <div class="app-container">
		<el-form ref="form" :model="form" label-width="80px" :disabled="this.form.editable === 0">
			<el-form-item label="名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
      <el-form-item label="店铺">
				<el-input v-model="form.shop"></el-input>
			</el-form-item>
			<el-form-item label="单选">
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" v-if="this.form.editable === 1">确 定</el-button>
			<el-button @click="cancel">取 消</el-button>
		</div>
	</div>
</template>
<script>
  export default {
		name: "detail",
		props: {
			data: {
				type: Object,
				required: true,
				default: {}
			}
		},
		data() {
			return {
				form: {},
        radio: '1'
			}
		},
		created() {
			this.form = this.data;
		},
		methods: {
			submit() {
				if(this.data.id) {
					console.log('--------' + this.data.id)
				} else {
					console.log('---------' + this.uuid())
				}
			},
			cancel() {
				this.form = {};
				this.$emit('closeWindow');
			}
		}
	}
</script>

