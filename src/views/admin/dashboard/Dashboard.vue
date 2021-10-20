<template>
  <div class="container gutter">
    <div class="row">
      
      <div class="col-4">
        <div class="card shadow m-2 p-2 text-center">
          <h6>Number of Students</h6>
          <h4>{{ studentsCount }}</h4>
        </div>
      </div>
      <div class="col-4">
        <div class="card shadow m-2 p-2 text-center">
          <h6>Number of Head Departments</h6>
          <h4>{{ departmentsCount }}</h4>
        </div>
      </div>
      <div class="col-4">
        <div class="card shadow m-2 p-2 text-center">
          <h6>Number of Users</h6>
          <h4>{{ usersCount }}</h4>
        </div>
      </div>

      <!-- <div class="col-4">
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
      </div> -->
    </div>
  </div>
</template>

<script>
// import LineChart from '../../../components/LineChart.vue'
// import BarChart from '../../../components/BarChart.vue'
// import DoughnutChart from '../../../components/DoughnutChart.vue'
// import PieChart from '../../../components/PieChart.vue'

export default {
  components: {
    // LineChart,
    // BarChart,
    // DoughnutChart,
    // PieChart
  },
  computed: {
    usersCount(){
      return this.$store.getters['adminDashboard/getUsersCount']
    },
    departmentsCount(){
      return this.$store.getters['adminDashboard/getDepartmentsCount']
    },
    studentsCount(){
      return this.$store.getters['adminDashboard/getStudentsCount']
    },
  },
  mounted(){
    this.$store.dispatch('adminDashboard/getDepartmentsCount')
    this.$store.dispatch('adminDashboard/getStudentsCount')
    this.$store.dispatch('adminDashboard/getUsersCount')
  },
}
</script>