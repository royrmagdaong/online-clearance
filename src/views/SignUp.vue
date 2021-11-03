<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-block d-md-none" style="margin-top:120px;"></div>
      <div class="col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 signup-container">
        <div class="card shadow-sm px-2 py-2 mx-2 mx-sm-0 px-lg-4 py-lg-2" style="width:100%;">
          <div class="card-body">
            <h4 class="card-title">Sign Up</h4>
            <hr>
            <form>
              <div class="form-group mb-2 row no-gutters">
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>First Name</label>
                  <input type="text" class="form-control" v-model="first_name">
                </div>
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Last Name</label>
                  <input type="text" class="form-control" v-model="last_name">
                </div>
              </div>
              <div class="form-group mb-2">
                <label>Course</label>
                <b-form-select v-model="selected_course" :options="courses" @change="selectCourse" text-field="description" value-field="code"></b-form-select>
              </div>
              <div class="form-group mb-2 row no-gutters">
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Section</label>
                  <b-form-select v-model="selected_section" :options="sections"></b-form-select>
                </div>
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Year level</label>
                  <b-form-select v-model="selected_year_level" :options="year_level_options"></b-form-select>
                </div>
              </div>
              <div class="form-group mb-2">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="form-group mb-2 row no-gutters">
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Password</label>
                  <input type="password" class="form-control" v-model="password">
                </div>
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Confirm Password</label>
                  <input type="password" class="form-control" v-model="confirmPassword">
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-warning mr-2" @click.prevent="clear">Clear</button>
                <button type="submit" class="btn btn-success" @click.prevent="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 d-block d-md-none" style="margin-bottom:120px;"></div>
    </div>
  </div>
</template>

<script>
import {toast} from '../mixins/toast'

export default {
  mixins: [toast],
  data:()=>({
    year_level_options: [],
    fourYearCourseOption: ['1st', '2nd', '3rd', '4th'],
    sections: ['A', 'B', 'C', 'D'],
    secondYearCourseOption: ['1st', '2nd'],
    selected_course: '',
    selected_section: '',
    selected_year_level: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: ''
  }),
  computed:{
    courses(){
      return this.$store.getters['core/getCourses']
    }
  },
  methods:{
    selectCourse(){
      this.selected_year_level = ''
      if(this.selected_course.includes('BS')){
        this.year_level_options = this.fourYearCourseOption
      }else{
        this.year_level_options = this.secondYearCourseOption
      }
    },
    clear(){
      this.email = ''
      this.first_name = ''
      this.last_name = ''
      this.selected_section = ''
      this.password = ''
      this.confirmPassword = ''
      this.selected_course = ''
      this.selected_year_level = ''
    },
    submit(){
      if(this.password === this.confirmPassword){
        this.$store.dispatch('auth/registerStudent', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          course: this.selected_course,
          year_level: this.selected_year_level,
          section: this.selected_section
        }).then(res => {
          if(res.response){
            this.clear()
            console.log(res)
            this.$router.push('/verify/'+res.user.user_id)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.makeToast(
          this, // context
          false, // append = true
          'Registration error', // title
          'Password does not match', // message
          4000, // auto hide delay
          'danger' // variant
        )
      }
    }
  }
}
</script>

<style scoped>
.signup-container{
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>