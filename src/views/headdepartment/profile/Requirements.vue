<template>
  <div>
    <div class="card p-4 shadow-sm" v-if="false">
      <div class="h5">You currently don't have requirements posted in here.</div>
      <div class="">Click add requirements button to add requirements.</div>
    </div>
    <div class="card p-4 shadow-sm" v-else>
      <div class="h5">Requirements.</div>
      <hr>
      <div v-for="(requirement,index) in requirements" :key="index">
        <div class="">
          <span class="font-weight-bold">{{index+1}}. {{ get(requirement, 'title') }}</span>
          <span> - <a href="../testrequirements.pdf" target="_blank">Library card sample</a></span>
        </div>
        <ul>
          <li>{{ get(requirement, 'instructions') }}</li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-2">
      <b-button variant="success" @click="requirementModal = true">Add Requirements</b-button>
    </div>

    <!-- modal -->
    <b-modal title="Add Requirements" hide-footer hide-header-close no-close-on-backdrop :visible="requirementModal">
      <div>
        <form @submit.prevent="" enctype="multipart/form-data">
          <div class="col-12 px-0">
            <label>Title:</label>
            <b-form-input placeholder="Enter your name" v-model="title"></b-form-input>
            <label class="mt-2">Instructions:</label>
            <b-form-textarea
              id="textarea"
              v-model="instructions"
              placeholder="Add additional info here."
              rows="3"
              max-rows="12"
            ></b-form-textarea>
          </div>
          <input type="file" name="requirements"  class="mt-3" accept="image/png, image/jpeg, application/pdf" @change="onChange"/>
          <div style="font-size:12px;">*png, jpg, pdf only</div>
        </form>
        <div class="d-flex justify-content-end">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="uploadRequirements">Save</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {get} from 'lodash'
import {toast} from '../../../mixins/toast'
export default {
  mixins: [toast],
  data:()=>({
    get,
    requirementModal: false,
    file: null,
    title: '',
    instructions: '',
    requirements_upload: null
  }),
  computed:{
    userInfo(){
      return this.$store.getters['auth/getUserInfo']
    },
    requirements(){
      return this.$store.getters['departmentRequirements/getRequirements']
    }
  },
  mounted(){
    this.fetchRequirements()
  },
  methods:{
    cancel(){
      this.requirementModal = false
      this.title = ''
      this.instructions = ''
    },
    onChange(event) {
      this.requirements_upload = event.target.files[0]
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload =  (e) => {
          this.signature = e.target.result
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    fetchRequirements(){
      this.$store.dispatch('departmentRequirements/getRequirements')
    },
    uploadRequirements(){
        if(this.requirements_upload){
          const formData = new FormData()
          formData.append('requirements',this.requirements_upload)
          formData.append('user_id', get(this.userInfo, 'id'))
          formData.append('title', this.title)
          formData.append('instructions', this.instructions)

          this.$store.dispatch('departmentRequirements/uploadRequirements',{
            formData:formData
          }).then(res=>{
            if(res.response){
              this.fetchRequirements()
              this.makeToast(this, false, 'Upload Success.', res.message, 4000, 'success')
              this.cancel()
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          console.log('choose image')
        }
      }
  }
}
</script>

<style>

</style>