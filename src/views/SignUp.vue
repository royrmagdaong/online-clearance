<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-block d-md-none" style="margin-top:120px;"></div>
      <div class="col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 signup-container">
        <div class="card shadow px-2 py-2 mx-2 mx-sm-0 px-lg-4 py-lg-2" style="width:100%;">
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
                <b-form-select  @change="selectCourse" v-model="selected_course">
                  <option :value="null" disabled>-- Please select an option --</option>
                  <option v-for="course in courses" :value="course" :key="course._id">
                    {{ course.description }}
                  </option>
                </b-form-select>
              </div>
              <div class="form-group mb-2 row no-gutters">
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Section</label>
                  <b-form-select v-model="selected_section" :options="get(selected_course,'sections')" :disabled="disabled"></b-form-select>
                </div>
                <div class="col-12 pr-0 col-sm-6 pr-sm-1">
                  <label>Year level</label>
                  <b-form-select v-model="selected_year_level" :options="get(selected_course,'number_of_years')" :disabled="disabled"></b-form-select>
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
                <!-- <button type="submit" class="btn btn-warning mr-2" @click.prevent="clear">Clear</button> -->
                <b-button type="submit" variant="success" block @click.prevent="submit">Submit</b-button>
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
import {get} from 'lodash'

export default {
  mixins: [toast],
  data:()=>({
    get,
    selected_course: '',
    selected_section: '',
    selected_year_level: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
    disabled: true,
  }),
  computed:{
    courses(){
      return this.$store.getters['core/getCourses']
    }
  },
  methods:{
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
    selectCourse(){
      this.disabled = false
      this.selected_section = ''
      this.selected_year_level = ''
    },
    submit(){
      if(this.password === this.confirmPassword){
        this.$store.dispatch('auth/registerStudent', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          course: this.selected_course.code,
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