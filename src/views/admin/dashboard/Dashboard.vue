<template>
  <div class="row no-gutters" >
    <div class="col-12 col-md-6 p-2">
      <div class="card shadow py-lg-4 py-md-2 px-md-4 p-3 px-sm-3 text-center mt-2" style="height:100%;">
        <h6>Users</h6>
        <PieChart 
          :height="250" 
          :width="250" 
          v-if="loaded"
          :chartdata="chartdata"
          :options="options"
        />
      </div>
    </div>
    <div class="col-12 col-md-6 p-2">
      <div class="card shadow py-lg-4 py-md-2 px-md-4 p-3 px-sm-3 text-center mt-2 mx-md-2" style="height:100%;">
        <h6>Students</h6>
        <PieChart 
          :height="250" 
          :width="250" 
          v-if="loaded2"
          :chartdata="chartdata2"
          :options="options"
        />
      </div>
    </div>
    <div class="col-12 p-2">
      <div class="card shadow py-lg-4 py-md-2 px-md-4 p-3 px-sm-3 text-center mt-2 mt-md-3">
        <LineChart />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../../../components/LineChart.vue'
import PieChart from '../../../components/PieChart.vue'

export default {
  components: {
    LineChart,
    PieChart
  },
  data(){
    return{
      chartdata: null,
      loaded: false,
      chartdata2: null,
      loaded2: false,
      chartdata3: null,
      loaded3: false,
      labels: ["Admins",	"Students",	"Departments"],
      borderWidth: 1,
      borderColor: [
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
        '#aaa',
      ],
      backgroundColor: [       
        'rgba(86,182,107,0.7)',
        'rgba(219,105,9,0.4)',
        'rgba(200,193,7,0.3)',
        '#a1995e44',
        '#bc43b444',
        '#4c43bc44',
        '#2eaad144',
        '#00ffd244',
        '#9613ec44',
        '#f7d30844',
        '#fa058d44',
        '#7aa05f44',
        '#9d627b44',
        '#738b8c44',
        '#37a8c844',
        '#0df22a44',
      ],
      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },
    }
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
    // this.$store.dispatch('adminDashboard/getDepartmentsCount')
    this.getUserCharts()
    this.getStudentChart()
    // this.$store.dispatch('adminDashboard/getUsersCount')
  },
  methods:{
    getUserCharts(){
      this.$store.dispatch('adminDashboard/getStudentsCount').then(res=>{
        if(res.response){
          this.chartdata = {
            labels:this.labels,
            datasets: [{
              borderWidth: this.borderWidth,
              borderColor: this.borderColor,
              backgroundColor: this.backgroundColor,
              data: this.usersCount
            }]
          }
          this.loaded = true
        }
      })
    },
    getStudentChart(){
      this.$store.dispatch('adminDashboard/getStudentsByCourseCount').then(res=>{
        if(res.response){
          this.chartdata2 = {
            labels: res.codes,
            datasets: [{
              borderWidth: this.borderWidth,
              borderColor: this.borderColor,
              backgroundColor: this.backgroundColor,
              data: res.data
            }]
          }
          this.loaded2 = true
        }
      })
    },
  }
}
</script>