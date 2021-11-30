<template>
  <div class="p-2">
    <div class="overflow-auto">
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <b-form-input class="mr-2 mt-2 mb-2" v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchCourse"></b-form-input>
          <b-button variant="success" @click="addCourseModal = !addCourseModal">Add Course</b-button>
        </div>

        <b-table
            id="my-table"
            :items="courses"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
            responsive
        >
          <template #cell(sections)="row">
            <div class="">
              <span v-for="(section,index) in get(row, 'item.sections')" :key="index">
                <span>{{ section }}</span>
                <span v-if="get(row, 'item.sections').length-1 !== index">, </span>
              </span>
            </div>
          </template>
          <template #cell(number_of_years)="row">
            <div class="text-center">
              {{ row.item.number_of_years.length }}
            </div>
          </template>
          <template #cell(actions)="row">
            <div class="d-flex justify-content-center align-items-center">
              <b-button 
                size="sm" 
                variant="info"
                @click="showUpdateCourse(row.item)"
              >
                Update
              </b-button>
            </div>
          </template>
        </b-table>
        <div class="d-flex justify-content-end flex-row pg-1">
            <b-pagination
                v-model="currentPage"
                :total-rows="courses.length"
                :per-page="perPage"
                aria-controls="my-table"
                content-class="text-danger"
            ></b-pagination>
        </div>
    </div>
    <!-- create modal -->
    <b-modal title="Add Course" hide-footer hide-header-close no-close-on-backdrop :visible="addCourseModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2">
          <label>Code</label>
          <input type="text" class="form-control" v-model="code">
        </div>
        <div class="form-group mb-2">
          <label>Course Description</label>
          <input type="text" class="form-control" v-model="description">
        </div>
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <div class="form-group mb-2">
              <label>No. of Years</label>
              <b-form-select v-model="selected_years" :options="yearOpt" text-field="name" value-field="value"></b-form-select>
            </div>
          </div>
          <div class="col-6 pl-1">
            <div class="form-group mb-2">
              <label>Section</label>
              <b-form-select v-model="selected_section" :options="sectionsOpt" text-field="name" value-field="value"></b-form-select>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="addCourseModal = !addCourseModal">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="addCourse">Submit</b-button>
        </div>
      </form>
    </b-modal>

    <!-- update course modal -->
    <b-modal title="Update Course" hide-footer hide-header-close no-close-on-backdrop :visible="updateCourseModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2">
          <label>Code</label>
          <input type="text" class="form-control" v-model="code_upd">
        </div>
        <div class="form-group mb-2">
          <label>Course Description</label>
          <input type="text" class="form-control" v-model="description_upd">
        </div>
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <div class="form-group mb-2">
              <label>No. of Years</label>
              <b-form-select v-model="number_of_years_upd" :options="yearOpt" text-field="name" value-field="value"></b-form-select>
            </div>
          </div>
          <div class="col-6 pl-1">
            <div class="form-group mb-2">
              <label>Section</label>
              <b-form-select v-model="sections_upd" :options="sectionsOpt" text-field="name" value-field="value"></b-form-select>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="updateCourseModal = !updateCourseModal">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="updateCourse">Submit</b-button>
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
      perPage:10,
      currentPage: 1,
      searchString:'',
      fields:['code','description', {key: 'sections', label: 'Sections'}, {key: 'number_of_years', label: 'Number of years'}, {key: 'actions', label: ''}],
      addCourseModal: false,
      updateCourseModal: false,
      selected_section: {},
      sections: ['A','B','C','D','E','F','G','H','I','J','K','L','M'],
      sectionsOpt:[],
      code: '',
      description: '',
      selected_years: {},
      yearOpt: [
        {
          name: '1',
          value: ['1st']
        },
        {
          name: '2',
          value: ['1st','2nd']
        },
        {
          name: '3',
          value: ['1st','2nd','3rd']
        },
        {
          name: '4',
          value: ['1st','2nd','3rd','4th']
        },
        {
          name: '5',
          value: ['1st','2nd','3rd','4th','5th']
        }
      ],
      code_upd: '',
      description_upd: '',
      number_of_years_upd: '',
      sections_upd: '',
      course_id: '',
    }),
    computed: {
      courses(){
        return this.$store.getters['core/getCourses']
      }
    },
    mounted(){
      let sectionsOpt = [
        { name: 'A only', value: this.sections.slice(0,1) },
        { name: 'A to B', value: this.sections.slice(0,2) },
        { name: 'A to C', value: this.sections.slice(0,3) },
        { name: 'A to D', value: this.sections.slice(0,4) },
        { name: 'A to E', value: this.sections.slice(0,5) },
        { name: 'A to F', value: this.sections.slice(0,6) },
        { name: 'A to G', value: this.sections.slice(0,7) },
        { name: 'A to H', value: this.sections.slice(0,8) },
        { name: 'A to I', value: this.sections.slice(0,9) },
        { name: 'A to J', value: this.sections.slice(0,10) },
        { name: 'A to K', value: this.sections.slice(0,11) },
        { name: 'A to L', value: this.sections.slice(0,12) },
        { name: 'A to M', value: this.sections.slice(0,13) }
      ]
      this.sectionsOpt = sectionsOpt
      this.selected_section = this.sections.slice(0,1)
    },
    methods:{
      searchCourse(){
        console.log('search course')
      },
      showUpdateCourse(course){
        this.updateCourseModal = true
        this.course_id = course._id
        this.code_upd = course.code
        this.description_upd = course.description
        this.number_of_years_upd = course.number_of_years
        this.sections_upd = course = course.sections
      },
      getCourse(){
        this.$store.dispatch('core/getCourses')
      },
      addCourse(){
        if(this.code && this.description && this.selected_section && this.selected_years){
          this.$store.dispatch('adminCourse/addCourse',{
            code: this.code,
            description: this.description,
            sections: this.selected_section,
            number_of_years: this.selected_years
          }).then(res=>{
            if(res.response){
              this.getCourse()
              this.makeToast(this, false, `Course Added`, res.message, 4000, 'success')
              this.code = ''
              this.description = ''
              this.selected_section = this.sections.slice(0,1)
              this.selected_years = {}
            }else{
              this.makeToast(this, false, `Add failed`, '', 4000, 'danger')
            }
            this.addCourseModal = false
          }).catch(error=>{
            this.makeToast(this, false, `Add failed`, error.message, 4000, 'danger')
            this.addCourseModal = false
          })
        }else{
          this.makeToast(this, false, 'Add failed', 'Please fill up all fields.', 4000, 'danger')
        }
      },
      updateCourse(){
        if(this.code_upd && this.description_upd && this.sections_upd && this.number_of_years_upd){
          this.$store.dispatch('adminCourse/updateCourse',{
            course_id: this.course_id,
            code: this.code_upd,
            description: this.description_upd,
            sections: this.sections_upd,
            number_of_years: this.number_of_years_upd
          }).then(res=>{
            if(res.response){
              this.getCourse()
              this.makeToast(this, false, `Course Updated`, res.message, 4000, 'success')
              this.course_id = ''
              this.code_upd = ''
              this.description_upd = ''
              this.sections_upd = ''
              this.number_of_years_upd = ''
            }else{
              this.makeToast(this, false, `Update failed`, '', 4000, 'danger')
            }
            this.updateCourseModal = false
          }).catch(error=>{
            this.makeToast(this, false, `Update failed`, error.message, 4000, 'danger')
            this.updateCourseModal = false
          })
        }else{
          this.makeToast(this, false, 'Update failed', 'Please fill up all fields.', 4000, 'danger')
        }
        this.updateCourseModal = true
      }
    }
}
</script>

<style scoped>
</style>