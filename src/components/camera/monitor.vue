<template>
  <div class="app-container">
    <h2 style="text-align: center;">视频监控</h2>
    <h3 style="text-align: center;">https://github.com/phoboslab/jsmpeg - https://github.com/wanghaoxi3000/gin-rtsp</h3>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <canvas ref="videoCanvas" @dblclick="fullscreen"></canvas>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import loadJs from '../../util/loadJs'

export default {
  name: "CameraMonitor",
  data() {
    return {
      isFullScreen: false
    }
  },
  created() {
    
  },
  mounted() {
    // let script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = '../../../public/js/jsmpeg.min.js';
    // document.body.appendChild(script);
    loadJs('../../../public/js/jsmpeg.min.js').then(()=>{
      console.log('加载成功，进行后续操作')
      const url = 'ws://127.0.0.1:3000/stream/live/15d275b0-7618-3e9b-ac89-355acbbfeb8e'
      let player = new JSMpeg.Player(url, {canvas: this.$refs.videoCanvas, audio: false});
    })
  },
  methods: {
    fullscreen() {
      let canvas = this.$refs.videoCanvas;
      if (this.isFullScreen) {
        this.exitFullscreen();
      } else {
        this.enterFullscreen(canvas);
      }
      this.isFullScreen = !this.isFullScreen;
    },
    // 进入全屏
    enterFullscreen(element) {
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
    }
  }
}

</script>
