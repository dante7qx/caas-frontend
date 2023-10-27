<template>
  <div class="app-container">
    <el-button @click="handleDetail">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleDetail(scope.row)">{{scope.row.id}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="描述" prop="desc" />
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row, 0)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleDetail(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <!--
      <table-detail :key="new Date().getTime()" v-bind:data="tableRowData" @closeWindow="closeWindow"/>
      -->
      <table-detail :key="uuid()" v-bind:data="tableRowData" @closeWindow="closeWindow"/>
    </el-dialog>
  </div>
</template>
<script>
  import Detail from './detail.vue'
  export default {
    components: {
      "table-detail": Detail
    },
    data() {
      return {
        title: "",
        open: false,
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔1',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店1',
          shopId: '10331'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔2',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店2',
          shopId: '10332'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔3',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店3',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔4',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店3',
          shopId: '10333'
        }],
        tableRowData: {}
      }
    },
    methods: {
      handleDetail(row, editable = 1) {
        if(editable === 1) {
          this.title = "修改表格表单";
        } else {
          this.title = "查看表格表单";
        }
        this.open = true;
        this.tableRowData = Object.assign({}, row !== null ? row: {});
        this.tableRowData.editable = editable;
        // this.tableRowData = row;  传递对象(或数组)引用，子组件会修改父组件的值，所以不能直接传递
      },
      closeWindow() {
        this.open = false;
        this.title = "";
      }
    }
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
    margin-left: 50px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
