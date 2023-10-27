<template>
  <div>
    <h2 style="text-align: center;">小功能测试</h2>
    <div :key="index" v-for="index in 20"
        :class="{active : activeBtn === index}"
        @click="goAnchor('#anchor_'+index), index"
        style="margin-left: 30px;">
        <a href="javascript:void(0);">{{index}}</a>
    </div>
    <div :id="'anchor_'+index" class="item" :key="'anchor_'+index" v-for="index in 20">{{index}}</div>
  </div>
</template>

<script defer>
export default {
  data() {
      return {
        activeBtn: 0
      }
  },
  methods: {
    goAnchor(selector, index) {
      this.activeBtn = index;
      this.$nextTick(()=>{
        const target = document.querySelector(selector)
        // target.style.color = 'lightgreen'
        target.scrollIntoView()
      })
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

