<template>
  <div>
      <!-- <div class="d-lg-flex mb-1 align-items-start mb-2 d-none">
        <b-form-input v-model="searchString" placeholder="Search" class="mr-2" style="max-width: 250px;" debounce="300" @update="searchStudents"></b-form-input>

        <b-dropdown text="Course" variant="success" class="mr-2">
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

        <b-dropdown text="Year Level" variant="success" class="mr-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedYearLevel"
                :options="year_level_opt"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>
        
        <b-dropdown text="Section" variant="success" class="mr-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedSections"
                :options="sections"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>

        <b-dropdown text="Semester" variant="success" class="mr-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedSemester"
                :options="semesters"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>

        <b-dropdown text="Acad. Year" variant="success" class="mr-2">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox-group
                v-model="selectedAcadYear"
                :options="academic_year"
                stacked
                @change="searchStudents"
              ></b-form-checkbox-group>
          </b-dropdown-form>
        </b-dropdown>

      </div> -->

      <div class="row mb-2 no-gutters">
        <div class="col-12 col-lg-6 d-flex">
          <b-form-input v-model="searchString" placeholder="Search" class="mr-2" style="max-width: 250px;" debounce="300" @update="searchStudents"></b-form-input>

          <b-dropdown text="Course" variant="success" class="mr-2">
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

          <b-dropdown text="Year Level" variant="success" class="mr-2">
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

        <div class="col-12 col-lg-6 d-flex mt-2 mt-lg-0">
          <b-dropdown text="Section" variant="success" class="mr-2">
              <b-dropdown-form style="min-width: 150px;">
                <b-form-checkbox-group
                  v-model="selectedSections"
                  :options="sections"
                  stacked
                  @change="searchStudents"
                ></b-form-checkbox-group>
            </b-dropdown-form>
          </b-dropdown>

          <b-dropdown text="Semester" variant="success" class="mr-2">
              <b-dropdown-form style="min-width: 150px;">
                <b-form-checkbox-group
                  v-model="selectedSemester"
                  :options="semesters"
                  stacked
                  @change="searchStudents"
                ></b-form-checkbox-group>
            </b-dropdown-form>
          </b-dropdown>

          <b-dropdown text="Acad. Year" variant="success" class="mr-2">
              <b-dropdown-form style="min-width: 150px;">
                <b-form-checkbox-group
                  v-model="selectedAcadYear"
                  :options="academic_year"
                  stacked
                  @change="searchStudents"
                ></b-form-checkbox-group>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </div>
      

      <b-table
          id="my-table"
          :items="approvedStudents"
          :per-page="perPage"
          :current-page="currentPage"
          bordered
          :fields="fields"
          responsive
          :no-border-collapse="false"
          :sticky-header="true"
      ></b-table>
      <div class="d-flex justify-content-end flex-row">
          <b-pagination
              v-model="currentPage"
              :total-rows="get(approvedStudents, 'length')"
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
    selectedSemester:['1st','2nd'],
    selectedAcadYear:[]
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
    },
    academic_year(){
      return this.$store.getters['core/getAcadYear']
    }
  },
  methods:{
    searchStudents(){
      this.$store.dispatch('departmentApprovedStudents/getApprovedStudents',{
        searchString: this.searchString,
        course: this.selectedCourses,
        year_level: this.selectedYearLevel,
        section: this.selectedSections,
        semester: this.selectedSemester,
        academic_year: this.selectedAcadYear
      })
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

        // fetch academic year
        this.$store.dispatch('core/getAvailableAcademicYear').then(res=>{
          if(res.response){
            for(let i=0;i<this.academic_year.length;i++){
              this.selectedAcadYear.push(this.academic_year[i])
            }
            this.searchStudents()
          }
        })
      }else{
        for(let i=0;i<this.courses.length;i++){
          this.selectedCourses.push(this.courses[i].code)
        }
        for(let i=0;i<this.academic_year.length;i++){
          this.selectedAcadYear.push(this.academic_year[i])
        }
        this.searchStudents()
      }
    },
  }
}
</script>

<style>

</style>