<template>
  <div id="table">
      <h2>表格演示</h2>
      <div style="margin: 10px;">
        <el-button type="success" size="mini" @click="common" :autofocus="true">普通</el-button>
        <el-button type="success" size="mini" @click="table.stripe = true">斑马线</el-button>
        <el-button type="success" size="mini" @click="table.border = true">边框</el-button>
        <el-button type="success" size="mini" @click="table.showSummary = !table.showSummary">显示合计</el-button>
        <el-button size="mini" plain @click="selectRow(datas[2])">选中第3行</el-button>
        <el-button size="mini" plain @click="selectRow()">取消单选</el-button>
        <el-button size="mini" plain @click="toggleSelection([datas[3], datas[4]])">选中第4，5行</el-button>
        <el-button size="mini" plain @click="toggleSelection()">取消多选</el-button>
      </div>
			<right-toolbar />
      <el-table 
        ref="tableList"
        :data="datas" 
        row-key="id"
        :stripe="table.stripe"
        :border="table.border"
        style="width: 100%; margin-bottom: 20px;"
        :max-height="tableHeight"
        :highlight-current-row="true"
        tooltip-effect="dark"
        :show-summary="table.showSummary"
        :summary-method="getSummaries"
        @row-click="rowClick"
        :default-sort="{prop: 'age', order: 'descending'}"
        @sort-change="sortChange"
        >
				<el-table-column type="selection" width="55" header-align="center" align="center"/>
				<el-table-column type="index" width="40" header-align="center" align="center"/>
				<el-table-column prop="name" label="姓名" width="100" header-align="center" :show-overflow-tooltip="true"/>
				<el-table-column 
					prop="age" 
					label="年龄" 
					width="100" 
					header-align="center" 
					align="center" 
					:sortable="true"
					:filters="filter.age"
					:filter-method="filterHandler"/>
				<el-table-column label="地址信息" header-align="center">
					<el-table-column prop="city" label="城市" width="70" header-align="center" align="center"/>
					<el-table-column prop="zip" label="邮政编码" width="100" header-align="center">
							<template slot-scope="scope">
									<el-input v-model="scope.row.zip" placeholder="请输入内容" ></el-input>
							</template>
					</el-table-column>
        </el-table-column>
				<el-table-column prop="num1" label="数值1" header-align="center" align="center"/>
				<el-table-column prop="num2" label="数值2" header-align="center" align="center"/>
				<el-table-column prop="num3" label="数值3" header-align="center" align="center"/>
				<el-table-column prop="email" label="邮箱" header-align="center"/>
				<el-table-column fixed="right" label="操作" width="100" header-align="center" align="center">
						<template slot-scope="scope">
								<el-button type="text" plain size="small" icon="el-icon-edit"></el-button>
								<el-button type="text" plain size="small" icon="el-icon-delete" @click.native.prevent="delRow(scope.$index, datas)"></el-button>
						</template>
				</el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import math from 'mathjs';
import RightToolbar from '../components/third/RightToolbar.vue'

export default {
	components: { RightToolbar },
  data() {
		return {
			table: {
				stripe: false,
				border: false,
				showSummary: true,
				height: 500
			},
			datas: [
				{
						id: 1, name: "但丁12345678901234567890", age: 33, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{   
						id: 2, name: "但丁2", age: 32, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 3, name: "但丁3", age: 31, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 4, name: "但丁4", age: 30, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 6, name: "但丁5", age: 29, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 7, name: "但丁6", age: 28, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 8, name: "但丁7", age: 27, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 9, name: "但丁8", age: 26, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 10, name: "但丁9", age: 25, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				},
				{
						id: 11, name: "但丁10", age: 24, email: "ch.sun@haihangyun.com", city: "北京", zip: "10013",
						num1: 32.22, num2: 43.22, num3: 876
				}
			],
			filter: {
				age: [{text:'33',value:33},{text:'32',value:32},{text:'31',value:31},{text:'30',value:30}]
			}
		}
  },
  computed: {
      tableHeight() {
          return this.table.height + (this.datas.length / 4 * 60);
      }
  },
  methods: {
      common() {
        this.table.stripe = false;
        this.table.border = false;
      },
      rowClick(row, event, column) {
          console.log(row)
          console.log(event)
          console.log(column)
          this.$refs.tableList.toggleRowSelection(row);
      },
      delRow(index, datas) {
          datas.splice(index, 1)
      },
      selectRow(row) {
          this.$refs.tableList.setCurrentRow(row);
      },
      toggleSelection(rows) {
          if(rows) {
              rows.forEach(row => {
                this.$refs.tableList.toggleRowSelection(row);
              })
          } else {
              this.$refs.tableList.clearSelection();
          }
      },
      sortChange({column, prop, order}) {
          console.log(`排序字段 ${prop}，排序顺序 ${order}`)
      },
      filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
      },
      getSummaries(param) {
          const {columns, data} = param;
          const sums = [];
          columns.forEach((column, index) => {
              if(index === 0) {
                  sums[index] = '总价';
                  return;
              }
              // 将每列的内容转化为数值类型
              const values = data.map(item => Number(item[column.property]));
              // 列内容不得含有非数值类型
              if(!values.every(v => isNaN(v))) {
                  sums[index] = values.reduce((prev, cur) => {
                      const value = Number(cur);
                      if(!isNaN(value)) {
                         return math.round(math.add(prev, cur), 2);
                      } else {
                          return prev;
                      }
                  });
                  if(index == 1) {
                    sums[index] += "岁";
                  } else {
                    sums[index] += "元";
                  }
                  
                  
              } else {
                  sums[index] = "";
              }
          });
          return sums;
      }
  }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
.page {
    text-align: center;
}
</style>

