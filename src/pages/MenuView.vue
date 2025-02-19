<template>
  <div class="menu-view">
    <h1 class="text-center mb-3 fw-bold">Filiallar Statistikasi</h1>
    <div class="grid-container">
      <div ref="pieChart" class="chart"></div>
      <div ref="barChart" class="chart"></div>
      <div ref="lineChart" class="chart"></div>
      <div ref="radarChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import { useBranchStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

export default {
  name: "MenuView",
  setup() {
    const branchStore = useBranchStore();
    const { branches } = storeToRefs(branchStore);

    const pieChart = ref(null);
    const barChart = ref(null);
    const lineChart = ref(null);
    const radarChart = ref(null);

    let pieInstance = null,
      barInstance = null,
      lineInstance = null,
      radarInstance = null;

    const prepareData = () => {
      const branchCounts = {};
      branches.value.forEach((branch) => {
        branchCounts[branch.state] = (branchCounts[branch.state] || 0) + 1;
      });

      return Object.entries(branchCounts).map(([state, count]) => ({
        name: state,
        value: count,
      }));
    };

    const renderCharts = () => {
      const data = prepareData();
      const labels = data.map((item) => item.name);
      const values = data.map((item) => item.value);

      pieInstance = echarts.init(pieChart.value);
      pieInstance.setOption({
        title: { text: "Filiallar bo'yicha taqsimot", left: "center" },
        tooltip: { trigger: "item" },
        series: [{ name: "Filiallar", type: "pie", radius: "50%", data }],
      });

      barInstance = echarts.init(barChart.value);
      barInstance.setOption({
        title: { text: "Filiallar soni (Bar Chart)", left: "center" },
        tooltip: {},
        xAxis: { type: "category", data: labels },
        yAxis: { type: "value" },
        series: [{ name: "Filiallar", type: "bar", data: values }],
      });

      lineInstance = echarts.init(lineChart.value);
      lineInstance.setOption({
        title: { text: "Filiallar soni (Line Chart)", left: "center" },
        tooltip: {},
        xAxis: { type: "category", data: labels },
        yAxis: { type: "value" },
        series: [{ name: "Filiallar", type: "line", data: values }],
      });

      radarInstance = echarts.init(radarChart.value);
      radarInstance.setOption({
        title: { text: "Radar Diagramma", left: "center" },
        tooltip: {},
        radar: {
          indicator: labels.map((name) => ({
            name,
            max: Math.max(...values) + 2,
          })),
        },
        series: [
          {
            name: "Filiallar",
            type: "radar",
            data: [{ value: values, name: "Filiallar" }],
          },
        ],
      });
    };

    onMounted(renderCharts);
    watch(branches, () => {
      pieInstance.dispose();
      barInstance.dispose();
      lineInstance.dispose();
      radarInstance.dispose();
      renderCharts();
    });

    return { pieChart, barChart, lineChart, radarChart };
  },
};
</script>

<style scoped>
.menu-view {
  width: 100%;
  height: calc(100vh - 70px);
}
.menu-view h1 {
  color: #3d4a52;
  margin: 0;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 30px;
}
.chart {
  width: 100%;
  height: 250px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>
