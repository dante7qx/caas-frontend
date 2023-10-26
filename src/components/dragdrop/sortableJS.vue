

<template>
  <div class="app-container">
    <h2 style="text-align: center;">SortableJS 拖拽示例 - http://sortablejs.github.io/Sortable</h2>
    <el-row :gutter="20" align="top">
      <el-col :span="8">
        <div style="border: 1px #ebeef4 solid; height: 850px; overflow: auto;">
          <pre style="margin-top: 0"><code class="hljs" v-html="resultJson"></code></pre>
        </div>
      </el-col>
      <el-col :span="10" class="box-col">
      <draggable v-model="subjects" ghost-class="ghost" @end="endDrag">
        <el-col  v-for="(item, index) in subjects" :key="index">
          <el-card shadow="hover" class="box-card">
            <div slot="header" class="box-header">
              <span>{{ (index + 1) + '. ' }}</span>
              <el-input v-model="item.subject" placeholder="请输入题目" class="box-subject"></el-input>
              <el-tag effect="plain" size="small" class="box-grade">{{ item.grade + '分' }}</el-tag>
            </div>
            <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-if="item.type === 'radio'">
              <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                <div v-if="design">
                  <el-radio :label="opt.answer" >
                    <span :style="opt.answer === 1 ? 'background-color: #42b983; color: #fff;' : ''">{{ optionDict[idx] + '.' }}</span>
                  </el-radio>
                  <el-input v-model="opt.text" placeholder="请输入选项" class="box-radio"></el-input>
                </div>
                <div v-else>
                  <el-radio v-model="item.answer" :label="opt.index">{{ optionDict[idx] + '.' }}</el-radio>
                  <el-input v-model="opt.text" placeholder="请输入选项" class="box-radio"></el-input>
                </div>
              </div>
            </draggable>
            <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-else-if="item.type === 'checkbox'">
              <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                <div v-if="design">
                    <el-checkbox :label="opt.answer" :style="opt.answer === 1 ? 'color: forestgreen;' : ''">
                      <span :style="opt.answer === 1 ? 'background-color: #42b983; color: #fff;' : ''">{{ optionDict[idx] + '.' }}</span>
                    </el-checkbox>
                    <el-input v-model="opt.text" placeholder="请输入选项" class="box-checkbox"></el-input>
                </div>
                <div v-else>
                  <el-checkbox-group v-model="item.answer">
                    <el-checkbox v-model="item.answer" :label="opt.index">{{ optionDict[idx] + '.' }}</el-checkbox>
                    <el-input v-model="opt.text" placeholder="请输入选项" class="box-checkbox"></el-input>
                  </el-checkbox-group>
                </div>
              </div>
            </draggable>
            <span v-else>暂不支持</span>
          </el-card>
        </el-col>
      </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
// gradient-light.min.css、gradient-dark.min.css、monokai.min.css
import "highlight.js/styles/nord.min.css"
hljs.registerLanguage("json", json)

export default {
  name: "sortableJS",
  components: {
    draggable
  },
  data() {
    return {
      design: true, // 设计阶段 true、答题阶段 false
      subjects: [{
        type: 'radio',
        subject: '【单选】下面那个称呼是描述北斗七星中的一颗？',
        grade: 2,
        opts: [
          {index: 1, text: '祈安', answer: 0},
          {index: 2, text: '山葵', answer: 0},
          {index: 3, text: '瑶光', answer: 1},
          {index: 4, text: '化神', answer: 0},
        ],
        answer: 0
      },{
        type: 'checkbox',
        subject: '【多选】下面那种蛇是毒蛇？',
        grade: 3,
        opts: [
          {index: 1, text: '黑曼巴', answer: 1},
          {index: 2, text: '菜花蛇', answer: 0},
          {index: 3, text: '太攀蛇', answer: 1},
          {index: 4, text: '森蚺', answer: 0},
        ],
        answer: []
      },{
        type: 'checkbox',
        subject: '【不定项选择】以下属于营运资本项目的是？',
        grade: 5,
        opts: [
          {index: 1, text: '应收票据', answer: 1},
          {index: 2, text: '应付职工薪酬', answer: 1},
          {index: 3, text: '固定资产', answer: 0},
          {index: 4, text: '应交税费', answer: 1},
        ],
        answer: []
      }],

      optionDict: { 0: 'A', 1: 'B', 2: 'C', 3: 'D' }
    }
  },
  computed: {
    resultJson: function () {
      const json = JSON.stringify(this.subjects, null, 2)
      return hljs.highlight(json, {language: 'json'}).value
    }
  },
  methods: {
    endDrag(e) {
      console.log('EndDrag', e);
    }
  }
}
</script>

<style scoped>
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
  margin-bottom: 0;
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

.ghost {
  opacity: 0.5;
  background: #8cad64;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
