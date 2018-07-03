import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouterConfig from './router.config'

Vue.use(VueRouter)
Vue.use(ElementUI)

// 创建路由实例
const routerConfig = new VueRouter(VueRouterConfig)

new Vue({
    el: '#app',
    router: routerConfig,
    render: h => h(App)
})