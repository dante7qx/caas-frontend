<template>
  <div>
    <div id="gdContainer"></div>
        <div id="myPageTop">
          <table>
            <tr>
              <td>
                <label>请输入关键字：</label>
              </td>
            </tr>
            <tr>
              <td>
                <input id="tipinput" v-model="location"/>
              </td>
            </tr>
          </table>
      </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
window._AMapSecurityConfig = {
  // 设置安全密钥
  securityJsCode: '49ba0e2d69ae022e0b11a6162958cded',
}
export default {
	name: 'GDMapPage',
  data() {
    return {
      location: "",
      lnglat: [], // 经纬度数组 [lng,lat]
      markers: [],
    }
  },
  mounted(){
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods:{
    initMap(){
      AMapLoader.load({
        key: "3d7a82991d169ad5794358edc517f7ca",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",                                     // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:['AMap.AutoComplete', 'AMap.PlaceSearch'],                       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        this.createMap()
      }).catch(e=>{
        console.log(e);
      })
    },
    createMap() {
      const that = this
      this.map = new AMap.Map("gdContainer", {  //设置地图容器id
        viewMode: "2D",    //是否为3D地图模式
        zoom: 13, // 初始化地图层级
        center: [105.780118, 34.573591], // 初始化地图中心
        resizeEnable: true
      }).on("complete", function(){
        console.log("地图加载完成！ ");
      })
      // 鼠标点击获取经纬度
      .on("click", function(e) {
        that.lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
        that.setMarker(that.lnglat);
      });
      this.auto = new AMap.AutoComplete({
        input: 'tipinput'  // 搜索框的id
      });
      this.auto.on("select", this.selectSite);//注册监听，当选中某条记录时会触发

      // 参考：https://lbs.amap.com/demo/javascript-api/example/poi-search/keywords-search
      this.placeSearch = new AMap.PlaceSearch({
        map: this.map,
        city: "0938", // 兴趣点城市
        citylimit: true,  //是否强制限制在设置的城市内搜索
        autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        extensions: 'base' // 返回基本地址信息
      });
    },
    selectSite(e) {
      console.log(e)
        this.lnglat = [e.poi.location.lng, e.poi.location.lat];
        // this.setMarker(this.lnglat)
        this.placeSearch.setCity(e.poi.adcode);
        this.placeSearch.search(e.poi.name);  //关键字查询查询
    },
    //  添加标记
    setMarker(lnglat) {
      console.log("位置", lnglat); // lnglat=[经度,纬度]
      this.removeMarker();
      let marker = new AMap.Marker({
        position: lnglat,
      });
      marker.setMap(this.map);
      this.markers.push(marker); // 在data中记录标记点
    },
    // 删除之前后的标记点
    removeMarker() {
      if (this.markers) {
        this.map.remove(this.markers);
      }
    },
    destroyMap() {
      this.map && this.map.destroy();
    }
  }

}
</script>

<style scoped>
#gdContainer {
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 950px;
}
#myPageTop {
  position: absolute;
  top: 75px;
  right: 10px;
  font-family: "Microsoft Yahei";
  font-size: 14px;
  background: none 0px 0px repeat scroll rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(204, 204, 204);
  border-image: initial;
  margin: 10px auto;
  padding: 6px;
}
</style>
<style>
/* 隐藏高德logo  */
.amap-logo {
    display: none !important;
}
/* 隐藏高德版权  */
.amap-copyright {
    display: none !important;
}
</style>
