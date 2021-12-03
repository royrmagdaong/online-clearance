<template>
  <div>
    <div class="card p-4 shadow-sm" v-if="requirements.length < 1">
      <div class="h5 d-none d-sm-block">You currently don't have requirements posted in here.</div>
      <div class="h6 d-sm-none d-block">You currently don't have requirements posted in here.</div>
      <div class="">Click add requirements button to add requirements.</div>
    </div>
    <div class="card p-4 shadow-sm" v-else>
      <div class="h5">Requirements.</div>
      <hr>
      <div v-for="(requirement,index) in requirements" :key="index">
        <div class="wrap">
          <span class="font-weight-bold">{{index+1}}. <a :href="`${endpoints.viewRequirementsUrl}/${get(requirement,'filename')}`" target="_blank">{{ get(requirement, 'title') }}</a></span>
          <b-icon icon="pencil-square" variant="primary" class="ml-2 edit-req" @click="editRequirements(requirement)"></b-icon>
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
            <label class="mt-2">Additional Info:</label>
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

    <!-- edit modal -->
    <b-modal title="Edit Requirements" hide-footer hide-header-close no-close-on-backdrop :visible="requirementModal_edit">
      <div>
        <form @submit.prevent="" enctype="multipart/form-data">
          <div class="col-12 px-0">
            <label>Title:</label>
            <b-form-input placeholder="Enter your name" v-model="title_edit"></b-form-input>
            <label class="mt-2">Additional Info:</label>
            <b-form-textarea
              id="textarea"
              v-model="instructions_edit"
              placeholder="Add additional info here."
              rows="3"
              max-rows="12"
            ></b-form-textarea>
          </div>
          <input type="file" name="requirements"  class="mt-3" accept="image/png, image/jpeg, application/pdf" @change="onChange_edit"/>
          <div style="font-size:12px;">*png, jpg, pdf only</div>
        </form>
        <div class="d-flex justify-content-end">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel_edit">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="uploadRequirements_edit">Save</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {get} from 'lodash'
import {toast} from '../../../mixins/toast'
import endpoints from '../../../endpoints'

export default {
  mixins: [toast],
  data:()=>({
    endpoints,
    get,
    requirementModal: false,
    requirementModal_edit: false,
    file: null,
    title: '',
    instructions: '',
    requirements_upload: null,
    file_edit: null,
    title_edit: '',
    instructions_edit: '',
    requirements_upload_edit: null,
    requirement_id: null,
    requirement_path: null
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
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    cancel_edit(){
      this.requirementModal_edit = false
      this.title_edit = ''
      this.instructions_edit = ''
    },
    onChange_edit(event) {
      this.requirements_upload_edit = event.target.files[0]
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    fetchRequirements(){
      this.$store.dispatch('departmentRequirements/getRequirements',{})
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
            this.makeToast(this, false, 'Upload failed', err.message, 4000, 'danger')
          })
        }else{
          this.makeToast(this, false, 'Upload warning', 'You need to choose file/s first.', 4000, 'warning')
        }
    },
    uploadRequirements_edit(){
      if(this.requirements_upload_edit){
        const formData = new FormData()
        formData.append('requirements',this.requirements_upload_edit)
        formData.append('req_id', this.requirement_id)
        formData.append('title_edit', this.title_edit)
        formData.append('instructions_edit', this.instructions_edit)
        formData.append('path', this.requirement_path)

        this.$store.dispatch('departmentRequirements/updateRequirements',{
          formData:formData
        }).then(res=>{
          if(res.response){
            this.fetchRequirements()
            this.makeToast(this, false, 'Update Success', res.message, 4000, 'success')
            this.cancel_edit()
          }
        }).catch(err=>{
          this.makeToast(this, false, 'Update failed', err.message, 4000, 'danger')
        })
      }else{
        this.makeToast(this, false, 'Update warning', 'You need to choose file/s first.', 4000, 'warning')
      }
    },
    editRequirements(req){
      this.title_edit = req.title
      this.instructions_edit = req.instructions
      this.requirementModal_edit = true
      this.requirement_id = req._id
      this.requirement_path = req.path
    }
  }
}
</script>

<style scoped>
.edit-req:hover{
  cursor: pointer;
}
</style>