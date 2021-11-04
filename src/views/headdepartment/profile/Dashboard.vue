<template>
  <div>
      <div class="h3">Dashboard</div>
      
      <img :src="signature" alt="Signature">
  </div>
</template>

<script>
import {get} from 'lodash'

export default {
  data:()=>({
    get,
    signature: null,
  }),
  computed:{
    department(){
      return this.$store.getters['departmentDashboard/getDepartment']
    }
  },
  mounted(){
    this.getDepartment()
  },
  methods:{
    getDepartment(){
      this.$store.dispatch('departmentDashboard/getDepartment').then(res=>{
        if(res.response){
          this.signature = `data:${get(this.department,'signature.type')};${get(this.department,'signature.base')},${get(this.department,'signature.img')}`
        }
      })
    },
    // onChange (event) {
    //   this.signature = event.target.files[0]
    // },
    // async uploadFile(){
    //   if(this.signature){
    //     const formData = new FormData()
    //     formData.append('signature',this.signature)
    //     await this.$store.dispatch('departmentDashboard/uploadSignature',formData).then(res=>{
    //       if(res.response){
    //         this.getDepartment()
    //       }
    //     }).catch(err=>{
    //       console.log(err)
    //     })
    //   }else{
    //     console.log('choose image')
    //   }
    // }
  }
}
</script>

<style>

</style>