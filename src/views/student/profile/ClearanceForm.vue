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
              <span class="pr-sm-4 pr-1 d-block d-sm-inline"><b class="pr-2 pl-sm-4 pl-1">Year/Section:</b> {{get(clearance, 'year_level').substring(0,1)}}{{get(clearance, 'section')}}</span>
              <br class="d-none d-sm-block">
              <span class="pr-4"><b class="pr-2 pl-1">Semester:</b> {{get(clearance, 'semester')}}</span>
              <span class="pl-sm-4 pl-1 d-block d-sm-inline"><b>Academic Year:</b> {{get(clearance, 'academic_year')}}</span>
            </div>
          </div>  
          <b-table bordered :items="departments" :fields="fields" responsive class="d-none d-md-block">
            <template #cell(in_charge)="row">
              <div class="d-flex align-items-center" style="min-height: 50px !important; min-width: 120px;">
                <span>{{ get(row, 'item.in_charge') }}</span>
              </div>
            </template>
            <template #cell(department_name)="row">
              <div class="d-flex align-items-center" style="min-height: 50px !important; min-width: 220px;">
                <span>{{ get(row, 'item.department_name') }}</span>
              </div>
            </template>
            <template #cell(signature_)="row">
              <div class="d-flex justify-content-center">
                <img :src="getSign(row.item,clearance)" alt="Signature" v-if="getSign(row.item,clearance)" width="120">
              </div>
            </template>
            <template #cell(status)="row">
              <div class="d-flex  align-items-center" style="min-height: 50px !important;">
                <span style="font-size:13px; font-weight:500; min-width: 95px;" :class="{
                  'text-warning':displayStatus(row.item, clearance)==='Pending', 
                  'text-success':displayStatus(row.item, clearance)==='Approved',
                  'text-danger':displayStatus(row.item, clearance)==='Disapproved',
                }"
                class="text-center"
                v-if="!get(clearance, 'outdated')"
                >
                  {{ displayStatus(row.item, clearance) }}
                </span>
                <span v-else>{{ displayStatus(row.item, clearance) }}</span>
              </div>
            </template>
            <template #cell(actions)="row">
              <div class="d-flex justify-content-center align-items-center" style="min-height: 50px !important;">
                <b-button 
                  style="min-width: 131px;"
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
                <b-button 
                  style="min-width: 131px;"
                  size="sm" 
                  variant="warning"
                  :disabled="get(clearance, 'outdated')"
                  @click="viewRequest(row.item, clearance)"
                  v-if="
                    displayStatus(row.item, clearance)==='Disapproved' &&
                    !get(clearance, 'outdated')
                  "
                >
                  View Request
                </b-button>
              </div>
            </template>
          </b-table>

          <!-- FOR XS -->
          <b-table bordered :items="departments" :fields="fields" responsive stacked class="d-block d-md-none">
            <template #cell(signature_)="row">
              <div class="">
                <img :src="getSign(row.item,clearance)" alt="Signature" v-if="getSign(row.item,clearance)" width="120">
              </div>
            </template>
            <template #cell(status)="row">
              <div>
                <span style="font-size:13px; font-weight:500;" :class="{
                  'text-warning':displayStatus(row.item, clearance)==='Pending', 
                  'text-success':displayStatus(row.item, clearance)==='Approved',
                  'text-danger':displayStatus(row.item, clearance)==='Disapproved',
                }"
                  v-if="!get(clearance, 'outdated')"
                >
                  {{ displayStatus(row.item, clearance) }}
                </span>
                <span v-else>{{ displayStatus(row.item, clearance) }}</span>
              </div>
            </template>
            <template #cell(actions)="row">
              <div>
                <b-button 
                  style="width:166%;"
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
                <b-button 
                  style="width:166%;"
                  size="sm" 
                  variant="warning"
                  :disabled="get(clearance, 'outdated')"
                  @click="viewRequest(row.item, clearance)"
                  v-if="
                    displayStatus(row.item, clearance)==='Disapproved' &&
                    !get(clearance, 'outdated')
                  "
                >
                  View Request
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

    <!-- request signature modal -->
    <b-modal title="Department Requirements" content-class="pb-2 pl-2 pr-2" size="md" no-close-on-backdrop hide-footer :visible="requestSignatureModal" @change="requestSignatureModal = !requestSignatureModal">
      <div class="row no-gutters">
        <div class="col-sm-4 col-md-3 col-5 font-weight-bold">Department:</div>
        <div class="col-sm-8 col-md-9 col-7">{{ get(department, 'department_name') }}</div>
        <div class="col-sm-4 col-md-3 col-5 font-weight-bold">In Charge:</div>
        <div class="col-sm-8 col-md-9 col-7">{{ get(department, 'in_charge') }}</div>

        <div class="col-12 mt-4">
          <div class="mb-1">Requirements:</div>
          <ol class="pl-3">
            <li v-for="(requirements,index) in department_requirements" :key="index">
              <div class="mb-1 font-weight-bold">
                <a :href="`${endpoints.viewRequirementsUrl}/${get(requirements,'filename')}`" target="_blank">{{ get(requirements, 'title') }}</a>
              </div>
              <ul class="font-weight-light" style="font-size: 15px;">
                <li>{{ get(requirements, 'instructions') }}</li>
              </ul>
            </li>
          </ol>
          <hr/>
        </div>

        <div class="col-12 mt-2">
          <form @submit.prevent="" enctype="multipart/form-data">
            <div class="col-12 px-0">
              <div class="mb-2">Upload Requirements <span style="font-size:12px;">(*png, jpg, pdf only)</span></div>
              <b-form-textarea
                placeholder="Message..."
                rows="3"
                max-rows="3"
                v-model="message"
              ></b-form-textarea>
              <input type="file" name="requirements"  class="mt-2" accept="image/png, image/jpeg, application/pdf" multiple @change="onChange"/>
            </div>
          </form>
        </div>

        <div class="mt-4 col-12 d-flex justify-content-end">
          <b-button 
            size="sm" 
            variant="warning"
            class="mr-2"
            @click="requestSignatureModal = !requestSignatureModal"
          >
            Cancel
          </b-button>
          <b-button 
            size="sm" 
            variant="info"
            @click="submitRequestSignature"
          >
            Submit
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- view request modal -->
    <b-modal title="View Request" content-class="pb-2 pl-2 pr-2" size="md" no-close-on-backdrop hide-footer :visible="viewRequestModal" @change="viewRequestModal = !viewRequestModal">
      <div class="row no-gutters">
        <div class="col-sm-4 col-md-3 col-5 font-weight-bold">Department:</div>
        <div class="col-sm-8 col-md-9 col-7">{{ get(department, 'department_name') }}</div>
        <div class="col-sm-4 col-md-3 col-5 font-weight-bold">In Charge:</div>
        <div class="col-sm-8 col-md-9 col-7">{{ get(department, 'in_charge') }}</div>

        <div class="col-12 mt-4">
          <div class="mb-1 font-weight-bold">Requirements:</div>
          <ol class="pl-3">
            <li v-for="(requirements,index) in department_requirements" :key="index">
              <div class="mb-1 font-weight-bold">
                <a :href="`${endpoints.viewRequirementsUrl}/${get(requirements,'filename')}`" target="_blank">{{ get(requirements, 'title') }}</a>
              </div>
              <ul class="font-weight-light" style="font-size: 15px;">
                <li>{{ get(requirements, 'instructions') }}</li>
              </ul>
            </li>
          </ol>
          <hr/>
        </div>

        <div class="col-12">
          <div class="font-weight-bold" style="font-size:15px;">Your last submitted requirements:</div>
          <div v-for="(file,index) in get(studentRequirements,'files')" :key="index">
            <div class="mt-1">1. <a :href="`${endpoints.viewRequirementsUrl}/${get(file,'filename')}`" style="font-size:14px;" target="_blank">{{ get(file, 'originalname') }}</a></div>
          </div>
          <div class="font-weight-bold mt-2" style="font-size:15px;">Conversation:</div>
          <div v-for="(msg,index2) in get(studentRequirements,'message')" :key="index2+9999">
            <div class="d-flex mb-2 justify-content-end">
              <div style="color:#fff; background:#007BFF; padding:6px; border-radius:5px;" v-b-tooltip.hover title="You">{{msg}}</div>
            </div>
            <div class="d-flex mb-2">
              <div style="background:#ddd; padding:6px; border-radius:5px;" v-b-tooltip.hover :title="get(department, 'in_charge')">{{get(studentRequirements,`disapproved_message[${index2}]`)}}</div>
            </div>
          </div>
          <hr/>
        </div>

        <div class="col-12 mt-2">
          <form @submit.prevent="" enctype="multipart/form-data">
            <div class="col-12 px-0">
              <div class="mb-2">Upload Requirements <span style="font-size:12px;">(*png, jpg, pdf only)</span></div>
              <b-form-textarea
                placeholder="Message..."
                rows="3"
                max-rows="3"
                v-model="message"
              ></b-form-textarea>
              <input type="file" name="requirements"  class="mt-2" accept="image/png, image/jpeg, application/pdf" multiple @change="onChange"/>
            </div>
          </form>
        </div>

        <div class="mt-4 col-12 d-flex justify-content-end">
          <b-button 
            size="sm" 
            variant="warning"
            class="mr-2"
            @click="viewRequestModal = !viewRequestModal"
          >
            Cancel
          </b-button>
          <b-button 
            size="sm" 
            variant="info"
            @click="resubmitRequestSignature"
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
    fields:['in_charge',"department_name",'signature_',{key: 'status', label: 'Status'}, {key: 'actions', label: ''}],
    selected_semester: '',
    selected_academic_year: '',
    semester_options: [],
    academic_year_options: [],
    requestFormModal: false,
    tableKey: 0,
    requestSignatureModal: false,
    viewRequestModal: false,
    department: null,
    clearance: null,
    message: '',
    requirements_upload: null,
    file_list: []
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
    department_requirements(){
      return this.$store.getters['departmentRequirements/getRequirements']
    },
    studentRequirements(){
      return this.$store.getters['departmentStudentRequests/getStudentRequirements']
    },
    schoolYear(){
      return this.$store.getters['departmentBase/getSchoolYear']
    },
  },
  mounted(){
    this.getStudentInfo()
    this.getSchoolYear()
  },
  methods:{
    getSchoolYear(){
      this.$store.dispatch('departmentBase/getSchoolYear').then(res=>{
        if(res.response){
          this.getYears()
        }
      })
    },
    onChange(event) {
      this.requirements_upload = event.target.files
    },
    cancel(){
      this.requestFormModal = false
      this.selected_semester = ''
      this.selected_academic_year = ''
    },
    getYears(){
      this.academic_year_options.push(get(this.schoolYear,'ACADEMIC_YEAR'))
      this.semester_options.push(get(this.schoolYear,'SEMESTER'))
      this.selected_academic_year = get(this.schoolYear, 'ACADEMIC_YEAR')
      this.selected_semester = get(this.schoolYear, 'SEMESTER')
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
      let approved = false
      for(let i = 0;i<clearance.departments_approved.length;i++){
        if(clearance.departments_approved[i].dept_id === dept._id){
          approved = true
        }
      }
      if(approved){
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
      this.getRequirements(dept.user_id)
      this.department = dept
      this.clearance = clearance
      this.requestSignatureModal = true
    },
    viewRequest(dept, clearance){
      this.$store.dispatch('departmentStudentRequests/getStudentRequirements',{
        department_id: get(dept, '_id'),
        clearance_id: get(clearance, '_id')
      }).then(res=>{
        console.log(res)
      })
      this.getRequirements(dept.user_id)
      this.department = dept
      this.clearance = clearance
      this.viewRequestModal = true
    },
    submitRequestSignature(){
      if(this.requirements_upload){
        if(this.message){
          const formData = new FormData()
          for(let i=0;i<this.requirements_upload.length;i++){
            let file = this.requirements_upload[i];
            formData.append("requirements", file);
          }
          formData.append('user_id', get(this.studentInfo, '_id'))
          formData.append('department_id', this.department._id)
          formData.append('clearance_id', this.clearance._id)
          formData.append('message', this.message)

          this.$store.dispatch('studentClearanceForm/requestSignature',{
            formData:formData
          }).then(res=>{
            if(res.response){
              this.requestSignatureModal = false
              this.$router.push('student-info')
              setTimeout(()=>{
                this.$router.push('clearance-form')
                this.makeToast(this, false, 'Request Successful', res.message, 4000, 'success')
              },1)
            }
          }).catch(err=>{
            this.makeToast(this, false, 'Request failed', err.message, 4000, 'danger')
          })
        }else{
          this.makeToast(this, false, 'Request warning', 'Please enter a message.', 4000, 'warning')
        }
      }else{
        this.makeToast(this, false, 'Request warning', 'You need to choose file/s first.', 4000, 'warning')
      }
    },
    resubmitRequestSignature(){
      if(this.requirements_upload){
        if(this.message){
          const formData = new FormData()
          for(let i=0;i<this.requirements_upload.length;i++){
            let file = this.requirements_upload[i];
            formData.append("requirements", file);
          }
          formData.append('requirements_id', get(this.studentRequirements, '_id'))
          formData.append('department_id', get(this.department, '_id'))
          formData.append('clearance_id', this.clearance._id)
          formData.append('message', this.message)

          this.$store.dispatch('studentClearanceForm/updateRequestSignature',{
            formData:formData
          }).then(res=>{
            if(res.response){
              this.viewRequestModal = false
              this.$router.push('student-info')
              setTimeout(()=>{
                this.$router.push('clearance-form')
                this.makeToast(this, false, 'Request Successful', res.message, 4000, 'success')
              },1)
            }
          }).catch(err=>{
            this.makeToast(this, false, 'Request failed', err.message, 4000, 'danger')
          })
        }else{
          this.makeToast(this, false, 'Request warning', 'Please enter a message.', 4000, 'warning')
        }
      }else{
        this.makeToast(this, false, 'Request warning', 'You need to choose file/s first.', 4000, 'warning')
      }
    },
    getSign(dept,clearance){
      let sign = ''
      for(let i = 0;i<clearance.departments_approved.length;i++){
        if(clearance.departments_approved[i].dept_id === dept._id){
          sign = `data:${get(clearance.departments_approved[i],'signature.type')};${get(clearance.departments_approved[i],'signature.base')},${get(clearance.departments_approved[i],'signature.img')}`
        }
      }
      return sign
    },
    getRequirements(dept_id){
      this.$store.dispatch('departmentRequirements/getRequirements',{department_id: dept_id})
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