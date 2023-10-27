<template>
  <div class="dialog">
    <div>
      <el-button type="success" plain @click="dialogFormVisible=true">弹出表单</el-button>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form ref="xForm" :model="form">
        <el-form-item prop="name" :label-width="formLabelWidth" @click.native="reset">
          <span slot="label"><el-link type="danger">活动名称</el-link></span>
          <el-input v-model="form.name" auto-complete="off" placeholder="Form-Item Slot 自定义label内容" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    reset() {
      this.$refs.xForm.resetFields();
    },
    confirm() {
      this.$confirm('确认保存？')
        .then(ok => {
          this.dialogFormVisible = false;
          this.form = {};
        })
        .catch(cancel => {
          console.log(cancel);
        });
    }
  }
}
</script>

<style scoped>
  .dialog {
    margin: 10px;
  }
</style>
