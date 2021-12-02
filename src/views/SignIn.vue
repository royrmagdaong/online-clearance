<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 signin-container">
        <div class="card shadow px-2 py-2 mx-2 mx-sm-0 px-lg-4 py-lg-4" style="width:100%;">
          <div class="card-body">
            <h4 class="card-title">Login</h4>
            <hr>
            <div class="form-group mb-2">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="form-group mb-2">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" v-on:keyup.enter="login">
            </div>
            <div class="d-flex justify-content-end mt-4">
              <!-- <button type="submit" class="btn btn-warning  mr-2" @click.prevent="clear">Clear</button>
              <button type="submit" class="btn btn-success" @click.prevent="login">Submit</button> -->
              <b-button type="submit" variant="success" block @click.prevent="login">Submit</b-button>
            </div>
          </div>
        </div>
      </div>
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
    clear(){
      this.email = ''
      this.password = ''
    },
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

<style scoped>
.signin-container{
  height: 90vh;
  display: flex;
  align-items: center;
}

</style>