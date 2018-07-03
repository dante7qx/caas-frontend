<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <router-link to="/layout">布局Layout</router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '欢迎来到饿了吗 Element UI !'
      
    }
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
