<template>
  <div>
    <editor
      :init="{
        plugins: 'lists link image table code help wordcount'
      }"
    />
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