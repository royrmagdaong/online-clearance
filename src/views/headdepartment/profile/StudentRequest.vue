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
          :per-page="10"
          :current-page="1"
          bordered
          :fields="fields"
          responsive
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
              :per-page="10"
              aria-controls="my-table"
          ></b-pagination>
      </div>

      <!-- modal -->
      <b-modal title="Student request info" content-class="pb-2 pl-2 pr-2" size="md" hide-footer :visible="viewRequestModal" @change="viewRequestModal = !viewRequestModal">
        <div class="row no-gutters">
          <div class="col-3 font-weight-bold">Name:</div>
          <div class="col-9">John Doe</div>
          <div class="col-3 font-weight-bold">Course:</div>
          <div class="col-9">BSIT</div>
          <div class="col-3 font-weight-bold">Yr/Sec:</div>
          <div class="col-9">2A</div>
          <div class="col-3 font-weight-bold">Acad. Year:</div>
          <div class="col-9">2021-2022</div>
          <div class="col-3 font-weight-bold">Semester:</div>
          <div class="col-9">1st</div>

          <div class="col-12 mt-4">
            <div class="mb-1 font-weight-bold">Message:</div>
            <div class="font-weight-light" style="font-size: 15px;">Tellus senectus, nec tristique phasellus numquam ante, velit gravida distinctio tempus ad exercitation dui, unde sociosqu dictumst rhoncus officia fugit, parturient suspendisse illum mauris, laboriosam massa, natoque illo quod tristique.</div>
          </div>

          <div class="col-12 mt-4">
            <div class="font-weight-bold">Submitted Requirements:</div>
            <div class="mt-1">1. <a href="../testrequirements.pdf" target="_blank">Sample Pdf</a></div>
            <div class="">2. <a href="../testrequirements.pdf" target="_blank">Sample Pdf</a></div>
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
  </div>
</template>

<script>
import {toast} from '../../../mixins/toast'

export default {
  mixins: [toast],
  data:()=>({
    searchString: '',
    perPage: 10,
    currentPage: 1,
    fields:[
      {key:'student.first_name', label: 'First Name'}, 
      {key:'student.last_name', label: 'Last Name'}, 
      'course', 'year_level','section', 'status',
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
    clearance_id: ''
  }),
  computed:{
    studentRequests(){
      return this.$store.getters['departmentStudentRequests/getStudentRequests']
    }
  },
  mounted(){
    this.getStudentRequests()
  },
  methods:{
    searchStudents(){
      console.log('search students')
    },
    getStudentRequests(){
      this.$store.dispatch('departmentStudentRequests/getStudentRequests')
    },
    viewRequest(item){
      this.clearance_id = item._id
      this.viewRequestModal = true
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
      console.log('disapproved')
      this.viewRequestModal = false
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