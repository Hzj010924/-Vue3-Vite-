<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3>{{ $store.state.isCollapse ? "智慧仓库管理系统" : "智慧仓库" }}</h3>
      <el-menu-item
        v-for="item in noChildren()"
        :key="item.path"
        :index="item.path"
        @click="clickMenu(item)"
      >
        <!-- 动态组件 -->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu v-for="item in hasChildren()" >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item
          v-for="(subitem, subindex) in item.children"
          :key="subindex"
          :index="subitem.path"
          @click="clickMenu(subitem)"
        >
          <template #title>
            <component class="icons" :is="subitem.icon"></component>
            <span>{{ subitem.label }}</span>
          </template></el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRouter } from "vue-router";

let router = useRouter();

const list = [
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: "House",
    url: "Home/Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "MallManage/MallManage",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];

//筛选出导航栏中没有孩子的项
const noChildren = () => {
  return list.filter((item) => !item.children);
};

//筛选出导航栏中有孩子的项
const hasChildren = () => {
  return list.filter((item) => item.children);
};

//路由切换
function clickMenu(item) {
  
  router.push({
    name: item.name,
  });
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100vh;
  text-align: center;
  border-right: none;
  .icons {
    width: 16px;
    height: 16px;
  }
}
</style>
