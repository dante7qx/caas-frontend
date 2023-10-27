<template>
	<div class="app-container"> 
    <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
      <div v-for="(v,i) in formInline.formList" :key="i">
        <el-form-item label="demo1" :prop="'formList.'+i+'.user'" :rules="{ required: true,message: '必填字段不能为空'}">
          <el-input v-model="v.user" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="demo2" :prop="'formList.'+i+'.phone'" :rules="[{ required: true,message: '必填字段不能为空'},{ pattern:/^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }]">
          <el-input v-model="v.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="i===0" type="primary" @click="add()">添加</el-button>
          <el-button v-else type="danger" @click="dels(v,i)">删除</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button type="primary" @click="onSubmit()">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
	name: "DynaFormPage",
	data() {
    return {
      formInline: {
        formList: [
					{
						user: '',
						phone: ''
					}
        ]
      }
		}
	},
	methods: {
		add() {
      this.formInline.formList.push({
        user: '',
        phone: ''
      })
    },
		dels(v, i) {
      if (this.formInline.formList.indexOf(v) > -1) {
        this.formInline.formList.splice(i, 1)
      }
    },
		onSubmit() {
			console.log(this.formInline.formList)
		}
	}
}
</script>
