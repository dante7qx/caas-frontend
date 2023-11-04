

<template>
  <div class="paper-box">
    <el-row :gutter="20" align="top">
      <el-col :span="22" :offset="1">
        <el-col>
          <el-card shadow="hover" class="box-card" >
            <span class="paper-title">{{ paper.title }}</span>
            <span class="paper-sub-title">{{ subTitle }}</span>
          </el-card>
        </el-col>
        <el-col  v-for="(item, index) in paper.subjects" :key="index">
          <el-card shadow="hover" class="box-card" >
            <div slot="header" class="box-header">
              <span>{{ (index + 1) + '. ' }}</span>
              <span>{{ item.subject }}</span>
              <el-tag size="small" class="box-grade">{{ item.grade ? item.grade + '分' : '未设置' }}</el-tag>
              <el-tag size="small" class="box-grade">{{ typeDict[item.type].text }}</el-tag>
            </div>
            <div v-if="item.type === 'radio'">
              <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                <el-radio v-model="item.answer" :label="opt.index">{{ optDict[idx] + '. ' + opt.text }}</el-radio>
              </div>
            </div>
            <div v-else-if="item.type === 'checkbox' || item.type === 'un-checkbox'">
              <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                <el-checkbox-group v-model="item.answer">
                  <el-checkbox v-model="item.index" :label="opt.index">{{ optDict[idx] + '. ' + opt.text}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div v-else-if="item.type === 'tf'">
              <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item" >
                <el-radio v-model="item.answer" :label="opt.index">{{ optDict[idx] + '.' }}</el-radio>
                <span class="box-tf">{{ opt.text }}</span>
              </div>
            </div>
            <el-input v-model="item.answer"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                resize="none"
                show-word-limit
                maxlength="500"
                placeholder="请输入"
                v-else-if="item.type === 'Q&A'"/>
            <span v-else>暂不支持</span>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="22" :offset="1">
        <div style="text-align: center;">
          <el-button type="primary" class="box-submit-btn" @click="submit">交 卷</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPaper, persist } from '@/api/survey'
export default {
  name: "ExamPage",
  props: {
    id: {
      type: Number,
      required: false,
      default: 2
    },
  },
  data() {
    return {
      optDict: { 0: 'A', 1: 'B', 2: 'C', 3: 'D' },
      typeDict: {
        'radio': { text: '单选', class: 'radio' },
        'checkbox': { text: '多选', class: 'checkbox-checked' },
        'un-checkbox': { text: '不定项选择', class: 'checkbox-checked' },
        'tf': { text: '判断', class: 'radio' },
        'Q&A': { text: '问答', class: 'qa' }
      },
      paper: {}
    }
  },
  created() {
    this.getPaperInfo()
  },
  computed: {
    subTitle: function() {
      const subjectCount = this.paper.subjects != null ? this.paper.subjects.length : 0
      const totalScore = this.paper.totalScore != null ? this.paper.totalScore : ''
      const qaTime = this.paper.qaTime != null ? this.paper.qaTime.toString().replace(",", " ~ ") : ''
      return `本试卷共${subjectCount}题，总分: ${totalScore}，答题时间：${qaTime}`
    }
  },
  methods: {
    getPaperInfo() {
      if(this.id > 0) {
        getPaper(this.id).then(data => {
          this.paper = data['paperInfo']
        }).catch(error => console.error(error));
      }
    },
    submit() {
      console.log(this.paper)
    }
  }
}
</script>

<style scoped>
.paper-box {
  height: 93vh;
  overflow: auto;
}
.paper-title {
  display: flex;
  justify-content: center;
  font-size: 40px;
}
.paper-sub-title {
  margin-top: 32px;
  display: flex;
  justify-content: left;
  font-size: 20px;
}
.box-card {
  margin-top: 0;
  cursor: pointer;
}
.box-item {
  font-size: 14px;
  height: 40px;
  margin-top: 10px;
}
.box-header {
  overflow: hidden;
}
.box-grade {
  margin-top: 5px;
  margin-bottom: 0;
  margin-right: 5px;
  display: block;
  float: right;
}
.box-tf {
  margin-left: -20px;
}
.box-submit-btn {
  margin-top: 20px;
  width: 150px;
  font-size: 20px;
}
.el-card ::v-deep .el-card__header {
//background-color: lightblue;
  padding-bottom: 8px;
  border: none;
}
.el-card ::v-deep .el-card__body {
  //background-color: lightblue;
  //padding-top: 8px;
  padding-bottom: 10px;
  border: none;
}
</style>
