<template>
  <div id="tree">
    <h2>树🌲的演示</h2>
    <el-row>
      <el-col :span="12">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
      </el-col>
    </el-row>
    <el-tree 
      ref="xTree"
      :data="data" 
      :props="defaultProps" 
      show-checkbox
      :accordion="accordion"
      node-key="id"
      :default-expanded-keys="defaultExpandKeys"
      :default-checked-keys="[9]"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode">
    </el-tree>

    <div class="buttons">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
    </div>
    <div>{{clickShow}}</div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        filterText: '',
        clickShow: '',
        accordion: true,
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                  id: 9,
                  label: '三级 1-1-1'
              }, {
                  id: 10,
                  label: '三级 1-1-2',
                  disabled: true
              }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1',
            disabled: true
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultExpandKeys: [4, 3]
      }
  },
  methods: { 
    handleNodeClick(data, node, vnode) {
      console.log(data, node, vnode)
    },
    getCheckedNodes() {
      this.clickShow = this.$refs.xTree.getCheckedNodes();
    },
    getCheckedKeys() {
      this.clickShow = this.$refs.xTree.getCheckedKeys();
    },
    setCheckedNodes() {
      this.$refs.xTree.setCheckedNodes(
        [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
    },
    setCheckedKeys() {
      this.$refs.xTree.setCheckedKeys([3, 5]);
    },
    resetChecked() {
      this.$refs.xTree.setCheckedKeys([]);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.xTree.filter(val)
    }
  }
}
</script>

<style scoped>
#tree {
    margin: 10px;
}
h2 {
    text-align: center;
}
.buttons {
    margin-top: 20px;
    margin-bottom: 10px;
}
</style>

