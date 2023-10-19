<template>
  <div class="app-container">
    <h2 style="text-align:center;">LaTex 数学公式（有问题，待修复）</h2>
    <el-form label-width="80px">
      <el-form-item label="MathML">
        <el-input type="textarea" v-model="mathML" :autosize="{ minRows: 6, maxRows: 10}" resize="none" ></el-input>
      </el-form-item>
      <el-form-item label="LaTex">
        <el-input type="textarea" v-model="laTeX" :autosize="{ minRows: 6, maxRows: 10}" resize="none" readonly></el-input>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary" @click="convertLaTeX">转换</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import mathml2latex from "mathml2latex";

export default {
  name: 'LaTeXPage',
  data() {
    return {
      mathML: '',
      laTeX: ''
    }
  },
  methods: {
    convertLaTeX() {
      if(this.mathML) {
        console.log(this.mathML)
        this.laTeX = mathml2latex(this.mathML)
      }
    }
  }
}
</script>
