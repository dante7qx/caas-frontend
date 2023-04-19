<template>
  <div class="map">
		<h2 style="text-align: center;">腾讯地图</h2>
		<iframe id="mapPage" width="100%" height="600px" frameborder=0 :src="getSrc"></iframe>
		<div class="map-footer">
			<el-button type="primary" @click="confirm()">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
		</div>
		<el-divider><i class="el-icon-mobile-phone"></i></el-divider>
		<span v-html="`${poiaddress}，经度：${latlng.lat}，纬度：${latlng.lng}`"></span>
	</div>
</template>

<script>
export default {
	name: 'TxMapPage',
	props: {
    mapKey: {
      type: String,
      default: 'TZGBZ-HSGE6-ZC7SX-E64JF-5QTPS-4JBBJ'
    },
    keyName: {
      type: String,
      default: 'BBX'
    },
    lat: {
      type: [String, Number]
    },
    lng: {
      type: [String, Number]
    }
  },
	data() {
    return {
      poiaddress: null,
      latlng: {
        lat: null,
        lng: null,
      }
    }
  },
	mounted() {
    var self = this
    window.addEventListener('message', function(event) {
      var loc = event.data
      if (loc.poiname === '我的位置' || loc.poiaddress === '') {
        self.$toast('无法识别该地址，请移动地图重新选择')
        return false
      }
      if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        self.poiaddress = loc.poiaddress;
        self.latlng = loc.latlng;
      }
    }, false)
  },
  computed: {
    getSrc() {
      let baseUrl = 'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=' + this.mapKey + '&referer=' + this.keyName
      if (this.lat && this.lng) {
        baseUrl += `&coord=${this.lat},${this.lng}`
      }
      return baseUrl
    }
  },
	methods: {
		confirm() {
			console.log(this.poiaddress)
			console.log(this.latlng)
		}
	}
}
</script>
<style scoped>
	.map {
		width: 100%;
		height: 100%;
	}
	.map-footer {
		text-align: right;
		margin-top: 10px;
	}
</style>
<style>
.qqmap-text-logo {
  display: none;
}
</style>