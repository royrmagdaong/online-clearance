<template>
  <div>
      <div class="d-flex mb-1 align-items-start mb-2">
        <b-form-input v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchStudents"></b-form-input>

        <b-dropdown id="dropdown-form" text="Course" ref="dropdown" variant="success" class="mx-2">
            <b-dropdown-form style="min-width: 150px;">
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

        <b-dropdown id="dropdown-form2" text="Year Level" ref="dropdown2" variant="success">
            <b-dropdown-form style="min-width: 150px;">
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
          :items="approvedStudents"
          :per-page="perPage"
          :current-page="currentPage"
          bordered
          :fields="fields"
          responsive
      ></b-table>
      <div class="d-flex justify-content-end flex-row">
          <b-pagination
              v-model="currentPage"
              :total-rows="get(fields, 'length')"
              :per-page="perPage"
              aria-controls="my-table"
          ></b-pagination>
      </div>
  </div>
</template>

<script>
import {get} from 'lodash'
export default {
  data:()=>({
    get,
    searchString: '',
    perPage: 10,
    currentPage: 1,
    fields:[
      {key:'student.first_name', label: 'First Name'}, 
      {key:'student.last_name', label: 'Last Name'}, 
      'course', 'year_level','section', 'semester', 'academic_year'
    ],
    selectedCourses: [],
    year_level_opt: ['1st','2nd','3rd','4th'],
    selectedYearLevel: ['1st','2nd','3rd','4th']
  }),
  mounted(){
    this.populateCourse()
  },
  computed:{
    approvedStudents(){
      return this.$store.getters['departmentApprovedStudents/getApprovedStudents']
    },
    courses(){
      return this.$store.getters['core/getCourses']
    }
  },
  methods:{
    searchStudents(){
      this.$store.dispatch('departmentApprovedStudents/getApprovedStudents',{
        course: this.selectedCourses,
        year_level: this.selectedYearLevel
      })
    },
    populateCourse(){
      if(this.courses){
        this.$store.dispatch('core/getCourses').then(res=>{
          if(res.response){
            for(let i=0;i<this.courses.length;i++){
              this.selectedCourses.push(this.courses[i].code)
            }
            this.searchStudents()
          }
        })
      }else{
        for(let i=0;i<this.courses.length;i++){
          this.selectedCourses.push(this.courses[i].code)
        }
        this.searchStudents()
      }
    },
  }
}
</script>

<style>

</style>