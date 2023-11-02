

<template>
  <div class="app-container">
    <h2 style="text-align: center;">SortableJS 拖拽示例 - http://sortablejs.github.io/Sortable</h2>
    <el-row :gutter="20" align="top">
      <el-col :span="6">
        <div style="text-align: center; margin: 10px 0 10px 0;">
          <el-radio v-model="design" :label="true">设计</el-radio>
          <el-radio v-model="design" :label="false">问卷</el-radio>
        </div>
        <el-collapse accordion>
          <el-collapse-item title="题目" name="subject" v-if="design">
            <div style="margin-left: 35%">
              <draggable :list="designSubject" :group="{ name: 'paperDesign', pull: 'clone', put: false }">
                <div class="drag-item" v-for="(item, index) in designSubject" :key="index">
                  <svg-icon :icon-class="typeDict[item.type].class" style="margin-top: 12px" /><label>{{ typeDict[item.type].text }}</label>
                </div>
              </draggable>
            </div>
          </el-collapse-item>
          <el-collapse-item title="数据" name="code">
            <div style="border: 1px #ebeef4 solid; height: 850px; overflow: auto;">
              <pre style="margin-top: 0"><code class="hljs" v-html="resultJson"></code></pre>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="12" class="box-col">
        <el-col>
          <el-card shadow="hover" class="box-card" >
            <el-input v-model="paper.title" placeholder="请输入标题" v-if="design"></el-input>
            <div v-else>
              <span class="paper-title">{{ paper.title }}</span>
              <span class="paper-sub-title">{{ subTitle }}</span>
            </div>
          </el-card>
        </el-col>
        <draggable v-model="paper.subjects" ghost-class="ghost" @end="endDrag" group="paperDesign">
          <el-col  v-for="(item, index) in paper.subjects" :key="index">
            <el-card shadow="hover" class="box-card" >
              <div slot="header" class="box-header">
                <span>{{ (index + 1) + '. ' }}</span>
                <el-input v-model="item.subject" placeholder="请输入题目" class="box-subject" v-if="design"></el-input>
                <span v-else>{{ item.subject }}</span>
                <i class="el-icon-delete box-setting-btn" @click="delSubject(index)" v-if="design"></i>
                <i class="el-icon-setting box-setting-btn" @click="setSubject(item)" v-if="design"></i>
                <el-tag size="small" class="box-grade">{{ item.grade ? item.grade + '分' : '未设置' }}</el-tag>
                <el-tag size="small" class="box-grade">{{ typeDict[item.type].text }}</el-tag>
              </div>
              <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-if="item.type === 'radio'">
                <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                  <div v-if="design">
                    <el-radio :label="opt.index" >
                      <span :style="opt.index === item.correct ? 'background-color: #42b983; color: #fff;' : ''">{{ optDict[idx] + '.' }}</span>
                    </el-radio>
                    <el-input v-model="opt.text" placeholder="请输入选项" class="box-radio"></el-input>
                  </div>
                  <div v-else>
                    <el-radio v-model="item.answer" :label="opt.index">{{ optDict[idx] + '. ' + opt.text }}</el-radio>
                  </div>
                </div>
              </draggable>
              <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-else-if="item.type === 'checkbox' || item.type === 'un-checkbox'">
                <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                  <div v-if="design">
                      <el-checkbox :label="opt.index">
                        <span :style="item.correct.includes(opt.index) ? 'background-color: #42b983; color: #fff;' : ''">{{ optDict[idx] + '.' }}</span>
                      </el-checkbox>
                      <el-input v-model="opt.text" placeholder="请输入选项" class="box-checkbox"></el-input>
                  </div>
                  <div v-else>
                    <el-checkbox-group v-model="item.answer">
                      <el-checkbox v-model="item.index" :label="opt.index">{{ optDict[idx] + '. ' + opt.text}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </draggable>
              <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-else-if="item.type === 'tf'">
                <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                  <div v-if="design">
                    <el-radio :label="opt.index">
                      <span :style="opt.index === item.correct ? 'background-color: #42b983; color: #fff;' : ''">{{ optDict[idx] + '.' }}</span>
                    </el-radio>
                    <span class="box-tf">{{ opt.text }}</span>
                  </div>
                  <div v-else>
                    <el-radio v-model="item.answer" :label="opt.index">{{ optDict[idx] + '.' }}</el-radio>
                    <span class="box-tf">{{ opt.text }}</span>
                  </div>
                </div>
              </draggable>
              <el-input v-model="item.answer"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                resize="none"
                show-word-limit
                maxlength="500"
                placeholder="请输入"
                :readonly="design"
                v-else-if="item.type === 'Q&A'"/>
              <span v-else>暂不支持</span>
            </el-card>
          </el-col>
        </draggable>
        <div style="text-align: center;" v-if="!design">
          <el-button type="primary" @click="confirmSet" style="margin-top: 20px">交 卷</el-button>
        </div>
      </el-col>
      <el-col :span="6" v-if="design">
        <el-tabs v-model="setType">
          <el-tab-pane label="试卷设置" name="subject">
            <el-form ref="paperForm" :model="paperForm" label-width="90px">
              <el-form-item label="总分数" prop="totalScore">
                <el-input-number v-model="paperForm.totalScore" :min="60" :max="100" label="总分数" style="width: 100%"></el-input-number>
              </el-form-item>
              <el-form-item label="及格分数" prop="passScore">
                <el-input-number v-model="paperForm.passScore" :min="40" :max="60" label="及格分数" style="width: 100%"></el-input-number>
              </el-form-item>
              <el-form-item label="题目总分数">
                <label>{{ subjectTotalScore }}</label>
              </el-form-item>
              <el-form-item label="答题时间" prop="qaTime">
                <el-date-picker
                  v-model="paperForm.qaTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  style="width: 100%"/>
              </el-form-item>
              <el-form-item label="答题范围">
                设置答题的权限（所有人、指定部门、指定人）
              </el-form-item>
              <div class="box-form-btn">
                <el-button type="primary" @click="confirmPaper">确 定</el-button>
                <el-button type="success" @click="submitPaper">发 布</el-button>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="题目设置" name="option">
            <el-form ref="optionForm" :model="optionForm" label-width="110px" v-if="currentSubject.type != null">
              <el-form-item label="题目分值" prop="grade">
                <el-input-number v-model="optionForm.grade" :min="1" :max="20" style="width: 100%"></el-input-number>
              </el-form-item>
              <el-form-item label="正确答案" prop="correct" v-if="optionForm.type !== 'Q&A'">
                <el-select
                  v-model="optionForm.correct"
                  placeholder="请选择"
                  clearable
                  :multiple="(optionForm.type !== 'radio' && optionForm.type !== 'tf')"
                  style="width: 100%">
                  <el-option
                    v-for="item in optionForm.opts"
                    :key="item.index"
                    :label="item.text"
                    :value="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="当前题目总分数">
                <label>{{ subjectTotalScore }}</label>
              </el-form-item>
              <div class="box-form-btn">
                <el-button type="primary" @click="confirmSet" style="width: 100%">确 定</el-button>
              </div>
            </el-form>
            <span v-else>请选择题目</span>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPaper, persist } from '@/api/survey'
