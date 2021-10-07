<template>
  <div class="container gutter">
    <div class="row">
      <div class="col-4">
        <div class="card shadow m-2 p-2">
          <doughnut-chart></doughnut-chart>
        </div>
      </div>
      <div class="col-4">
        <div class="card shadow m-2 p-2">
          <pie-chart></pie-chart>
        </div>
      </div>
      <div class="col-4">
        <div class="card shadow m-2 p-2">
          <line-chart></line-chart>
        </div>
      </div>
      <div class="col-12">
        <div class="card shadow m-2 p-2">
          <bar-chart></bar-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../../../components/LineChart.vue'
import BarChart from '../../../components/BarChart.vue'
import DoughnutChart from '../../../components/DoughnutChart.vue'
import PieChart from '../../../components/PieChart.vue'

export default {
  components: {
    LineChart,
    BarChart,
    DoughnutChart,
    PieChart
  }
}
</script>