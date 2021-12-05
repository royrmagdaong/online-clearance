<template>
  <div>
      <div class="d-flex mb-1 align-items-center flex-wrap">
        <b-form-input v-model="searchString" placeholder="Search" id="search" debounce="300" @update="searchStudents"></b-form-input>
        <b-dropdown text="Course" variant="success" id="df1" dropright>
            <b-dropdown-form>
              <b-form-checkbox-group
                v-model="selectedCourses"
                :options="courses"
                text-field="code"
                value-field="code"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>
        <b-dropdown text="Year Level" variant="success" id="df2" dropright>
            <b-dropdown-form>
              <b-form-checkbox-group
                v-model="selectedYearLevel"
                :options="year_level_opt"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>
      </div>

      <b-table
        id="my-table"
        :items="studentRequests"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        bordered
        responsive
        :no-border-collapse="false"
        :sticky-header="true"
        class="d-none d-sm-block"
        outlined
      >
        <template #cell(actions)="row">
          <div class="d-flex justify-content-center">
            <b-button 
              size="sm" 
              variant="info"
              @click="viewRequest(row.item)"
            >
              View
            </b-button>
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-content-end flex-row">
          <b-pagination
              v-model="currentPage"
              :total-rows="studentRequests.length"
              :per-page="perPage"
              aria-controls="my-table"
              class="d-none d-sm-flex"
          ></b-pagination>
      </div>

      <!-- FOR XS -->
      <b-table
          id="my-table"
          :items="studentRequests"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          responsive
          :no-border-collapse="false"
          :sticky-header="true"
          stacked
          outlined
          class="d-block d-sm-none"
      >
        <template #cell(actions)="row">
          <div>
            <b-button
              size="sm" 
              variant="info"
              style="width:166%;"
              @click="viewRequest(row.item)"
            >
              View
            </b-button>
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-content-end flex-row">
          <b-pagination
              v-model="currentPage"
              :total-rows="studentRequests.length"
              :per-page="perPage"
              aria-controls="my-table"
              class="d-flex d-sm-none"
          ></b-pagination>
      </div>

      <!-- modal -->
      <b-modal title="Student Request Info" content-class="pb-2 pl-2 pr-2" size="md" hide-footer :visible="viewRequestModal" @change="viewRequestModal = !viewRequestModal">
        <div class="row no-gutters">
          <div class="col-4 col-sm-3 font-weight-bold">Name:</div>
          <div class="col-8 sm-9">{{ get(studentRequirements,'student.first_name') }} {{ get(studentRequirements,'student.last_name') }}</div>
          <div class="col-4 col-sm-3 font-weight-bold">Course:</div>
          <div class="col-8 sm-9">{{ get(studentRequirements,'student.course') }}</div>
          <div class="col-4 col-sm-3 font-weight-bold">Yr/Sec:</div>
          <div class="col-8 sm-9">{{ trimYearLevel(get(studentRequirements,'student.year_level')) }}{{ get(studentRequirements,'student.section') }}</div>
          <div class="col-4 col-sm-3 font-weight-bold">Acad. Year:</div>
          <div class="col-8 sm-9">{{ get(studentRequirements,'clearance.academic_year') }}</div>
          <div class="col-4 col-sm-3 font-weight-bold">Semester:</div>
          <div class="col-8 sm-9">{{ get(studentRequirements,'clearance.semester') }}</div>

          <div class="col-12 mt-4">
            <div class="font-weight-bold mt-2" style="font-size:15px;">Message/s:</div>
            <div v-for="(msg,index2) in get(studentRequirements,'message')" :key="index2+9999">
              <div class="d-flex mb-2">
                <div style="background:#ddd; padding:6px; border-radius:5px;" v-b-tooltip.hover :title="`${get(studentRequirements,'student.first_name')} ${get(studentRequirements,'student.last_name')}`">{{msg}}</div>
              </div>
              <div class="d-flex mb-2 justify-content-end" v-if="get(studentRequirements,`disapproved_message[${index2}]`)">
                <div style="color:#fff; background:#007BFF; padding:6px; border-radius:5px;" v-b-tooltip.hover title="You">{{get(studentRequirements,`disapproved_message[${index2}]`)}}</div>
              </div>
            </div>
          </div>

          <div class="col-12 mt-4">
            <div class="font-weight-bold">Submitted Requirements:</div>
            <div v-for="(file,index) in get(studentRequirements,'files')" :key="index">
              <div class="mt-1">1. <a :href="`${endpoints.viewRequirementsUrl}/${get(file,'filename')}`" target="_blank">{{ get(file, 'originalname') }}</a></div>
            </div>
          </div>

          <div class="mt-4 col-12 d-flex justify-content-end">
            <b-button 
              size="sm" 
              variant="warning"
              class="mr-2"
              @click="disapprove"
            >
              Dispprove
            </b-button>
            <b-button 
              size="sm" 
              variant="info"
              @click="approve"
            >
              Approve
            </b-button>
          </div>
        </div>
      </b-modal>

      <!-- disapprove modal -->
      <b-modal title="Disapprove message" content-class="pb-2 pl-2 pr-2" size="md" hide-footer :visible="disapproveModal" @change="disapproveModal = !disapproveModal">
        <div class="row no-gutters">
          <div class="col-12">
            <b-form-textarea
              placeholder="Message..."
              rows="3"
              max-rows="3"
              v-model="message"
            ></b-form-textarea>
          </div>
          <div class="mt-4 col-12 d-flex justify-content-end">
            <b-button 
              size="sm" 
              variant="warning"
              class="mr-2"
              @click="disapproveModal = !disapproveModal"
            >
              Close
            </b-button>
            <b-button 
              size="sm" 
              variant="info"
              @click="disapproveStudentRequest"
            >
              Submit
            </b-button>
          </div>
        </div>
      </b-modal>

  </div>
