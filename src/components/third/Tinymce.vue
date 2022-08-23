<template>
  <div style="margin: 15px;">
    <h2>Tinymce 富文本</h2>
    <ul>
      <li>https://www.tiny.cloud/docs/plugins/</li>
      <li>https://www.jianshu.com/p/8dfedddc943f</li>
    </ul>
    <!--
    <img src="../../../public/test.png" width="200" height="200">
    -->
    <tinymce-editor
      v-model="content"
      ref="editor"
      >
    </tinymce-editor>
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
      content: null
    }
  }
}
</script>