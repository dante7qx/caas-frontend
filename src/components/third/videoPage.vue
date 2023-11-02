<template>
  <div>
    <h2 style="text-align: center;">视频播放</h2>
    <div style="margin: 15px; border: 1px solid black;">
      <video-player :videoSrc="videoSrc"/>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './video'

export default {
  name: 'VideoDemo',
  components: {
    'video-player': VideoPlayer
  },
  data() {
    return {
      videoSrc: ''
    }
  },
  mounted() {
    this.videoSrc = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
  }
}
</script>
