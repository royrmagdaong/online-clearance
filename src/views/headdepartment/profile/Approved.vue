<template>
  <div>
      <div class="d-flex mb-1 align-items-start mb-2">
        <b-form-input v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchStudents"></b-form-input>

        <b-dropdown text="Course" variant="success" class="ml-2">
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

        <b-dropdown text="Year Level" variant="success" class="ml-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedYearLevel"
                :options="year_level_opt"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>
        
        <b-dropdown text="Section" variant="success" class="ml-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedSections"
                :options="sections"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>

        <b-dropdown text="Semester" variant="success" class="ml-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedSemester"
                :options="semesters"
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
    selectedYearLevel: ['1st','2nd','3rd','4th'],
    sections: ['A','B','C','D','E','F','G'],
    selectedSections:['A','B','C','D','E','F','G'],
    semesters:['1st','2nd'],
    selectedSemester:['1st','2nd']
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
        year_level: this.selectedYearLevel,
        section: this.selectedSections,
        semester: this.selectedSemester
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