<template>
  <div class="app-container">
    <h3 @click="xx">照片墙1</h3>
		<el-upload
      ref="picTypeUpload"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      class="ruisun-uploader-cover"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <h3 @click="xx">照片墙2</h3>
		<el-upload
      ref="picTypeUpload"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      class="ruisun-uploader-cover"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="450px">
      <img :src="dialogImageUrl" alt="" style="width: 400px; height: 400px;" />
    </el-dialog>
	</div>
</template>
<script>
  export default {
		name: "upload",
		data() {
			return {
        dialogImageUrl: '',
        dialogVisible: false
      };
		},
		created() {
		},
    mounted() {
      // this.hideUploadBtn()
    },
		methods: {
			handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      hideUploadBtn() {
        var upload_div = document.querySelectorAll('div.ruisun-uploader-cover > div[tabindex="0"]')
        upload_div.forEach(function(el) {
          el.style.cssText = "display: none;";
        })
      }
		}
	} 
</script>

