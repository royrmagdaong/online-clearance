<template>
  <div>
      <div class="d-flex mb-1 align-items-start mb-2">
        <b-form-input v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchStudents"></b-form-input>
        <b-dropdown id="dropdown-form2" text="Course" ref="dropdown2" class="mx-2" variant="success">
          <b-dropdown-form style="min-width: 150px;">
            <b-form-checkbox v-model="cb_all" class="mb-1" @change="selectAll">All</b-form-checkbox>
            <b-form-checkbox v-model="cb_bsit" class="mb-1" value="BSIT" unchecked-value="" @change="selectBSIT">BSIT</b-form-checkbox>
            <b-form-checkbox v-model="cb_ccs" class="mb-1" value="CCS" unchecked-value="" @change="selectCCS">CCS</b-form-checkbox>
            <b-form-checkbox v-model="cb_bsoa" class="mb-1" value="BSOA" unchecked-value="" @change="selectBSOA">BSOA</b-form-checkbox>
            <b-form-checkbox v-model="cb_hrm" class="mb-1" value="HRM" unchecked-value="" @change="selectHRM">HRM</b-form-checkbox>
          </b-dropdown-form>
        </b-dropdown>
        <b-dropdown id="dropdown-form3" text="Year level" ref="dropdown3" variant="success">
          <b-dropdown-form style="min-width: 150px;">
            <b-form-checkbox v-model="cb_all2" class="mb-1" @change="selectAll2">All</b-form-checkbox>
            <b-form-checkbox v-model="cb_1st" class="mb-1" value="1st" unchecked-value="" @change="select1st">1ST</b-form-checkbox>
            <b-form-checkbox v-model="cb_2nd" class="mb-1" value="2nd" unchecked-value="" @change="select2nd">2ND</b-form-checkbox>
            <b-form-checkbox v-model="cb_3rd" class="mb-1" value="3rd" unchecked-value="" @change="select3rd">3RD</b-form-checkbox>
            <b-form-checkbox v-model="cb_4th" class="mb-1" value="4th" unchecked-value="" @change="select4th">4TH</b-form-checkbox>
          </b-dropdown-form>
        </b-dropdown>
      </div>

      <b-table
          id="my-table"
          :items="studentRequests"
          :per-page="perPage"
          :current-page="currentPage"
          bordered
          :fields="fields"
          responsive
          :no-border-collapse="false"
          :sticky-header="true"
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
          ></b-pagination>
      </div>

      <!-- modal -->
      <b-modal title="Student Request Info" content-class="pb-2 pl-2 pr-2" size="md" hide-footer :visible="viewRequestModal" @change="viewRequestModal = !viewRequestModal">
        <div class="row no-gutters">
          <div class="col-3 font-weight-bold">Name:</div>
          <div class="col-9">{{ get(studentRequirements,'student.first_name') }} {{ get(studentRequirements,'student.last_name') }}</div>
          <div class="col-3 font-weight-bold">Course:</div>
          <div class="col-9">{{ get(studentRequirements,'student.course') }}</div>
          <div class="col-3 font-weight-bold">Yr/Sec:</div>
          <div class="col-9">{{ trimYearLevel(get(studentRequirements,'student.year_level')) }}{{ get(studentRequirements,'student.section') }}</div>
          <div class="col-3 font-weight-bold">Acad. Year:</div>
          <div class="col-9">{{ get(studentRequirements,'clearance.academic_year') }}</div>
          <div class="col-3 font-weight-bold">Semester:</div>
          <div class="col-9">{{ get(studentRequirements,'clearance.semester') }}</div>

          <div class="col-12 mt-4">
            <div class="font-weight-bold mt-2" style="font-size:15px;">Conversation:</div>
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
    cb_all: true,
    cb_bsit: 'BSIT',
    cb_ccs: 'CCS',
    cb_bsoa: 'BSOA',
    cb_hrm: 'HRM',
    cb_all2: true,
    cb_1st: '1st',
    cb_2nd: '2nd',
    cb_3rd: '3rd',
    cb_4th: '4th',
    viewRequestModal: false,
    disapproveModal: false,
    clearance_id: '',
    message: ''
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
    }
  },
  mounted(){
    this.getStudentRequests()
  },
  methods:{
    trimYearLevel(yr){
      if(yr) return yr.substring(0,1)
    },
    searchStudents(){
      console.log('search students')
    },
    getStudentRequests(){
      this.$store.dispatch('departmentStudentRequests/getStudentRequests')
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
    },
    selectAll(){
      if(this.cb_all){
        this.cb_bsit = 'BSIT'
        this.cb_ccs = 'CCS'
        this.cb_bsoa = 'BSOA'
        this.cb_hrm = 'HRM'
      }else{
        this.cb_bsit = ''
        this.cb_ccs = ''
        this.cb_bsoa = ''
        this.cb_hrm = ''
      }
      this.searchStudents()
    },
    selectAll2(){
      if(this.cb_all2){
        this.cb_1st = '1st'
        this.cb_2nd = '2nd'
        this.cb_3rd = '3rd'
        this.cb_4th = '4th'
      }else{
        this.cb_1st = ''
        this.cb_2nd = ''
        this.cb_3rd = ''
        this.cb_4th = ''
      }
      this.searchStudents()
    },
    selectBSIT(){
      if(this.cb_all && !this.cb_bsit){
        this.cb_all = false
      }
      this.searchStudents()
    },
    selectBSOA(){
      if(this.cb_all && !this.cb_bsoa){
        this.cb_all = false
      }
      this.searchStudents()
    },
    selectCCS(){
      if(this.cb_all && !this.cb_ccs){
        this.cb_all = false
      }
      this.searchStudents()
    },
    selectHRM(){
      if(this.cb_all && !this.cb_hrm){
        this.cb_all = false
      }
      this.searchStudents()
    },
    select1st(){
      if(this.cb_all2 && !this.cb_1st){
        this.cb_all2 = false
      }
      this.searchStudents()
    },
    select2nd(){
      if(this.cb_all2 && !this.cb_2nd){
        this.cb_all2 = false
      }
      this.searchStudents()
    },
    select3rd(){
      if(this.cb_all2 && !this.cb_3rd){
        this.cb_all2 = false
      }
      this.searchStudents()
    },
    select4th(){
      if(this.cb_all2 && !this.cb_4th){
        this.cb_all2 = false
      }
      this.searchStudents()
    }
  }
}
</script>

<style>

</style>