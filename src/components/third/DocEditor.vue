<template>
    <div style="font-family: Avenir, sans-serif">
        <!--
      <vue-document-editor :content.sync="content" />
      -->
    </div>
  </template>
  
  <script>
  import VueDocumentEditor from 'vue-document-editor'
  
  export default {
    components: { VueDocumentEditor },
    data () {
      return { 
        content: ["<h1>Hello!</h1>Fill this page with text and new pages will be created as it overflows."]
      }
    }
  }
  </script>