<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-1 col-md-3"></div>
      <div class="col-10 col-md-6">
        <div class="card shadow-sm py-2 px-3">
          <div class="card-body">
            <h4 class="card-title">Login</h4>
            <form>
              <div class="form-group mb-2">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
              </div>
              <div class="form-group mb-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="login">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-1 col-md-3"></div>
    </div>
  </div>
</template>

<script>
import {toast} from '../mixins/toast'
export default {
  mixins: [toast],
  data:()=>({
    email: '',
    password: ''
  }),
  methods:{
    login(){
      this.$store.dispatch('auth/signIn',{
        email: this.email,
        password: this.password
      }).then(res =>{
        if(res.response){
          this.$router.push(res.data.role)
        }
      }).catch(err => {
        this.makeToast(
          this, // context
          false, // append = true
          'Login error', // title
          err.response.data.message, // message
          4000, // auto hide delay
          'danger' // variant
        )
      })
    }
  }
}
</script>

<style>

</style>