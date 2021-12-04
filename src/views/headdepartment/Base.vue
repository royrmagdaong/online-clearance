<template>
  <div class="container py-4" style="position: relative;">
    <div class="row" style="margin-top: 60px;">
      <div class="col-12 col-md-3 card shadow-sm sidenav p-0 d-none d-md-block" style="max-height: 455px; min-height: 455px;">
        <div style="width:120px;height:120px;;border-radius:50%;position:relative;" class="mx-auto mt-4 d-block">
          <img @click="openChangePicModal" id="prof-pic" :src="`${endpoints.viewDeptProfilePic}/${get(department, 'profile_pic.filename')}`" />
          <div id="prof-pic-icon">
            <b-icon icon="camera" style="width:40px;height:40px;" rounded></b-icon>
          </div>
        </div>
        <div class="text-center mt-4">
          <div class="p-3 student-info" @click="routeTo('dashboard')" :class="{'active-tab': activeTab === 'dashboard'}">Dashboard</div>
          <div class="p-3 faculty" @click="routeTo('student-request')" :class="{'active-tab': activeTab === 'student-request'}">Student Request</div>
          <div class="p-3 request-form" @click="routeTo('approved')" :class="{'active-tab':activeTab === 'approved'}">Approved</div>
          <div class="p-3 request-form" @click="routeTo('requirements')" :class="{'active-tab':activeTab === 'requirements'}">Requirements</div>
          <div class="p-3 print">Print</div>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <router-view></router-view>
      </div>
    </div>

    <!-- change pic modal -->
    <b-modal title="Change Profile Picture" hide-footer hide-header-close no-close-on-backdrop :visible="changePicModal">
      <div style="width:180px;height:180px;overflow:hidden;border-radius:50%;" class="mx-auto d-block my-4">
        <img @click="changePicModal = true" id="prof-pic-change" :src="profilePicture" alt="change picture" />
      </div>
      <form @submit.prevent="" enctype="multipart/form-data">
        <input type="file" name="profilepicture"  class="mt-3 mx-auto" accept="image/png, image/jpeg" @change="onChange"/>
        <div style="font-size:12px;">*png, and jpg only</div>
      </form>
      <div class="d-flex justify-content-end mt-4">
        <b-button variant="warning" class="mr-2" @click.prevent="close">Close</b-button>
        <b-button variant="success" class="mr-2" @click.prevent="changePic">Save</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import {get} from 'lodash'
import endpoints from '../../endpoints'
import {toast} from '../../mixins/toast'

export default {
    mixins: [toast],
    data:()=>({
        get,
        endpoints,
        activeTab: '',
        changePicModal: false,
        profilePictureUpload: '',
        profilePicture: ''
    }),
    computed:{
      department(){
        return this.$store.getters['departmentDashboard/getDepartment']
      }
    },
    mounted(){
      this.activeTab = this.$route.path.substring(17)
      this.getDepartment()

      // watch for call from other component
      this.$root.$on('openChangePicModal',()=>{
        this.openChangePicModal()
      })
    },
    methods:{
      routeTo(route){
        if(!this.$route.path.includes(route)){
            this.$router.push(route)
            this.activeTab = route
        }
      },
      getDepartment(){
        this.$store.dispatch('departmentDashboard/getDepartment')
      },
      close(){
        this.changePicModal = false
      },
      changePic(){
        const formData = new FormData()
        formData.append('profilepicture',this.profilePictureUpload)
        if(this.profilePictureUpload){
          this.$store.dispatch('departmentBase/changeProfilePictureDept', {
            formData
          }).then(res=>{
            if(res.response){
              this.changePicModal = false
              this.getDepartment()
              this.makeToast(this, false, 'Saved', res.message, 4000, 'success')
            }else{
              this.makeToast(this, false, 'Save failed', res.message, 4000, 'warning')
            }
          }).catch(error=>{
            this.makeToast(this, false, 'Save failed', error.message, 4000, 'danger')
          })
        }else{
          this.makeToast(this, false, 'Save Failed', 'Please Choose an image', 4000, 'warning')
        }
      },
      openChangePicModal(){
        this.profilePicture = `${this.endpoints.viewStudentProfilePic}/${get(this.department, 'profile_pic.filename')}`
        this.changePicModal = true
      },
      onChange(event) {
        this.profilePictureUpload = event.target.files[0]
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload =  (e) => {
            this.profilePicture = e.target.result
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      },
    }
}
</script>

<style scoped>
.sidenav{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 84px;
}
.faculty {
  border-top: 1px solid rgb(224, 224, 224);
  border-bottom: 1px solid rgb(224, 224, 224);
}
.student-info {
  border-top: 1px solid rgb(224, 224, 224);
}
.print, .request-form {
  border-bottom: 1px solid rgb(224, 224, 224);
}
.faculty:hover, .student-info:hover, .print:hover, .request-form:hover{
  background-color: rgb(86, 182, 107);
  color: white;
  cursor: pointer;
}
.active-tab{
  background-color: rgb(86, 182, 107);
  color: white;
  cursor: pointer;
}
#prof-pic-icon{
  position: absolute;
  height: 40px;
  width: 100%;
  top: 42px;
  color: #007bff;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;
}
#prof-pic{
  background-color: #eee !important;
  height: 120px;
  width: 120px;
  border-radius: 60px;
}
#prof-pic:hover{
  opacity: 0.4;
  cursor: pointer;
}
#prof-pic-change{
  width:180px;
  height:180px;
  border-radius: 90px;
}
</style>