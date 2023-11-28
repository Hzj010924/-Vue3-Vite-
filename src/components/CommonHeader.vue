<template>
  <header class="header-container">
    <!-- 左边栏 -->
    <div class="l-content">
      <el-button size="small" @click="handleCollapse">
        <el-icon size="20"><Grid /></el-icon>
      </el-button>
      <!--面包屑-->
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>

    <!-- tag栏 -->

    <!-- 右边图片 -->
    <div class="r-content">
      <img src="../assets/images/user.png" alt="" />
    </div>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

let store = useStore();

function handleCollapse() {
  store.commit("updateCollapse");
}

onMounted(() => {});
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
  height: 60px;
  align-items: center;

  .el-header {
    --el-header-padding: 0;
  }
  .l-content {
    display: flex;
    align-items: center;

    .el-button {
      margin-right: 20px;
    }
  }

  .r-content {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
