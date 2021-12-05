<template>
  <div class="p-2">
    <div class="d-flex mb-1 align-items-center">
      <b-button class="my-2" variant="success" @click="schoolYearModal = true">Update</b-button>
    </div>

    <b-table
      id="my-table"
      :items="schoolYear"
      bordered
      :fields="fields"
      responsive
      head-variant="dark"
      outlined
      striped
      table-variant="secondary"
      class="d-none d-sm-block"
    ></b-table>

    <!-- for xs -->
    <b-table
      id="my-table"
      :items="schoolYear"
      bordered
      :fields="fields"
      responsive
      head-variant="dark"
      outlined
      striped
      stacked
      table-variant="secondary"
      class="d-block d-sm-none"
    ></b-table>

    <!-- update course modal -->
    <b-modal title="Update Course" hide-footer hide-header-close no-close-on-backdrop :visible="schoolYearModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2">
          <label>Semester</label>
          <b-form-select v-model="selected_semester" :options="semesterOpt" text-field="name" value-field="value"></b-form-select>
        </div>
        <div class="form-group mb-2">
          <label>Academic Year</label>
          <b-form-select v-model="selected_academic_year" :options="academic_year_opt" text-field="name" value-field="value"></b-form-select>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="schoolYearModal = false">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="save">Save</b-button>
        </div>
      </form>
    </b-modal>

  </div>
</template>

<script>
import {get} from 'lodash'
import {toast} from '../../../mixins/toast'

export default {
    mixins: [toast],
    data:()=>({
        get,
        fields:['SEMESTER', 'ACADEMIC_YEAR'],
        semesterOpt: ['1st','2nd'],
        academic_year_opt: [],
        schoolYearModal: false,
        selected_semester: '',
        selected_academic_year: ''
    }),
    computed: {
      schoolYear(){
        let sy = this.$store.getters['departmentBase/getSchoolYear']
        return [sy?sy:[]]
      },
    },
    mounted(){
      this.getSchoolYear()
      this.getAcademicYear()
    },
    methods:{
      getSchoolYear(){
        this.$store.dispatch('departmentBase/getSchoolYear').then(res=>{
          if(res.response){
            this.selected_semester = res.data.SEMESTER
            this.selected_academic_year = res.data.ACADEMIC_YEAR
          }
        })
      },
      getAcademicYear(){
        let curYear = new Date().getFullYear()
        for(let i=0;i<2;i++){
          this.academic_year_opt.push(`${curYear+i}-${curYear+(i+1)}`)
        }
      },
      save(){
        if(this.selected_semester && this.selected_academic_year){
          this.$store.dispatch('adminSchoolYear/updateSchoolYear',{
            semester: this.selected_semester,
            academic_year: this.selected_academic_year
          }).then(res=>{
            if(res.response){
              this.schoolYearModal = false
              this.getSchoolYear()
              this.makeToast(this, false, 'Update Success', res.message, 4000, 'success')
            }else{
              this.makeToast(this, false, 'Update Failed', res.message, 4000, 'warning')
            }
          }).catch(error=>{
            this.makeToast(this, false, 'Update Failed', error.message, 4000, 'danger')
          })
        }
      }
    }
}
</script>

<style>
.page-item.active .page-link {
    background-color: #28a745 !important;
}
</style>

<style scoped>
#dropdown-form{
  min-width: 90px !important;
}
</style>