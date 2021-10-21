<template>
  <div class="container">
    <div class="row">
      <div class="col-1 col-md-3"></div>
      <div class="col-10 col-md-6">
        <div class="card shadow-sm py-2 px-3" style="margin-top: 120px;">
          <div class="card-body">
            <h4 class="card-title">Login</h4>
            <hr>
            <form>
              <div class="form-group mb-2">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
              </div>
              <div class="form-group mb-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-warning  mr-2" @click.prevent="">Clear</button>
                <button type="submit" class="btn btn-success" @click.prevent="login">Submit</button>
              </div>
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
  mounted(){
    let verified = localStorage.getItem('verified')
    if(verified){
      this.makeToast(
        this, // context
        false, // append = true
        'Verification successful', // title
        'Your newly registered account is verified. You can now login your account.', // message
        8000, // auto hide delay
        'success' // variant
      )
    }
    setTimeout(()=>{
      localStorage.setItem('verified', '')
    },300)
  },
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