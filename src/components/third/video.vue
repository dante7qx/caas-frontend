<template>
  <div>
    <video id="videoArea" style="width: 100%; height: 100%;" class="video-js vjs-default-skin" preload="auto">
      <source :src="src" type="application/x-mpegURL">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import "@videojs/http-streaming"

export default {
  name: "videoComponent",
  props: {
    videoSrc: {
      type: String, // 
      defalut: '',
      required: false
    }
  },
  data() {
    return {
      src: '',
      player: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 播放器初始化
      this.$nextTick(() => {
        console.log(this.videoSrc)
        this.src = this.videoSrc
        this.player = videojs('videoArea' , {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: false,
          muted: true //静音模式 、、 解决首次页面加载播放。
        }, function () {
          // 自动播放
          // setTimeout(() => this.play(), 1000)
          this.play() 
        })
      })
    }
  },
  // 离开页面销毁视频播放器
  beforeDestroy() {
    if (this.player != null) {
      this.player.dispose() // dispose()会直接删除Dom元素
    }
  }
}
</script>
<style scoped>

</style>