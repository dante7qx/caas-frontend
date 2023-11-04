

<template>
  <div class="app-container">
    <el-row :gutter="20" align="top">
      <el-col :span="6">
        <el-collapse accordion>
          <el-collapse-item title="题目" name="subject">
            <div style="margin-left: 35%">
              <draggable :list="designSubject" :group="{ name: 'paperDesign', pull: 'clone', put: false }">
                <div class="drag-item" v-for="(item, index) in designSubject" :key="index">
                  <svg-icon :icon-class="typeDict[item.type].class" style="margin-top: 12px" /><label>{{ typeDict[item.type].text }}</label>
                </div>
              </draggable>
            </div>
          </el-collapse-item>
          <el-collapse-item title="数据" name="data">
            <div style="height: 850px; overflow: auto;">
              <el-button type="primary" size="small" @click="addPaper">新 增</el-button>
              <el-table :data="tableData" border highlight-current-row @row-click="switchSubject" style="margin-top: 10px; width: 100%">
                <el-table-column type="index" align="center" width="50" />
                <el-table-column prop="paperTitle" header-align="center" align="left" label="标题" />
                <el-table-column prop="createTime" align="center" label="创建时间" width="150" v-if="false" />
                <el-table-column fixed="right" align="center" label="操作" width="90">
                  <template v-slot="scope">
                    <el-button type="danger" size="mini" @click.native.stop="removePaper(scope.row.id, scope.$index)">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="12" class="box-col">
        <el-col>
          <el-card shadow="hover" class="box-card" >
            <el-input v-model="paper.title" placeholder="请输入标题"></el-input>
          </el-card>
        </el-col>
        <draggable v-model="paper.subjects" ghost-class="ghost" @end="endDrag" group="paperDesign">
          <el-col  v-for="(item, index) in paper.subjects" :key="index">
            <el-card shadow="hover" class="box-card" >
              <div slot="header" class="box-header">
                <span>{{ (index + 1) + '. ' }}</span>
                <el-input v-model="item.subject" placeholder="请输入题目" class="box-subject"></el-input>
                <i class="el-icon-delete box-setting-btn" @click="delSubject(index)"></i>
                <i class="el-icon-setting box-setting-btn" @click="setSubject(item)"></i>
                <el-tag size="small" class="box-grade">{{ typeDict[item.type].text }}</el-tag>
              </div>
              <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-if="item.type === 'radio'">
                <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                  <div>
                    <el-radio :label="opt.index" >
                      <span>{{ optDict[idx] + '.' }}</span>
                    </el-radio>
                    <el-input v-model="opt.text" placeholder="请输入选项" class="box-radio"></el-input>
                  </div>
                </div>
              </draggable>
              <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-else-if="item.type === 'checkbox' || item.type === 'un-checkbox'">
                <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                  <div>
                      <el-checkbox :label="opt.index">
                        <span>{{ optDict[idx] + '.' }}</span>
                      </el-checkbox>
                      <el-input v-model="opt.text" placeholder="请输入选项" class="box-checkbox"></el-input>
                  </div>
                </div>
              </draggable>
              <draggable v-model="item.opts" ghost-class="ghost" @end="endDrag" v-else-if="item.type === 'tf'">
                <div v-for="(opt, idx) in item.opts" :key="idx" class="box-item">
                  <div>
                    <el-radio :label="opt.index">
                      <span :style="opt.index === item.correct ? 'background-color: #42b983; color: #fff;' : ''">{{ optDict[idx] + '.' }}</span>
                    </el-radio>
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
                v-else-if="item.type === 'Q&A'"/>
              <span v-else>暂不支持</span>
            </el-card>
          </el-col>
        </draggable>
      </el-col>
      <el-col :span="6">
        <el-tabs v-model="setType">
          <el-tab-pane label="问卷设置" name="subject">
            <el-form ref="paperForm" :model="paperForm" label-width="90px">
              <el-form-item label="问卷时间" prop="qaTime">
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
              <el-form-item label="设置待定">
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
import {listPaper, getPaper, persist, deletePaper} from '@/api/survey'
import draggable from 'vuedraggable'

const SET_OPTION = "option"
const TYPE = "qa"

export default {
  name: "sortableJS",
  components: {
    draggable
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: 0
    },
  },
  data() {
    return {
      queryId: 0,
      tableData: [],
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
        qaTime: null
      },
      optionForm: {
      },
      // 当前选中行
      currentClickRow: {},
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
          ]
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
          ]
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
          ]
        },
        {
          type: 'tf',
          subject: '',
          grade: null,
          opts: [
            {index: 1, text: '正确'},
            {index: 2, text: '错误'},
          ]
        }, {
          type: 'Q&A',
          subject: '',
          grade: null
        }
      ],
      // 问卷
      paper: {},
    }
  },
  created() {
    this.queryId = this.id
    this.getList()
    this.getPaperInfo()
  },
  computed: {
    subTitle: function() {
      const qaTime = this.paper.qaTime != null ? this.paper.qaTime.toString().replace(",", " ~ ") : ''
      return `本试卷共${this.paper.subjects.length}题，答题时间：${qaTime}`
    }
  },
  methods: {
    initPaper() {
      this.paper = {
        title: '',
        qaTime: null,
        subjects: [{
          type: 'radio',
          subject: '从左边拖拽题目，拖拽后将此项删除',
          opts: []
        }]
      }
    },
    endDrag(e) {
      console.log('EndDrag', e);
    },
    // 获取试题
    getList() {
      const param = { type: TYPE }
      listPaper(param).then(data => {
        this.tableData = data
      }).catch(error => console.error(error));
    },
    switchSubject(row, column, event) {
      this.currentClickRow = row
      this.queryId = row.id
      this.getPaperInfo()
    },
    getPaperInfo() {
      if(this.queryId > 0) {
        getPaper(this.queryId).then(data => {
          this.paper = data['paperInfo']
          this.fillPaperForm(this.paper)
        }).catch(error => console.error(error));
      } else {
        this.initPaper();
      }
    },
    fillPaperForm(paper) {
      this.paperForm.qaTime = paper.qaTime
    },
    addPaper() {
      this.queryId = 0
      this.getPaperInfo()
    },
    // 试卷设置
    fillPaper(paperForm) {
      this.paper.qaTime = paperForm.qaTime
    },
    confirmPaper() {
      this.fillPaper(this.paperForm)
    },
    submitPaper() {
      this.fillPaper(this.paperForm)
      persist({ id: this.queryId, type: TYPE, paperInfo: this.paper }).then((data) => {
        console.log(data);
        this.getList();
        this.$message.success('发布成功！');

      }).catch(error => console.error(error));
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
      console.log('设置待定')
    },
    delSubject(index) {
      this.paper['subjects'].splice(index, 1)
    },
    removePaper(id, index) {
      this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePaper(id).then(resp => {
          this.tableData.splice(index, 1);
          if(this.tableData.length > 0) {
            this.queryId = this.currentClickRow.id
            this.getPaperInfo()
          } else {
            this.addPaper()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    redirect() {
      let routeUrl = this.$router.resolve({path: "/qa"});
      window.open(routeUrl.href, '_blank');
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
</style>
