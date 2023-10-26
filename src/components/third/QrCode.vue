<template>
  <div class="app-container">
    <h2 style="text-align: center;">Vue端二维码 — https://github.com/Binaryify/vue-qr</h2>
    <el-divider></el-divider>
    <vue-qr qid="qrid1" :callback="qrBack" :text="qrText" :size="sizeValue" :colorDark="colorValue" :logoSrc="logoSrc" ></vue-qr>
    <el-divider></el-divider>
    <div>
      <el-input
        v-model="qrText"
        :rows="2"
        type="textarea"
        placeholder="请输入二维码的文本或链接等"
        style="width:500px;"
      />
    </div>
    <div>
      <span style="margin-left: 20px;">尺寸</span>
      <el-select style="width:100px;margin-left: 10px;" v-model="sizeValue" class="m-2" placeholder="Select" size="default">
        <el-option
          v-for="item in sizeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span style="margin-left: 20px;margin-right: 10px;">颜色</span>
      <el-color-picker v-model="colorValue" style="margin-left: 10px;" />
      <span style="margin-left: 20px;">Logo</span>
      <input v-if="logoSrc.length === 0" style="margin-left: 10px;width: 180px;" type="file" ref="hiddenfile" accept="image/*" @change="handleLogoFile" class="hiddenInput"/>
      <button v-else style="margin-left: 10px;" @click="clearLogoFile" >清空Logo</button>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  name: 'QrCodePage',
  components: { VueQr },
  data () {
    return {
      qrText: '',
      sizeOptions: [
        {
          value: 100,
          label: '100',
        },
        {
          value: 200,
          label: '200',
        },
        {
          value: 400,
          label: '400',
        },
        {
          value: 600,
          label: '600',
        },
        {
          value: 800,
          label: '800',
        },
      ],
      sizeValue: 400,
      colorValue: '#000000',
      logoSrc: ''
    }
  },
  methods: {
    qrBack(dataUrl, id) {
      console.log(id);
    },
    handleLogoFile(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>{
        // console.log(reader)
        this.logoSrc = reader.result;

      }
    },
    clearLogoFile() {
      this.logoSrc = ''
    }
  }
}
</script>
