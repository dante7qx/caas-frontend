<template>
  <div class="app-container" id="latexPage">
    <h2 style="text-align:center;">LaTex 数学公式 — <a href="https://www.latexlive.com">在线LaTex</a></h2>
    <el-form label-width="80px">
      <el-form-item label="MathML">
        <el-input type="textarea" v-model="mathML" :autosize="{ minRows: 6, maxRows: 10}" resize="none" ></el-input>
      </el-form-item>
      <el-form-item label="LaTex">
        <el-input type="textarea" v-model="laTeX" :autosize="{ minRows: 6, maxRows: 10}" resize="none" readonly></el-input>
      </el-form-item>
      <el-form-item label="公式">
        <math-jax :latex="laTeX" :block="true"></math-jax>
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
      mathML: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mtable columnspacing="1em" rowspacing="4pt">    <mtr>      <mtd>        <mi>S</mi>        <mo>=</mo>        <mrow data-mjx-texclass="ORD">          <mrow data-mjx-texclass="OPEN">            <mo minsize="1.2em" maxsize="1.2em">(</mo>          </mrow>          <mfrac linethickness="0">            <mi>N</mi>            <mi>n</mi>          </mfrac>          <mrow data-mjx-texclass="CLOSE">            <mo minsize="1.2em" maxsize="1.2em">)</mo>          </mrow>        </mrow>        <mo>,</mo>        <msub>          <mi>A</mi>          <mrow>            <mi>k</mi>          </mrow>        </msub>        <mo>=</mo>        <mrow data-mjx-texclass="ORD">          <mrow data-mjx-texclass="OPEN">            <mo minsize="1.2em" maxsize="1.2em">(</mo>          </mrow>          <mfrac linethickness="0">            <mi>M</mi>            <mi>k</mi>          </mfrac>          <mrow data-mjx-texclass="CLOSE">            <mo minsize="1.2em" maxsize="1.2em">)</mo>          </mrow>        </mrow>        <mo>&#x22C5;</mo>        <mrow data-mjx-texclass="ORD">          <mrow data-mjx-texclass="OPEN">            <mo minsize="1.2em" maxsize="1.2em">(</mo>          </mrow>          <mfrac linethickness="0">            <mrow>              <mi>N</mi>              <mo>&#x2212;</mo>              <mi>M</mi>            </mrow>            <mrow>              <mi>n</mi>              <mo>&#x2212;</mo>              <mi>k</mi>            </mrow>          </mfrac>          <mrow data-mjx-texclass="CLOSE">            <mo minsize="1.2em" maxsize="1.2em">)</mo>          </mrow>        </mrow>      </mtd>    </mtr>    <mtr>      <mtd>        <mi>P</mi>        <mrow data-mjx-texclass="INNER">          <mo data-mjx-texclass="OPEN">(</mo>          <msub>            <mi>A</mi>            <mrow>              <mi>k</mi>            </mrow>          </msub>          <mo data-mjx-texclass="CLOSE">)</mo>        </mrow>        <mo>=</mo>        <mfrac>          <mrow>            <mrow data-mjx-texclass="ORD">              <mrow data-mjx-texclass="OPEN">                <mo minsize="1.2em" maxsize="1.2em">(</mo>              </mrow>              <mfrac linethickness="0">                <mi>M</mi>                <mi>k</mi>              </mfrac>              <mrow data-mjx-texclass="CLOSE">                <mo minsize="1.2em" maxsize="1.2em">)</mo>              </mrow>            </mrow>            <mo>&#x22C5;</mo>            <mrow data-mjx-texclass="ORD">              <mrow data-mjx-texclass="OPEN">                <mo minsize="1.2em" maxsize="1.2em">(</mo>              </mrow>              <mfrac linethickness="0">                <mrow>                  <mi>N</mi>                  <mo>&#x2212;</mo>                  <mi>M</mi>                </mrow>                <mrow>                  <mi>n</mi>                  <mo>&#x2212;</mo>                  <mi>k</mi>                </mrow>              </mfrac>              <mrow data-mjx-texclass="CLOSE">                <mo minsize="1.2em" maxsize="1.2em">)</mo>              </mrow>            </mrow>          </mrow>          <mrow data-mjx-texclass="ORD">            <mrow data-mjx-texclass="OPEN">              <mo minsize="1.2em" maxsize="1.2em">(</mo>            </mrow>            <mfrac linethickness="0">              <mi>N</mi>              <mi>n</mi>            </mfrac>            <mrow data-mjx-texclass="CLOSE">              <mo minsize="1.2em" maxsize="1.2em">)</mo>            </mrow>          </mrow>        </mfrac>      </mtd>    </mtr>  </mtable></math>`,
      laTeX: ''
    }
  },
  methods: {
    convertLaTeX() {
      if(this.mathML) {
        console.log(this.mathML)
        this.laTeX = mathml2latex.convert(this.mathML)
      }
    }
  }
}
</script>
