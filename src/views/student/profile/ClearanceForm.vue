<template>
  <div>
    <div v-if="clearanceForms.length<1" class="">
      <div class="h5 card p-4 shadow-sm">You don't have clearance form yet.</div>
    </div>
  
    <div v-else>
      <div v-for="(clearance,index) in clearanceForms" :key="index">
        <div v-if="get(clearance, 'request_approved')" :class="{'done':get(clearance, 'outdated')}">
          <div class="card" :class="{'done':get(clearance, 'outdated')}">
            <div class="px-2 py-2">
              <div class="d-flex justify-content-between">
                <div>
                  <span><b class="pr-2 pl-1">Name: </b> </span>
                  <span>{{get(studentInfo, 'first_name')}} {{get(studentInfo, 'last_name')}}</span>
                </div>
                <span class="text-success font-weight-bold mr-2" v-if="get(clearance, 'completed')">COMPLETED</span>
              </div>
              <span class="pr-4"><b class="pr-2 pl-1">Course:</b> {{get(clearance, 'course')}}</span>
              <span class="pr-4"><b class="pr-2 pl-4">Year/Section:</b> {{get(clearance, 'year_level').substring(0,1)}}{{get(clearance, 'section')}}</span>
              <br>
              <span class="pr-4"><b class="pr-2 pl-1">Semester:</b> {{get(clearance, 'semester')}}</span>
              <span><b class="pr-2 pl-4">Academic Year:</b> {{get(clearance, 'academic_year')}}</span>
            </div>
          </div>
          <b-table bordered :items="departments" :fields="fields" responsive>
            <template #cell(status)="row">
              <span :class="{
                'text-warning':displayStatus(row.item, clearance)==='Pending', 
                'text-success':displayStatus(row.item, clearance)==='Approved',
                'text-danger':displayStatus(row.item, clearance)==='Disapproved',
              }"
              v-if="!get(clearance, 'outdated')"
              >
                {{ displayStatus(row.item, clearance) }}
              </span>
              <span v-else>{{ displayStatus(row.item, clearance) }}</span>
            </template>
            <template #cell(actions)="row">
              <div class="d-flex justify-content-center">
                <b-button 
                  size="sm" 
                  variant="info" 
                  @click="requestSignature(row.item, clearance)" 
                  :disabled="get(clearance, 'outdated')"
                  v-if="
                    (displayStatus(row.item, clearance)!=='Approved' &&
                    displayStatus(row.item, clearance)!=='Disapproved' &&
                    displayStatus(row.item, clearance)!=='Pending' )
                    &&
                    !get(clearance, 'outdated')
                  "
                >
                  Request Signature
                </b-button>
              </div>
            </template>
          </b-table>
        </div>
        <div v-else>
          <div class=" card shadow-sm p-4 mb-3 pending">
            <span>
              Your clearance form in 
              <span class="font-italic font-weight-bold">{{ get(clearance, 'semester') }}</span> 
              semester on academic year 
              <span class="font-italic font-weight-bold">{{ get(clearance, 'academic_year') }}</span> 
              is waiting for approval.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <b-button variant="success" @click="requestFormModal = true">Request Form</b-button>
    </div>

    <!-- modal -->
    <b-modal title="Request Clearance Form" hide-footer hide-header-close no-close-on-backdrop :visible="requestFormModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <label>Semester</label>
            <b-form-select v-model="selected_semester" :options="semester_options"></b-form-select>
          </div>
          <div class="col-6 pl-1">
            <label>Academic Year</label>
            <b-form-select v-model="selected_academic_year" :options="academic_year_options"></b-form-select>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="request">Save</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {toast} from '../../../mixins/toast'
import {get} from 'lodash'

