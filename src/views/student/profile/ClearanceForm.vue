<template>
  <div>
    <div v-if="clearanceForms.length<1" class="">
      <div class="h5 card p-4 shadow-sm">You don't have clearance form yet.</div>
    </div>

    <div v-else>
      <div v-for="(clearance,index) in clearanceForms" :key="index">
        <div v-if="get(clearance, 'request_approved')" :class="{'done':index > 0}">
          <div class="card" :class="{'done':index > 0}">
            <div class="px-2 py-2">
              <span><b class="pr-2 pl-1">Name: </b> </span>
              <span>{{get(studentInfo, 'first_name')}} {{get(studentInfo, 'last_name')}}</span>
              <br>
              <span class="pr-4"><b class="pr-2 pl-1">Course:</b> {{get(clearance, 'course')}}</span>
              <span class="pr-4"><b class="pr-2 pl-4">Year/Section:</b> {{get(clearance, 'year_level').substring(0,1)}}A</span>
              <br>
              <span class="pr-4"><b class="pr-2 pl-1">Semester:</b> {{get(clearance, 'semester')}}</span>
              <span><b class="pr-2 pl-4">Academic Year:</b> {{get(clearance, 'academic_year')}}</span>
            </div>
          </div>
          <b-table bordered :items="departments" :fields="fields">
            <template #cell(actions)="row">
              <div class="d-flex justify-content-center">
                <b-button 
                  size="sm" 
                  variant="info" 
                  @click="requestSign(row.item, row.index, clearance)" 
                  :disabled="index > 0" 
                  v-if="(
                    !get(clearance, 'departments_approved').includes(get(row, 'item._id')) ||
                    !get(clearance, 'departments_pending').includes(get(row, 'item._id')) ||
                    !get(clearance, 'departments_disapproved').includes(get(row, 'item._id'))
                  )"
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
    fields:['in_charge',"department_name",'signature','status', {key: 'actions', label: ''}],
    selected_semester: '',
    selected_academic_year: '',
    semester_options: ['1st', '2nd'],
    academic_year_options: [],
    requestFormModal: false
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
    this.getDepartments()
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
        }
      })
    },
    getClearance(){
      this.$store.dispatch('studentClearanceForm/getClearanceForms',{student: get(this.studentInfo, '_id')})
    },
    getDepartments(){
      this.$store.dispatch('studentClearanceForm/getDepartments', {searchString: ""})
    },
    request(){
      if(this.selected_semester === ''){
        this.makeToast(
          this, // context
          false, // append = true
          'Request error', // title
          'Please select semester', // message
          3000, // auto hide delay
          'danger' // variant
        )
      }else if(this.selected_academic_year === ''){
        this.makeToast(
          this, // context
          false, // append = true
          'Request error', // title
          'Please select academic year', // message
          3000, // auto hide delay
          'danger' // variant
        )
      }else{
        this.$store.dispatch('studentClearanceForm/requestClearanceForm',{
          student: get(this.studentInfo, '_id'),
          academic_year: this.selected_academic_year,
          semester: this.selected_semester,
          course: get(this.studentInfo, 'course'),
          section: 'A',
          year_level: get(this.studentInfo, 'year_level')
        }).then(res=>{
          if(res.response){
            this.makeToast(
              this, // context
              false, // append = true
              'Request Successful', // title
              res.message, // message
              4000, // auto hide delay
              'success' // variant
            )
            this.getClearance()
            this.requestFormModal = false
            this.selected_semester = ''
            this.selected_academic_year = ''
          }else{
            this.makeToast(
              this, // context
              false, // append = true
              'Request Failed', // title
              res.message, // message
              5000, // auto hide delay
              'danger' // variant
            )
          }
        }).catch(err=>{
          this.makeToast(
            this, // context
            false, // append = true
            'Request Failed', // title
            err.message, // message
            5000, // auto hide delay
            'danger' // variant
          )
          this.requestFormModal = false
          this.selected_semester = ''
          this.selected_academic_year = ''
        })
      }
    },
    requestSign(item, index, clearance){
      console.log(item)
      console.log(index)
      console.log(clearance)
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