import draggable from 'vuedraggable'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
// gradient-light.min.css、gradient-dark.min.css、monokai.min.css
import "highlight.js/styles/nord.min.css"
hljs.registerLanguage("json", json)

const SET_OPTION = "option"

export default {
  name: "sortableJS",
  components: {
    draggable
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: 2
    },
  },
  data() {
    return {
      design: true, // 设计阶段 true、答题阶段 false
      setType: 'subject', // 设置种类（试卷、题目）
      optDict: { 0: 'A', 1: 'B', 2: 'C', 3: 'D' },
      typeDict: {
        'radio': { text: '单选', class: 'radio' },
        'checkbox': { text: '多选', class: 'checkbox-checked' },
        'un-checkbox': { text: '不定项选择', class: 'checkbox-checked' },
        'tf': { text: '判断', class: 'radio' },
        'Q&A': { text: '问答', class: 'qa' }
      },
      paperForm: {
        totalScore: null,
        passScore: null,
        qaTime: null
      },
      optionForm: {
        grade: null,
        correct: null
      },
      // 当前设置题目
      currentSubject: {},
      // 设计选题
      designSubject: [
        {
          type: 'radio',
          subject: '',
          grade: null,
          opts: [
            {index: 1, text: ''},
            {index: 2, text: ''},
            {index: 3, text: ''},
            {index: 4, text: ''},
          ],
          correct: null,
          answer: null
        },
        {
          type: 'checkbox',
          subject: '',
          grade: null,
          opts: [
            {index: 1, text: ''},
            {index: 2, text: ''},
            {index: 3, text: ''},
            {index: 4, text: ''},
          ],
          correct: [],
          answer: []
        },
        {
          type: 'un-checkbox',
          subject: '',
          grade: null,
          opts: [
            {index: 1, text: ''},
            {index: 2, text: ''},
            {index: 3, text: ''},
            {index: 4, text: ''},
          ],
          correct: [],
          answer: []
        },
        {
          type: 'tf',
          subject: '',
          grade: null,
          opts: [
            {index: 1, text: '正确'},
            {index: 2, text: '错误'},
          ],
          correct: null,
          answer: null
        }, {
          type: 'Q&A',
          subject: '',
          grade: null,
          answer: ''
        }
      ],
      // 问卷
      paper: {
        title: '',
        totalScore: null,
        passScore: null,
        qaTime: null,
        subjects: [{
          type: 'radio',
          subject: '从左边拖拽题目，拖拽后将此项删除',
          grade: null,
          opts: [],
          correct: null,
          answer: null
        }]
      }
      /*
      paper: {
        title: '世界百科知识问答',
        totalScore: 100,
        passScore: 60,
        qaTime: null,
        subjects: [{
          type: 'radio',
          subject: '下面那个称呼是描述北斗七星中的一颗？',
          grade: 2,
          opts: [
            {index: 1, text: '祈安'},
            {index: 2, text: '山葵'},
            {index: 3, text: '瑶光'},
            {index: 4, text: '化神'},
          ],
          correct: null,
          answer: null
        }, {
          type: 'checkbox',
          subject: '下面那种蛇是毒蛇？',
          grade: 3,
          opts: [
            {index: 1, text: '黑曼巴'},
            {index: 2, text: '菜花蛇'},
            {index: 3, text: '太攀蛇'},
            {index: 4, text: '森蚺'},
          ],
          correct: [],
          answer: []
        }, {
          type: 'un-checkbox',
          subject: '以下属于营运资本项目的是？',
          grade: 5,
          opts: [
            {index: 1, text: '应收票据'},
            {index: 2, text: '应付职工薪酬'},
            {index: 3, text: '固定资产'},
            {index: 4, text: '应交税费'},
          ],
          correct: [],
          answer: []
        }, {
          type: 'tf',
          subject: '如果没有理性，眼睛就是最坏的见证人？',
          grade: 5,
          opts: [
            {index: 1, text: '正确'},
            {index: 2, text: '错误'},
          ],
          correct: null,
          answer: null
        }, {
          type: 'Q&A',
          subject: '人生短暂吗？',
          grade: 10,
          answer: ''
        }]
      }
      */
    }
  },
  created() {
    this.getPaperInfo()
  },
  computed: {
    resultJson: function () {
      const json = JSON.stringify(this.paper, null, 2)
      return hljs.highlight(json, {language: 'json'}).value
    },
    subTitle: function() {
      const qaTime = this.paper.qaTime != null ? this.paper.qaTime.toString().replace(",", " ~ ") : ''
      const totalScore = this.paper.totalScore != null ? this.paper.totalScore : ''
      return `本试卷共${this.paper.subjects.length}题，总分: ${totalScore}，答题时间：${qaTime}`
    },
    subjectTotalScore: function () {
      let score = 0
      if(this.paper.subjects && this.paper.subjects.length > 0) {
        score = this.paper.subjects.reduce((accumulator, subject) => accumulator + subject.grade, 0)
      }
      return score
    }
  },
  methods: {
    endDrag(e) {
      console.log('EndDrag', e);
    },
    // 获取试题
    getPaperInfo() {
      if(this.id > 0) {
        getPaper(this.id).then(data => {
          this.paper = data['paperInfo']
          this.fillPaperForm(this.paper)
        }).catch(error => console.error(error));
      }
    },
    fillPaperForm(paper) {
      this.paperForm.totalScore = paper.totalScore
      this.paperForm.passScore = paper.passScore
      this.paperForm.qaTime = paper.qaTime
    },
    // 试卷设置
    fillPaper(paperForm) {
      this.paper.totalScore = paperForm.totalScore
      this.paper.passScore = paperForm.passScore
      this.paper.qaTime = paperForm.qaTime
    },
    confirmPaper() {
      this.fillPaper(this.paperForm)
    },
    submitPaper() {
      this.fillPaper(this.paperForm)
      persist({ id: this.id, paperInfo: this.paper }).then((data) => {
        console.log(data);
        this.$message.success('发布成功！');
      }).catch(error => {
        console.error('Error:', error);
      });
    },
    // 题目设置
    setSubject(subject) {
      this.setType = SET_OPTION
      this.currentSubject = subject
      this.resetForm('optionForm')
      Object.assign(this.optionForm, subject)
      this.$forceUpdate()
    },
    confirmSet() {
      this.currentSubject.grade = this.optionForm.grade
      if(this.currentSubject.type !== 'Q&A') {
        this.currentSubject.correct = this.optionForm.correct
      }
    },
    delSubject(index) {
      this.paper['subjects'].splice(index, 1)
    }
  }
}
</script>

