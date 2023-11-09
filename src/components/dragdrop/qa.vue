

<template>
  <div class="paper-box">
    <el-row :gutter="20" align="top">
      <el-col :span="16" :offset="4">
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
                <el-radio v-model="item.answer" :label="opt.index">{{ optDict[idx] + '. ' + opt.text}}</el-radio>
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
      default: 1
    },
  },
  data() {
    return {
      queryId: 0,
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
    const paramId = this.$route.query && this.$route.query.qid;
    this.queryId = paramId ? paramId : this.id;
    this.getPaperInfo();
  },
  computed: {
    subTitle: function() {
      const subjectCount = this.paper.subjects != null ? this.paper.subjects.length : 0
      const qaTime = this.paper.qaTime != null ? this.paper.qaTime.toString().replace(",", " ~ ") : ''
      return `本问卷共${subjectCount}题，答题时间：${qaTime}`
    }
  },
  methods: {
    getPaperInfo() {
      if(this.queryId > 0) {
        getPaper(this.queryId).then(data => {
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
  font-size: 30px;
  font-weight: 400;
  color: #000000;
}
.paper-sub-title {
  margin-top: 32px;
  display: flex;
  justify-content: left;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
}
.box-card {
  margin-top: 0;
  cursor: pointer;
}
.box-header {
  overflow: hidden;
  font-size: 18px;
  font-weight: 400;
  color: #000000;
}
.box-item {
  height: 40px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}
.box-grade {
  margin-top: 5px;
  margin-bottom: 0;
  margin-right: 5px;
  display: block;
  float: right;
}
.box-submit-btn {
  margin-top: 20px;
  width: 150px;
  font-size: 20px;
}
.el-card {
  border-top: none;
  border-bottom: none;
}
.el-card ::v-deep .el-card__header {
  padding-bottom: 8px;
  border: none;
}
.el-card ::v-deep .el-card__body {
  padding-bottom: 10px;
  border: none;
}
/deep/.el-radio .el-radio__label {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}
/deep/.el-checkbox .el-checkbox__label {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}

/** el-form disabled */
/deep/ .is-disabled .is-checked .el-radio__inner {
  background-color: #1890ff;
  border-color: #1890ff;
}
/deep/ .is-disabled .el-radio__input + .el-radio__label {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}

/deep/ .is-disabled .is-checked .el-checkbox__inner {
  background-color: #1890ff;
  border-color: #1890ff;
}
/deep/ .is-disabled .el-checkbox__input + .el-checkbox__label {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}

*>>>.el-textarea.is-disabled .el-textarea__inner {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  background-color: #ffffff;
  border: none;
}
</style>
