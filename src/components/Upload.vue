<template>
  <div class="app-container">
    <h3>照片墙1</h3>
		<el-upload
      ref="picTypeUpload"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      class="ruisun-uploader-cover"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <h3>照片墙2</h3>
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
    <el-row style="margin-top: 10px;">
      <el-button type="primary" @click="hideUploadBtn(true)">隐藏</el-button>
      <el-button type="success" @click="hideUploadBtn(false)">显示</el-button>
    </el-row>
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
      hideUploadBtn(hide) {
        var upload_div = document.querySelectorAll('div.ruisun-uploader-cover > div[tabindex="0"]')
        upload_div.forEach(function(el) {
          if(hide) {
            el.style.cssText = "display: none;";
          } else {
            el.style.cssText = "display: '';";
          }
        })
      }
		}
	} 
</script>

