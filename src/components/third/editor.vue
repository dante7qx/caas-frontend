<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
      :init="init"
      :disabled="disabled"
     >
    </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
// 主题
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
// 样式
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.inline.min.css'
import '../../../public/tinymce/langs/zh_CN.js'
// 插件
import 'tinymce/plugins/image'  // 插入上传图片插件
import 'tinymce/plugins/media'  // 插入视频插件
import 'tinymce/plugins/table'  // 插入表格插件
import 'tinymce/plugins/link' //超链接插件
import 'tinymce/plugins/code' //代码块插件
import 'tinymce/plugins/lists'  // 列表插件
import 'tinymce/plugins/wordcount'  // 字数统计插件
import 'tinymce/plugins/colorpicker'  //选择颜色插件
import 'tinymce/plugins/textcolor' //文本颜色插件
import 'tinymce/plugins/hr' // 水平线
import 'tinymce/plugins/preview'  // 预览
import 'tinymce/plugins/fullscreen' // 全屏
import 'tinymce/plugins/searchreplace'  // 查找替换
import 'tinymce/plugins/autoresize' // 编辑器大小自适应

export default {
	name: 'TinymceEditorWidget',
  components: {
    Editor
  },
	props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    baseUrl: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table textcolor wordcount link hr searchreplace autoresize preview fullscreen code'
    },
    toolbar: {
      type: [String, Array],
      default: 'styleselect | bold italic underline strikethrough fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | hr bullist numlist outdent indent blockquote subscript superscript | removeformat undo redo | image media link openlink table | searchreplace preview fullscreen code'
    },
    menubar: {
      type: [String, Boolean],
      default: 'file edit insert view format table tools'
      // default: false
    },
    minHeight: {
      type: Number,
      default: 200
    },
    maxHeight: {
      type: Number,
      default: 650
    }
  },
  data() {
		return {
			//初始化配置
      init: {
        placeholder: "在这里输入文字",
        language: 'zh_CN',
        content_style: 'body { font-family: 宋体; font-size: 12pt} p {margin: 0px; border:0px ; padding: 0px;}',
        object_resizing: true, //禁用表格内联样式拖拽拉伸
        table_resize_bars: true,//禁用表格单元格拖拽拉伸

        protect: [
          /\<\/?(if|endif)\>/g, //<if> & </endif>
          /\<xsl\:[^>]+\>/g, //<xsl:...>
          /<\?php.*?\?>/g, //php代码
        ], 
        font_css: '../../../public/tinymce/fonts/fonts.css',
        min_height: this.minHeight,
        max_height: this.maxHeight,
        autoresize_bottom_margin: 50,
        plugins: this.plugins,
        toolbar: this.toolbar,
        // fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 26px 36px 48px 56px', // 工具栏自定义字体大小选项
        font_formats: "宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';微软雅黑='微软雅黑';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        menubar: this.menubar,
        branding: false,
        resize: true,
        default_link_target: '_blank',
        file_picker_types: "file media",
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        },
        file_picker_callback: (cb, value, meta) => {
          if (meta.filetype == 'file') {
            callback('mypage.html', { text: 'My text' });
          }
          if (meta.filetype == 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
          }
        },
      },
      myValue: this.value
		}
	},
	mounted() {
		tinymce.init({})
	},
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    },
  }
}
</script>