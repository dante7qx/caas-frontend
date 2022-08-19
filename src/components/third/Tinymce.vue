<template>
  <div>
    <editor
      :init="{
        plugins: 'lists link image table code help wordcount'
      }"
    />
    <img alt="Vue logo" src="../../../public/test.png" width="400" height="400"/>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'Tinymce',
  components: {
    'editor': Editor
  }
}
</script>