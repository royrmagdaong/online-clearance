<template>
  <div>
    <div class="px-5 py-4 card shadow-sm">
      
      <div class="d-md-none my-4">
        <div style="width:120px;height:120px;;border-radius:50%;position:relative;" class="mx-auto d-block">
          <img @click="openChangePicModal" class="prof-pic" :src="`${endpoints.viewDeptProfilePic}/${get(department, 'profile_pic.filename')}`" />
        </div>
        <div class="d-flex justify-content-center">
          <img :src="signature" alt="Signature" style="width:160px; height:auto;">
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <div class="h3 mb-2">{{ get(department, 'department_name') }}</div>
          <!-- <b-icon class="edit-info ml-2" icon="pencil" variant="primary" font-scale="1"></b-icon> -->
        </div>
        <div class="text-center">{{ get(department, 'in_charge') }}</div>
        <div class="text-center">{{ get(department, 'email') }}</div>
      </div>

      <div class="d-none d-md-block">
        <div class="d-flex justify-content-between align-items-center">
          <div class="h3 mb-2">{{ get(department, 'department_name') }}</div>
          <!-- <b-icon class="edit-info" icon="pencil" variant="primary" font-scale="1"></b-icon> -->
        </div>
        <div class="">{{ get(department, 'in_charge') }}</div>
        <div class="">{{ get(department, 'email') }}</div>
        <div>
          <span class="mr-4">Signature</span>
          <img :src="signature" alt="Signature" style="width:160px; height:auto;">
        </div>
      </div>

      

    </div>
    <div class="row no-gutters">
      <div class="col-12 col-sm-6 mt-2">
        <div class="px-4 py-4 mr-sm-1 card shadow-sm">
          <div class="text-center font-weight-bold">Current Semester</div>
          <pie-chart 
            :height="250" 
            :width="250" 
            v-if="loaded"
            :chartdata="chartdata"
            :options="options" 
          ></pie-chart>
        </div>
      </div>
      <div class="col-12 col-sm-6 mt-2">
        <div class="px-4 py-4 ml-sm-1 card shadow-sm">
          <div class="text-center font-weight-bold">Overall</div>
          <pie-chart 
            :height="250" 
            :width="250" 
            v-if="loaded2"
            :chartdata="chartdata2"
            :options="options" 
          ></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {get} from 'lodash'
import endpoints from '../../../endpoints'
import {toast} from '../../../mixins/toast'
import PieChart  from '../../../components/PieChart.vue'

export default {
  components:{
    'pie-chart': PieChart
  },
  mixins: [toast],
  data:()=>({
    endpoints,
    get,
    signature: null,
    loaded: false,
    loaded2: false,
    chartdata: null,
    chartdata2: null,
    labels: ["Approved",	"Dispproved",	"Pending"],
    borderWidth: 1,
    borderColor: [
      '#aaa',
      '#aaa',
      '#aaa',
    ],
    backgroundColor: [       
      'rgba(86,182,107,0.7)',
      'rgba(219,105,9,0.4)',
      'rgba(200,193,7,0.3)'
    ],
    options: {
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed:{
    schoolYear(){
      return this.$store.getters['departmentBase/getSchoolYear']
    },
    department(){
      return this.$store.getters['departmentDashboard/getDepartment']
    },
    currentClearanceData(){
      return this.$store.getters['departmentDashboard/getCurrentClearanceData']
    },
    clearanceData(){
      return this.$store.getters['departmentDashboard/getClearanceData']
    }
  },
  mounted(){
    this.getDepartment()
    // fetch school year and then fetch current clearance data
    this.getSchoolYear()
    this.getClearaceData()
  },
  methods:{
    getSchoolYear(){
      this.$store.dispatch('departmentBase/getSchoolYear').then(res=>{
        if(res.response){
          this.getCurrentClearaceData()
        }
      })
    },
    getDepartment(){
      this.$store.dispatch('departmentDashboard/getDepartment').then(res=>{
        if(res.response){
          this.signature = `data:${get(this.department,'signature.type')};${get(this.department,'signature.base')},${get(this.department,'signature.img')}`
        }
      })
    },
    getCurrentClearaceData(){
      try {
        this.loaded = false
        this.$store.dispatch('departmentDashboard/getCurrentClearanceData',{
          academic_year: get(this.schoolYear, 'ACADEMIC_YEAR'),
          semester: get(this.schoolYear, 'SEMESTER')
        }).then(res=>{
          if(res.response){
            console.log(res.data)
            this.chartdata = {
              labels:this.labels,
              datasets: [{
                  borderWidth: this.borderWidth,
                  borderColor: this.borderColor,
                  backgroundColor: this.backgroundColor,
                  data: this.currentClearanceData
                }]
            }
            this.loaded = true
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    getClearaceData(){
      try {
        this.loaded2 = false
        this.$store.dispatch('departmentDashboard/getClearanceData').then(res=>{
          if(res.response){
            console.log(res.data)
            this.chartdata2 = {
              labels:this.labels,
              datasets: [{
                  borderWidth: this.borderWidth,
                  borderColor: this.borderColor,
                  backgroundColor: this.backgroundColor,
                  data: this.clearanceData
                }]
            }
            this.loaded2 = true
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    openChangePicModal(){
      this.$root.$emit('openChangePicModal')
    },
    // onChange (event) {
    //   this.signature = event.target.files[0]
    // },
    // async uploadFile(){
    //   if(this.signature){
    //     const formData = new FormData()
    //     formData.append('signature',this.signature)
    //     await this.$store.dispatch('departmentDashboard/uploadSignature',formData).then(res=>{
    //       if(res.response){
    //         this.getDepartment()
    //       }
    //     }).catch(err=>{
    //       console.log(err)
    //     })
    //   }else{
    //     console.log('choose image')
    //   }
    // }
  }
}
</script>

<style scoped>
.prof-pic{
  background-color: #eee !important;
  height: 120px;
  width: 120px;
  border-radius: 60px;
}
.prof-pic:hover{
  opacity: 0.4;
  cursor: pointer;
}
</style>