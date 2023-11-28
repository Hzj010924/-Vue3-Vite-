<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="dialogFormVisible = true"
        >+ 新增</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width ? item.width : 125"
      />
      <el-table-column width="180px" label="操作">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="config.total"
      v-model:current-page="config.page"
      @current-change="changePage"
      :page-size="config.limit"
    />
    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" title="新增用户">
        
        <!-- 用户信息区 -->
        <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birth"
              value-format="yyyy-MM-DD"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <!-- 页脚 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import service from "../../mock/request";
//对话框隐藏属性
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
  addr: "",
  age: "",
  birth: "",
  sex: "",
});

const rules = {
  name: [{ required: true, message: "请输入名字" }],
  age: [{ required: true, message: "请输入年龄" }],
  sex: [{ required: true, message: "请选择性别" }],
  birth: [{ required: true, message: "请选择出生日期" }],
  addr: [{ required: true, message: "请输入地址" }],
};

let tableData = ref([]);

const tableLabel = [
  {
    field: "name",
    label: "姓名",
  },
  {
    field: "age",
    label: "年龄",
  },
  {
    field: "sexLabel",
    label: "性别",
  },
  {
    field: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    field: "addr",
    label: "地址",
    width: 320,
  },
];

const config = reactive({
  page: 1,
  total: 10, //总记录条数
  limit: 5, //每页几条
  loading: false,
});

async function getUser() {
  // 路由传参
  let res = await service.get("/user/getUser", {
    params: {
      page: config.page,
      limit: config.limit,
      name,
    },
  });
  console.log(res);
  tableData.value = res.list.map((item) => {
    // 新建属性到对象中
    item.sexLabel = item.sex === 0 ? "女" : "男";
    return item;
  });
  // console.log(tableData)
  config.total = res.count;
  config.loading = false;
}

function changePage() {
  getUser();
}

getUser();
</script>

<style lang="less" scoped></style>