</template>

<script>
import {toast} from '../../../mixins/toast'
import {get} from 'lodash'
import endpoints from '../../../endpoints'

export default {
  mixins: [toast],
  data:()=>({
    endpoints,
    get,
    searchString: '',
    perPage: 10,
    currentPage: 1,
    fields:[
      {key:'student.first_name', label: 'First Name'}, 
      {key:'student.last_name', label: 'Last Name'}, 
      'course', 'year_level','section', 'semester', 'academic_year',
      {key: 'actions', label: ''}
    ],
    viewRequestModal: false,
    disapproveModal: false,
    clearance_id: '',
    message: '',
    selectedCourses: [],
    year_level_opt: ['1st','2nd','3rd','4th','5th'],
    selectedYearLevel: ['1st','2nd','3rd','4th','5th'],
  }),
  computed:{
    studentRequests(){
      return this.$store.getters['departmentStudentRequests/getStudentRequests']
    },
    departmentInfo(){
      return this.$store.getters['departmentDashboard/getDepartment']
    },
    studentRequirements(){
      return this.$store.getters['departmentStudentRequests/getStudentRequirements']
    },
    courses(){
      return this.$store.getters['core/getCourses']
    },
  },
  mounted(){
    this.populateCourse()
    this.getStudentRequests()
  },
  methods:{
    trimYearLevel(yr){
      if(yr) return yr.substring(0,1)
    },
    populateCourse(){
      if(this.courses){
        // fetch courses
        this.$store.dispatch('core/getCourses').then(res=>{
          if(res.response){
            for(let i=0;i<this.courses.length;i++){
              this.selectedCourses.push(this.courses[i].code)
            }
            this.searchStudents()
          }
        })
      }
    },
    searchStudents(){
      this.getStudentRequests()
    },
    getStudentRequests(){
      this.$store.dispatch('departmentStudentRequests/getStudentRequests',{
        searchString: this.searchString,
        course: this.selectedCourses,
        year_level: this.selectedYearLevel
      })
    },
    viewRequest(item){
      this.clearance_id = item._id
      this.viewRequestModal = true

      this.$store.dispatch('departmentStudentRequests/getStudentRequirements',{
        department_id: get(this.departmentInfo, '_id'),
        clearance_id: get(item, '_id')
      })
    },
    approve(){
      this.$store.dispatch('departmentStudentRequests/approveSignatureRequest',{
        clearance_id: this.clearance_id
      }).then(res => {
        if(res.response){
          this.viewRequestModal = false
          this.makeToast(this, false, 'Approve Success', 'Student request successfully approved.', 4000, 'success')
          this.getStudentRequests()
        }
      }).catch(err => {
        this.makeToast(this, false, 'Approve Failed', err.message, 4000, 'danger')
      })
    },
    disapprove(){
      this.disapproveModal = true
    },
    disapproveStudentRequest(){
      if(this.message){
        this.$store.dispatch('departmentStudentRequests/disapproveSignatureRequest',{
          clearance_id: this.clearance_id,
          disapproved_message: this.message,
          requirements_id: get(this.studentRequirements, '_id')
        }).then(res => {
          if(res.response){
            this.disapproveModal = false
            this.viewRequestModal = false
            this.makeToast(this, false, 'Disapproved', 'Student signature request disapproved.', 4000, 'success')
            this.getStudentRequests()
          }
        }).catch(err => {
          this.makeToast(this, false, 'Failed', err.message, 4000, 'danger')
        })
      }else{
        this.makeToast(this, false, 'Failed', 'Message is required.', 4000, 'danger')
      }
    }
  }
}
</script>

<style scoped>
#search{
  width: 25%;
  margin-right: 1% !important;
  margin-left: 0 !important;
}
#df1{
  width: 14%;
  margin-right: 1% !important;
  margin-left: 0 !important;
}
#df2{
  width: 14%;
  margin-right: 1% !important;
  margin-left: 0 !important;
}
@media only screen and (max-width: 1199px) {
  #search{
    width: 50%;
    margin-right: 1% !important;
    margin-left: 0 !important;
  }
  #df1{
    width: 24%;
    margin-left: 0 !important;
    margin-right: 1% !important;
  }
  #df2{
    width: 24%;
    margin-right: 0 !important;
    margin-left: 0 !important;
    margin-bottom: 0 !important;
  }
}
@media only screen and (max-width: 485px) {
  #search{
    width: 100% !important;
    margin-bottom: 4px !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  #df1{
    width: 49%;
    margin-left: 0 !important;
    margin-right: 1% !important;
  }
  #df2{
    width: 49%;
    margin-left: 1% !important;
    margin-right: 0 !important;
  }
}
</style>