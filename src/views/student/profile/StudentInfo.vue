<template>
  <div class="px-5 py-4 card shadow-sm">

    <div class="d-md-none my-4">
      <div style="width:120px;height:120px;;border-radius:50%;position:relative;" class="mx-auto d-block">
        <img @click="openChangePicModal" class="prof-pic" :src="`${endpoints.viewStudentProfilePic}/${get(studentInfo, 'profile_pic.filename')}`" />
      </div>
      
      <div class="d-flex align-items-center justify-content-center mt-3">
        <div class="h2 mb-0">{{ get(studentInfo, 'first_name') }} {{ get(studentInfo, 'last_name') }}</div>
        <b-icon class="edit-info ml-2" icon="pencil" variant="primary" font-scale="1" @click="openEditModal"></b-icon>
      </div>
      <div class="text-center">{{ get(studentInfo, 'email') }}</div>
      <div class="text-center">{{ get(studentInfo, 'course') }} {{ trimYearLevel(get(studentInfo, 'year_level')) }}{{ get(studentInfo, 'section') }} </div>
    </div>

    <div class="d-none d-md-block">
      <div class="d-flex justify-content-between align-items-center">
        <div class="h2 mb-0">{{ get(studentInfo, 'first_name') }} {{ get(studentInfo, 'last_name') }}</div>
        <b-icon class="edit-info" icon="pencil" variant="primary" font-scale="1" @click="openEditModal"></b-icon>
      </div>
      <div class="">{{ get(studentInfo, 'email') }}</div>
      <div class="">{{ get(studentInfo, 'course') }} {{ trimYearLevel(get(studentInfo, 'year_level')) }}{{ get(studentInfo, 'section') }} </div>
    </div>

    <!-- modal -->
    <b-modal title="Update Info" hide-footer hide-header-close no-close-on-backdrop :visible="editInfoModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2">
          <label>First name</label>
          <input type="text" class="form-control" v-model="first_name" >
        </div>
        <div class="form-group mb-2">
          <label>Last Name</label>
          <input type="text" class="form-control" v-model="last_name">
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="save">Save</b-button>
        </div>
      </form>
    </b-modal>

  </div>
</template>

<script>
import {get} from 'lodash'
import {toast} from '../../../mixins/toast'
import endpoints from '../../../endpoints'

export default {
  mixins: [toast],
  data:()=>({
    endpoints,
    userId: '',
    get,
    editInfoModal: false,
    year_level_options: ['1st', '2nd', '3rd', '4th'],
    fourYearCourseOption: ['1st', '2nd', '3rd', '4th'],
    secondYearCourseOption: ['1st', '2nd'],
    sections: ['A', 'B', 'C', 'D'],
    selected_course: '',
    selected_year_level: '',
    selected_section: '',
    first_name: '',
    last_name: ''
  }),
  mounted(){
    this.getStudentInfo()
  },
  computed:{
    studentInfo(){
      return this.$store.getters['studentInfo/getStudentInfo']
    },
    userInfo(){
      return this.$store.getters['auth/getUserInfo']
    },
    courses(){
      return this.$store.getters['core/getCourses']
    }
  },
  methods:{
    cancel(){
      this.editInfoModal = false
    },
    getStudentInfo(){
      this.userId = this.userInfo.id
      this.$store.dispatch('studentInfo/getStudentInfo', {id: this.userId})
    },
    openChangePicModal(){
      this.$root.$emit('openChangePicModal')
    },
    trimYearLevel(yr){
      if(yr) return yr.substring(0,1)
    },
    save(){
      this.$store.dispatch('studentInfo/updateStudentInfo',{
        id: this.userInfo.id,
        first_name: this.first_name,
        last_name: this.last_name,
        course: this.selected_course,
        year_level: this.selected_year_level,
        section: this.selected_section
      }).then(res => {
        if(res.response){
          this.editInfoModal = false
          this.makeToast(
            this, // context
            false, // append = true
            'Successfully updated', // title
            res.message, // message
            4000, // auto hide delay
            'success' // variant
          )
          this.$store.dispatch('studentInfo/getStudentInfo', {id: this.userId})
        }else{
          this.makeToast(
            this, // context
            false, // append = true
            'Update error', // title
            res.message, // message
            4000, // auto hide delay
            'danger' // variant
          )
        }
      }).catch(err => {
        this.makeToast(
            this, // context
            false, // append = true
            'Update error', // title
            err.message, // message
            4000, // auto hide delay
            'danger' // variant
          )
      })
    },
    openEditModal(){
      this.editInfoModal = true;
      this.first_name = get(this.studentInfo, 'first_name')
      this.last_name = get(this.studentInfo, 'last_name')
      this.selected_course = get(this.studentInfo, 'course')
      this.selected_year_level = get(this.studentInfo, 'year_level')
      this.selected_section = get(this.studentInfo, 'section')
    },
    selectCourse(){
      this.selected_year_level = ''
      if(this.selected_course.includes('BS')){
        this.year_level_options = this.fourYearCourseOption
      }else{
        this.year_level_options = this.secondYearCourseOption
      }
    },
  }
}
</script>

<style scoped>
.edit-info:hover{
  cursor: pointer;
  color: rgb(76, 160, 76) !important;
  font-size: 16px !important;
}

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