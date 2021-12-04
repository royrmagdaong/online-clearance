<template>
  <div class="px-5 py-4 card shadow-sm">
      
    <div class="d-md-none my-4">
      <div style="width:120px;height:120px;;border-radius:50%;position:relative;" class="mx-auto d-block">
        <img @click="openChangePicModal" class="prof-pic" :src="`${endpoints.viewDeptProfilePic}/${get(department, 'profile_pic.filename')}`" />
      </div>
      <div class="d-flex justify-content-center">
        <img :src="signature" alt="Signature" style="width:160px; height:auto;">
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="h3 mb-2">{{ get(department, 'department_name') }}</div>
        <!-- <b-icon class="edit-info ml-2" icon="pencil" variant="primary" font-scale="1"></b-icon> -->
      </div>
      <div class="text-center">{{ get(department, 'in_charge') }}</div>
      <div class="text-center">{{ get(department, 'email') }}</div>
    </div>

    <div class="d-none d-md-block">
      <div class="d-flex justify-content-between align-items-center">
        <div class="h3 mb-2">{{ get(department, 'department_name') }}</div>
        <!-- <b-icon class="edit-info" icon="pencil" variant="primary" font-scale="1"></b-icon> -->
      </div>
      <div class="">{{ get(department, 'in_charge') }}</div>
      <div class="">{{ get(department, 'email') }}</div>
      <div>
        <span class="mr-4">Signature</span>
        <img :src="signature" alt="Signature" style="width:160px; height:auto;">
      </div>
    </div>

  </div>
</template>

<script>
import {get} from 'lodash'
import endpoints from '../../../endpoints'
import {toast} from '../../../mixins/toast'

export default {
  mixins: [toast],
  data:()=>({
    endpoints,
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
    openChangePicModal(){
      this.$root.$emit('openChangePicModal')
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

<style scoped>
.prof-pic{
  background-color: #eee !important;
  height: 120px;
  width: 120px;
  border-radius: 60px;
}
.prof-pic:hover{
  opacity: 0.4;
  cursor: pointer;
}
</style>