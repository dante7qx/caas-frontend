<template>
  <div class="editor"></div>
</template>

<script>
import DocEditor from '@o2oa/doceditor';

export default {
    name: 'MyDocEditor',
    mounted() {
      //使用DocEditor.createEditor方法初始化编辑器
      const editor = DocEditor.createEditor(this.$el, {
        base: "./doceditor/",
      }).load();

      editor.then(res => {
        const data = res.getData();
        data.subject = '乡村振兴';
        data.redHeader = '总公司文件';
       })
      
    }
  }

</script>