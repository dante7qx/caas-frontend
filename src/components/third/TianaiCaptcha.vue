<template>
  <div class="app-container">
    <h2 style="text-align: center;">行为二维码 - http://doc.captcha.tianai.cloud/</h2>
    <h3 style="text-align: center;">待验证 - 不支持Springboot3</h3>
    <img alt="" :src="captchaImageUrl" @click="refreshCaptcha" />
    <input v-model="captchaInput">
    <button @click="verifyCaptcha">验证</button>
  </div>
</template>

<script>
import { generate } from '@/api/tianai/index'

export default {
  name: "TianaiCaptcha",
  data() {
    return {
      captchaImageUrl: "",
      captchaInput: ""
    }
  },
  mounted() {
    this.refreshCaptcha();
  },
  created() {
  },
  methods: {
    refreshCaptcha() {
        generate().then(res => {
          console.log(res)

        }).catch(() => {});


    },
    async verifyCaptcha() {
      try {
        const res = await axios.post("/captcha/verify", { code: this.captchaInput });
        console.log(res.data.success ? "验证成功" : "验证失败");
      } catch (error) {
        console.error("验证码验证失败", error);
      }
    }
  }
}
</script>

<style scoped>

</style>
