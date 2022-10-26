import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'video.js/dist/video-js.css'  
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import VueRandomColor from 'vue-randomcolor'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import App from './App.vue'
import VueRouterConfig from './router.config'

moment.locale('zh-cn');

// 全局方法挂载
Vue.prototype.uuid = uuidv4
Vue.prototype.$moment = moment

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueRandomColor)
Vue.use(vueAwesomeCountdown, 'vac')

// 创建路由实例
const routerConfig = new VueRouter(VueRouterConfig)

new Vue({
	el: '#app',
	router: routerConfig,
	render: h => h(App)
})