<style scoped>
.drag-item {
  display: flex;
  box-sizing: content-box;
  width: 120px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  border-radius: 8px;
  padding-left: 50px;
  font-size: 14px;
  background-color: #f7f7f7;
  cursor: pointer;
}
.paper-title {
  display: flex;
  justify-content: center;
  font-size: 24px;
}
.paper-sub-title {
  margin-top: 20px;
  display: flex;
  justify-content: left;
  font-size: 14px;
}
.box-col {
  height: 850px;
  overflow: auto;
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
.box-setting-btn {
  margin-top: 10px;
  margin-right: 5px;
  float: right;
}
.box-subject {
  width: 96%;
  margin-left: 5px;
}
.box-grade {
  margin-top: 5px;
  margin-bottom: 0;
  margin-right: 5px;
  display: block;
  float: right;
}
.box-radio {
  width: 92%;
  margin-left: -20px;
}
.box-checkbox {
   width: 92%;
   margin-left: 10px;
 }
.box-tf {
  margin-left: -20px;
}
.box-form-btn {
  text-align: center;
}
.el-card ::v-deep .el-card__header {
  padding-bottom: 8px;
}
.ghost {
  opacity: 0.5;
  background: #8cad64;
  padding-top: 8px;
  padding-bottom: 8px;
}
/** 修改el-card中header或body样式 */
/*
.el-card ::v-deep .el-card__header {
  background-color: lightblue;
}
.el-card ::v-deep .el-card__body {
  background-color: lightblue;
}
*/
</style>