export default {
  mixins: [toast],
  data:()=>({
    get,
    fields:['in_charge',"department_name",'signature',{key: 'status', label: 'Status'}, {key: 'actions', label: ''}],
    selected_semester: '',
    selected_academic_year: '',
    semester_options: ['1st', '2nd'],
    academic_year_options: [],
    requestFormModal: false,
    tableKey: 0,
  }),
  computed:{
    studentInfo(){
      return this.$store.getters['studentInfo/getStudentInfo']
    },
    userInfo(){
      return this.$store.getters['auth/getUserInfo']
    },
    departments(){
      return this.$store.getters['studentClearanceForm/getDepartments']
    },
    clearanceForms(){
      return this.$store.getters['studentClearanceForm/getClearanceForms']
    },
  },
  mounted(){
    this.getStudentInfo()
    this.getYears()
  },
  methods:{
    cancel(){
      this.requestFormModal = false
      this.selected_semester = ''
      this.selected_academic_year = ''
    },
    getYears(){
      let curYear = new Date().getFullYear()
      let prevYear = curYear-1

      for(let i = 0; i<2; i++){
        this.academic_year_options.push((prevYear+i).toString()+'-'+(curYear+i).toString())
      }
    },
    getStudentInfo(){
      this.userId = this.userInfo.id
      this.$store.dispatch('studentInfo/getStudentInfo', {id: this.userId}).then(res=>{
        if(res.response){
          this.getClearance()
          this.getDepartments(get(this.studentInfo, 'course'))
        }
      })
    },
    getClearance(){
      this.$store.dispatch('studentClearanceForm/getClearanceForms',{student: get(this.studentInfo, '_id')})
    },
    getDepartments(course){
      this.$store.dispatch('studentClearanceForm/getDepartments', {course: course})
    },
    request(){
      if(this.selected_semester === ''){
        this.makeToast(this, false, 'Request error', 'Please select semester', 3000, 'danger')
      }else if(this.selected_academic_year === ''){
        this.makeToast(this, false, 'Request error', 'Please select academic year', 3000, 'danger')
      }else{
        this.$store.dispatch('studentClearanceForm/requestClearanceForm',{
          student: get(this.studentInfo, '_id'),
          academic_year: this.selected_academic_year,
          semester: this.selected_semester,
          course: get(this.studentInfo, 'course'),
          section: get(this.studentInfo, 'section'),
          year_level: get(this.studentInfo, 'year_level')
        }).then(res=>{
          if(res.response){
            this.makeToast(this, false, 'Request Successful', res.message, 4000, 'success')
            this.getClearance()
            this.requestFormModal = false
            this.selected_semester = ''
            this.selected_academic_year = ''
          }else{
            this.makeToast(this, false, 'Request Failed', res.message, 5000, 'danger')
          }
        }).catch(err=>{
          this.makeToast(this, false, 'Request Failed', err.message, 5000, 'danger')
          this.requestFormModal = false
          this.selected_semester = ''
          this.selected_academic_year = ''
        })
      }
    },
    displayStatus(dept, clearance){
      if(clearance.departments_approved.includes(dept._id)){
        return 'Approved'
      }else if(clearance.departments_pending.includes(dept._id)){
        return 'Pending'
      }else if(clearance.departments_disapproved.includes(dept._id)){
        return 'Disapproved'
      }else{
        return 'Not Requested'
      }
    },
    requestSignature(dept, clearance){
      this.$store.dispatch('studentClearanceForm/requestSignature',{
        clearance_id: clearance._id,
        department_id: dept._id
      }).then(res =>{
        if(res.response){
          this.$router.push('student-info')
          setTimeout(()=>{
            this.$router.push('clearance-form')
            this.makeToast(this, false, 'Request Successful', res.message, 4000, 'success')
          },1)
        }else{
          this.makeToast(this, false, 'Request failed', res.message, 4000, 'danger')
        }
      }).catch(err => {
        this.makeToast(this, false, 'Request failed', err.response.data.message, 4000, 'danger')
      })
    }
  }
}
</script>

<style scoped>
.pending{
  background-color: rgb(247, 232, 226);
}
.done{
  background-color: #ededed;
}
</style>