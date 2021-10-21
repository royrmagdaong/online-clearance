<template>
  <div class="container">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="card shadow-sm py-2 px-3" style="margin-top: 120px;">
          <div class="card-body">
            <form>
              <div class="form-group mb-2 row no-gutters justify-content-center">
                <p class="my-2 font-weight-bold">Verification Code</p>
                <input type="text" class="form-control text-center" v-model="code">
                <b-button type="submit" class="mt-3" variant="success" block @click.prevent="verify">Submit</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
import {toast} from '../mixins/toast'

export default {
  mixins: [toast],
  data:()=>({
    code: ''
  }),
  methods:{
    verify(){
      if(this.code){
        this.$store.dispatch('auth/verifyStudent', {
          id: this.$route.params.id,
          code: this.code
        }).then(res => {
          console.log(res)
          if(res.response){
            localStorage.setItem('verified', true)
            this.$router.push('/login')
          }else{
            this.makeToast(
              this, // context
              false, // append = true
              'Verification error', // title
              res.message, // message
              4000, // auto hide delay
              'danger' // variant
            )
          }
        }).catch(err => {
          console.log(err)
          this.makeToast(
            this, // context
            false, // append = true
            'Verification error', // title
            err.message, // message
            4000, // auto hide delay
            'danger' // variant
          )
        })
      }
    }
  }
}
</script>

<style>

</style>