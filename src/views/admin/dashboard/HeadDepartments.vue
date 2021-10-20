<template>
  <div>
    <div class="overflow-auto">
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <b-form-input class="mr-2 mt-2 mb-2" v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchDepartments"></b-form-input>
          <b-button @click="createDeptModal = true" class="bg-success">Create Department</b-button>

          <!-- modal -->
          <b-modal title="Create Department" hide-footer hide-header-close no-close-on-backdrop :visible="createDeptModal">
            <form class="my-2 mx-4">
              <div class="form-group mb-2">
                <label>Name</label>
                <input type="text" class="form-control" v-model="name">
              </div>
              <div class="form-group mb-2">
                <label>Mobile Number</label>
                <input type="text" class="form-control" v-model="mobile_number">
              </div>
              <div class="form-group mb-2">
                <label>Telephone Number</label>
                <input type="text" class="form-control" v-model="telephone_number">
              </div>
              <div class="form-group mb-2">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="form-group mb-2">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="form-group mb-2">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="confirmPassword">
              </div>
              <div class="d-flex justify-content-end mt-4">
                <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
                <b-button type="submit" variant="success" @click.prevent="createDepartment">Submit</b-button>
              </div>
            </form>
          </b-modal>
        </div>

        <b-table
            id="my-table"
            :items="departments"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
        ></b-table>
        <div class="d-flex justify-content-end flex-row pg-1">
            <b-pagination
                v-model="currentPage"
                :total-rows="departments.length"
                :per-page="perPage"
                aria-controls="my-table"
                content-class="text-danger"
            ></b-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import {toast} from '../../../mixins/toast'

export default {
    mixins: [toast],
    data:()=>({
        searchString: '',
        perPage: 10,
        currentPage: 1,
        fields:['name','email','mobile_number','telephone_number'],
        createDeptModal: false,
        name: '',
        email: '',
        mobile_number: '',
        telephone_number: '',
        password: '',
        confirmPassword: ''
    }),
    computed: {
      departments(){
        return this.$store.getters['adminDepartments/getDepartments']
      }
    },
    mounted(){
      this.searchDepartments()
    },
    methods:{
      searchDepartments(){
        this.$store.dispatch('adminDepartments/getDepartments', { searchString: this.searchString })
      },
      cancel(){
        this.createDeptModal = false;
        this.name = ''
        this.email = ''
        this.mobile_number = ''
        this.telephone_number = ''
        this.password = ''
        this.confirmPassword = ''
      },
      createDepartment(){
        if(this.password === this.confirmPassword){
          this.$store.dispatch('adminDepartments/createDepartment', {
            email: this.email,
            password: this.password,
            name: this.name,
            mobile_number: this.mobile_number,
            telephone_number: this.telephone_number
          }).then(res => {
            if(res.response){
              this.searchDepartments()
              this.makeToast(
                this, // context
                false, // append = true
                'Created successfully', // title
                `${this.email} created successfully.`, // message
                4000, // auto hide delay
                'success' // variant
              )
              this.cancel()
            }
          }).catch(err => {
            this.makeToast(
              this, // context
              false, // append = true
              'Creation error', // title
              err.message, // message
              4000, // auto hide delay
              'danger' // variant
            )
            this.cancel()
          })
        }else{
          this.makeToast(
            this, // context
            false, // append = true
            'Creation error', // title
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

</style>