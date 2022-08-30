<template>
  <div style="margin: 15px;">
    <h2>Tinymce 富文本</h2>
    <ul>
      <li>https://www.tiny.cloud/docs/plugins/</li>
      <li>https://www.jianshu.com/p/8dfedddc943f</li>
      <li>https://itcn.blog/p/2658501229.html</li>
      <li>https://its201.com/article/qq_42740164/118336792</li>
      <li>https://www.runoob.com/w3cnote/px-pt-em-convert-table.html (字体px、pt)</li>
      <li><el-button type="success" plain size="small" @click="submit">提 交</el-button></li>
    </ul>
    <!--
    <img src="../../../public/test.png" width="200" height="200">
    -->
    <tinymce-editor ref="editor" v-model="content" :minHeight="300" :disabled="disabled"/>
  </div>
</template>

<script>
import TinymceEditor from './editor'

export default {
  name: 'TinymceDemo',
  components: {
    'tinymce-editor': TinymceEditor
  },
  data() {
    return {
      content: null,
      disabled: false
    }
  },
  methods: {
    submit() {
      console.log(this.content)
    }
  }
}
</script>