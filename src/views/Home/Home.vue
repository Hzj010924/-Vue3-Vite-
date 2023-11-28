<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 用户信息 -->
        <el-card class="user-card" shadow="hover">
          <div class="user-header">
            <img src="src\assets\images\user.png" />
            <div class="user-info">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2024-11-20</span></p>
            <p>上次登录地点：<span>北京</span></p>
          </div>
        </el-card>
        <!-- 商品列表  -->
        <el-card class="shop-card" shadow="hover">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(key, val) in tableLabel"
              :key="key"
              :label="key"
              :prop="val"
            />
          </el-table>
        </el-card>
      </el-col>
      
      <el-col :span="16">
        <!-- 图标 -->
        <div class="num">
          <el-card
            shadow="hover"
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <el-icon :style="{ background: item.color }">
              <!-- 动态组件 -->
              <component :is="item.icon"></component>
            </el-icon>
            <div class="detail">
              <p class="txt">{{ item.name }}</p>
              <p class="price">￥{{ item.value }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card>
          <div id="echart1" style="height: 280px"></div>
        </el-card>

        <div class="graph">
            <!-- 柱状图 -->
            <el-card  shadow="hover">
                <div id="echart2" style="height: 280px"></div>
            </el-card>
            <!-- 饼图 -->
            <el-card  shadow="hover">
                <div id="echart3" style="height: 280px"></div>
            </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, getCurrentInstance} from "vue";
import axios from "axios";
import * as echarts from "echarts";



const tableLabel = {
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
};

let tableData = ref([]);

const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "Lock",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 210,
    icon: "Star",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "Goods",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "Lock",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 210,
    icon: "Star",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "Goods",
    color: "#5ab1ef",
  },
];

// 折线图配置项
const order_option = reactive({
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [],
});

// 柱状图配置项
const user_option = reactive({
  tooltip: {
    trigger: "axis",
    // axisPointer: {
    //   type: "cross",
    // },
  },
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [],
});

// 饼图配置项
const video_option = reactive({
  legend: {
    bottom: 20,
  },
  series: [],
});

async function getTableList() {
  await axios.get("/home/getData").then((res) => {
    // 商品信息
    tableData.value = res.data.data.tableData;
    console.log(res);
    // 折线图
    const order = res.data.data.orderData;
    // console.log(order);
    order_option.xAxis.data = order.date;
    let keyArray = Object.keys(order.data[0]);
    // 第二步，循环添加数据
    keyArray.forEach((key) => {
      order_option.series.push({
        name: key,
        data: order.data.map((item) => item[key]),
        type: "line",
      });
    });

    // 柱状图
    const user = res.data.data.userData;
    console.log(user)
    user_option.xAxis.data=user.map((item) =>item.date)
    user_option.series.push({
        name:'新增用户',
        data:user.map(item =>item.new),
        type: "bar",
    })

    user_option.series.push({
        name:'活跃用户',
        data:user.map(item =>item.active),
        type: "line",
    })

    // 饼图
    video_option.series.push({
        data: res.data.data.videoData,
        type: "pie"
    })

    var myChart1 = echarts.init(document.getElementById('echart1'));
    myChart1.setOption(order_option);

    var myChart2 = echarts.init(document.getElementById('echart2'));
    myChart2.setOption(user_option);

    var myChart3 = echarts.init(document.getElementById('echart3'));
    myChart3.setOption(video_option);
  });
}

getTableList();

</script>

<style lang="less" scoped>
.home {
  .user-card {
    .user-header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;

      img {
        width: 150px;
        height: 150px0px;
        border-radius: 50%;
      }

      .user-info {
        margin-left: 20px;
        .name {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .access {
          color: #999999;
        }
      }
    }

    .login-info {
      margin-top: 20px;
      p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
          color: #666666;
          margin-left: 60px;
        }
      }
    }
  }

  .shop-card {
    margin-top: 20px;
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
      .el-icon {
        font-size: 30px;
        width: 110px;
        height: 110px;
        text-align: center;
        line-height: 110px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 110px;

        .price {
          font-size: 25px;
          margin-bottom: 10px;
        }

        .txt {
          font-size: 14px;
          text-align: center;
          color: #999999;
        }
      }
    }
  }
  
  .graph{
    display: flex;
    justify-content: space-between;

    .el-card{
        margin-top: 20px;
        width: 48%;
    }

  }
}
</style>
