<template>
  <div class="app-container">
    <h1><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API" target="_blank" :underline="false">Web_Speech_API</a></h1>
    <h2 style="text-align: center">语音播报</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文字">
        <el-input type="textarea" v-model="form.txt" placeholder="播报文字" :autosize="{ minRows: 6, maxRows: 10}" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="选择声音">
        <el-select v-model="form.voice" filterable placeholder="请选择" style="width: 500px;">
          <el-option
            v-for="item in options"
            :key="item.voiceURI"
            :label="item.voiceURI"
            :value="item.voiceURI">
          </el-option>
        </el-select>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary" @click="playVoice">播放</el-button>
        <el-button type="warning" @click="pauseVoice">暂停</el-button>
        <el-button type="info" @click="cancelVoice">取消</el-button>
      </div>
    </el-form>
    
    <h2 style="text-align: center">语音识别</h2>
    <el-button type="primary" @click="startSpeak">说话</el-button>
    <el-button type="danger" @click="stopSpeak">停止</el-button>
    <div style="margin-top: 10px;">
      <el-input type="textarea" v-model="form.rTxt" placeholder="识别结果" :autosize="{ minRows: 6, maxRows: 10}" resize="none"></el-input>
    </div>
  </div>
</template>

<script>
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
export default {
  data() {
    return {
      options:[],
      form: {
        voice: '',
        txt: '',
        rTxt: ''
      }, 
    };
  },
  created() {
    this.options = synth.getVoices()
  },
  methods: {
    /*********************************************** 语音播报 ***********************************************************/
    playVoice() {
      if(synth.paused) {
        synth.resume();    // 播放
      } else {
        if(this.form.txt) {
          this.handleSpeak(this.form.txt) // 传入需要播放的文字
        }
      }
    },
    pauseVoice() {
      synth.pause();
    },
    // 语音播报的函数
    handleSpeak(text) {
      msg.text = text;     // 文字内容: 小朋友，你是否有很多问号
      msg.lang = "zh-CN";  // 使用的语言:中文
      msg.volume = 1;      // 声音音量：1
      msg.rate = 1;        // 语速：1
      msg.pitch = 1;       // 音高：1
      if(this.form.voice) {
        msg.voice = this.options.filter(item => item.voiceURI == this.form.voice)[0]
      }
      synth.speak(msg);    // 播放
    },
    // 语音停止
    cancelVoice(e) {
      synth.cancel(msg);
    },

    /*********************************************** 语音识别 ***********************************************************/
    startSpeak() {
      const that = this
      // Check if the browser supports the Web Speech API
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Create an instance of the SpeechRecognition object
        // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        // Configure the recognition settings
        // recognition.lang = 'en-US'; 
        recognition.lang = 'zh-CN';

        // Start recognition when the user speaks
        recognition.onstart = function() {
          console.log('开始语音识别...');
          that.form.rTxt = ''
        };

        // Process the recognized speech
        recognition.onresult = function(event) {
          const transcript = event.results[0][0].transcript;
          console.log('语音识别结果:', transcript);
          that.form.rTxt = transcript
        };

        // Handle recognition errors
        recognition.onerror = function(event) {
          console.error('语音识别错误:', event.error);
        };

        // Start speech recognition
        recognition.start();
      } else {
        console.error('Web Speech API is not supported in this browser.');
      }
    },
    stopSpeak() {
      recognition.stop()
    }
  }
};
</script>

/**
  参考： 
  语音播报 https://blog.51cto.com/u_7883830/5015290
*/