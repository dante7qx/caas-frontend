<template>
  <div class="app-container">
    <div style="text-align: center;">
      <el-link href="https://openai.com" :underline="false"><h2>OpenAI</h2></el-link>
      <label> - </label>
      <el-link href="https://chat.openai.com/chat" :underline="false"><h2>ChatGPT</h2></el-link>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="tabLabel">{{ tab.text }}</div>
        <div class="chatContent">
          <el-card class="box-card" :body-style="{ 'background-color': '#444654', 'color': '#fff' }" v-for="item in textList" :key="item.id">
            <div slot="header" class="clearfix">
              <span v-html="item.question"></span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="del(item.id, 1)">删除</el-button>
            </div>
            <div class="text item">
              {{ item.answer }}
            </div>
          </el-card>
        </div>
        <div class="chatInput" 
          v-loading="loadingText"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgb(84,92,99)">
          <el-input v-model="chatText" @keyup.enter.native="sendText">
            <el-button slot="append" icon="el-icon-s-promotion" @click="sendText" :disabled="!chatText"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="tabLabel">{{ tab.image }}</div>
        <div class="chatContent">
          <el-card class="box-card" :body-style="{ 'background-color': '#EDF0F2' }" v-for="item in imgList" :key="item.id">
            <div slot="header" class="clearfix">
              <span v-html="item.question"></span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="del(item.id, 2)">删除</el-button>
            </div>
            <div class="text item">
              <el-image 
                style="width: 150px; height: 150px"
                :src="item.url" 
                :preview-src-list="item.imgs">
              </el-image>
            </div>
          </el-card>
        </div>
        <div class="chatInput"
          v-loading="loadingImage"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgb(84,92,99)">
          <el-input v-model="chatImage" @keyup.enter.native="sendImage">
            <el-button slot="append" icon="el-icon-s-promotion" @click="sendImage" :disabled="!chatImage"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <html></html>
  </div>
</template>

<script> 
export default {
  name: 'ChatGptPage',
  data() {
    return {
      API_KEY: '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',
      tab: {
        text: '文 字',
        image: '图 片'
      },
      loadingText: false,
      loadingImage: false,
      chatText: '', 
      chatImage: '',
      textList: [],
      imgList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.chatText = ''
      this.chatImage = '',
      this.textList = []
      this.imgList = []
    },
    sendText() {
      if(!this.chatText) return false
      const url = 'https://api.openai.com/v1/completions'
      const question = this.chatText
      const data = {
        "model": "text-davinci-003",
        "prompt": question,
        "max_tokens": 2048,
        "temperature": 0
      }
      this.loadingText = true
      this.postData(url, data).then(res => {
        const choices = res.choices.map(item => item.text)
        const answer = choices.toString()
        this.textList.push({
          id: res.id,
          question: question,
          answer: answer
        })
        this.loadingText = false
        this.chatText = ''
      })
    },
    sendImage() {
      if(!this.chatImage) return false
      const url = 'https://api.openai.com/v1/images/generations'
      const question = this.chatImage
      const data = {
        "prompt": question,
        "n": 2,
        "size": '1024x1024', // 256x256, 512x512, or 1024x1024
        "response_format": 'url'  // url or b64_json
      }
      this.loadingImage = true
      this.postData(url, data).then(res => {
        console.log(res)
        const urlList = res.data.map(item => item.url)
        this.imgList.push({
          id: res.created,
          question: question,
          url: urlList[0],
          imgs: urlList
        })
        this.loadingImage = false
        this.chatImage = ''
      })
    },
    del(itemId, type) {
      if(type == 1) {
        this.textList.splice(this.textList.findIndex(item => item.id == itemId), 1)
      } else if(type == 2) {
        this.imgList.splice(this.imgList.findIndex(item => item.id == itemId), 1)
      }
    },
    async postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.API_KEY
        },
        body: JSON.stringify(data) 
      })
      return response.json()
    }
  }
}

</script>

<style scoped>
.tabLabel {
  width: 100%;
  text-align: center;
  margin: 10px;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 100%;
}
.chatInput {
  margin-top: 10px;
}
.chatContent {
  height: 760px; 
  overflow-x: hidden; 
  overflow-y: auto;
}
</style>