<template>
  <div id="smalltest">
    <h2>小功能测试</h2>
    <div :key="index" v-for="index in 20" 
        :class="{active : activeBtn == index}"
        @click="goAnchor('#anchor-'+index), index"> 
        <a href="javascript:void(0);">{{index}}</a>
    </div>  
    <div :id="'anchor-'+index" class="item" :key="index" v-for="index in 20">{{index}}</div> 
  </div>
</template>

<script>
export default {
  data() {
      return {
        activeBtn: 0 
      }
  },
  methods: { 
    goAnchor(selector, index) {
      this.activeBtn = index;  
      this.$el.querySelector(selector).scrollIntoView()  
    } 
  }
}
</script>

<style scoped>
.item{  
  width: 100%;  
  height: 90px;  
  line-height: 90px;  
  text-align: center;  
} 
</style>

