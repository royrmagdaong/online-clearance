<template>
  <div class="p-2">
    <div class="overflow-auto">
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <b-form-input class="mr-2 mt-2 mb-2" v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchDepartments"></b-form-input>
        </div>

        <b-table
            id="my-table"
            :items="departments"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
            responsive
            head-variant="dark"
            outlined
            striped
            table-variant="secondary"
            class="d-none d-sm-block"
        >
          <template #cell(signature)="row">
            <div class="d-flex justify-content-center">
              <img :src="getSign(row.item)" alt="Signature" v-if="getSign(row.item)" width="110">
            </div>
          </template>
          <template #cell(actions)="row">
            <div class="d-flex justify-content-center align-items-center" style="min-height: 50px !important;">
              <b-button 
                size="sm" 
                variant="success"
                @click="showUpdateDepartment(row.item)"
              >
                Update
              </b-button>
            </div>
          </template>
        </b-table>
        <div class="d-flex justify-content-end flex-row pg-1">
            <b-pagination
                v-model="currentPage"
                :total-rows="departments.length"
                :per-page="perPage"
                aria-controls="my-table"
                class="d-none d-sm-flex"
            ></b-pagination>
        </div>

        <!-- FOR XS -->
        <b-table
            id="my-table"
            :items="departments"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
            responsive
            head-variant="dark"
            outlined
            striped
            stacked
            table-variant="secondary"
            class="d-block d-sm-none"
        >
          <template #cell(signature)="row">
            <div class="d-flex justify-content-start">
              <img class="" :src="getSign(row.item)" alt="Signature" v-if="getSign(row.item)" width="110">
            </div>
          </template>
          <template #cell(actions)="row">
            <div>
              <b-button 
                size="sm" 
                variant="success"
                @click="showUpdateDepartment(row.item)"
                style="width:166%;"
              >
                Update
              </b-button>
            </div>
          </template>
        </b-table>
        <div class="d-flex justify-content-end flex-row pg-1">
            <b-pagination
                v-model="currentPage"
                :total-rows="departments.length"
                :per-page="perPage"
                aria-controls="my-table"
                class="d-flex d-sm-none"
            ></b-pagination>
        </div>
    </div>
    <!-- create modal -->
    <b-modal title="Create Department" hide-footer hide-header-close no-close-on-backdrop :visible="createDeptModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2">
          <label>In Charge</label>
          <input type="text" class="form-control" v-model="in_charge">
        </div>
        <div class="form-group mb-2">
          <label>Department Name</label>
          <input type="text" class="form-control" v-model="department_name">
        </div>
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <label>Mobile Number</label>
            <input type="text" class="form-control" v-model="mobile_number">
          </div>
          <div class="col-6 pl-1">
            <label>Telephone Number</label>
            <input type="text" class="form-control" v-model="telephone_number">
          </div>
        </div>
        <div class="form-group mb-2">
          <label>Email address</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <label>Password</label>
          <input type="password" class="form-control" v-model="password">
          </div>
          <div class="col-6 pl-1">
            <label>Confirm Password</label>
          <input type="password" class="form-control" v-model="confirmPassword">
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="createDepartment">Submit</b-button>
        </div>
      </form>
    </b-modal>

    <!-- update modal -->
    <b-modal title="Update Department" hide-footer hide-header-close no-close-on-backdrop :visible="updateModal">
      <form class="my-2 mx-3 mx-sm-4">
        <div class="form-group mb-2">
          <label>In Charge</label>
          <input type="text" class="form-control" v-model="in_charge_upd">
        </div>
        <!-- <div class="form-group mb-2">
          <label>Department Name</label>
          <input type="text" class="form-control" v-model="department_name_upd">
        </div> -->
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <label class="d-none d-sm-block">Mobile Number</label>
            <label class="d-block d-sm-none">Mobile Num</label>
            <input type="text" class="form-control" v-model="mobile_number_upd">
          </div>
          <div class="col-6 pl-1">
            <label class="d-none d-sm-block">Telephone Number</label>
            <label class="d-block d-sm-none">Telephone Num</label>
            <input type="text" class="form-control" v-model="telephone_number_upd">
          </div>
        </div>
        <hr>
        <div class="form-group mb-2">
          <form @submit.prevent="" enctype="multipart/form-data">
            <div class="col-12 px-0">
              <label>Signature</label>
            </div>
            <div class="col-12 px-0 text-center">
              <img :src="signature" alt="Signature" width="240">
            </div>
            <input type="file" name="signature"  class="mt-3" @change="onChange"/>
          </form>
        </div>
        
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="updateDepartment">Submit</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {toast} from '../../../mixins/toast'
import {get} from 'lodash'

export default {
    mixins: [toast],
    data:()=>({
        get,
        searchString: '',
        perPage: 10,
        currentPage: 1,
        fields:['in_charge',"department_name",'email','mobile_number','telephone_number', 'signature',{key: 'actions', label: ''}],
        createDeptModal: false,
        in_charge: '',
        department_name: '',
        email: '',
        mobile_number: '',
        telephone_number: '',
        password: '',
        confirmPassword: '',
        updateModal: false,
        signature: '',
        signature_upd: '',
        in_charge_upd: '',
        department_name_upd: '',
        mobile_number_upd: '',
        telephone_number_upd: '',
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
      onChange(event) {
        this.signature_upd = event.target.files[0]
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload =  (e) => {
            this.signature = e.target.result
          };
          reader.readAsDataURL(event.target.files[0]);
        }
        
      },
      cancel(){
        this.createDeptModal = false;
        this.updateModal = false;
        this.in_charge = ''
        this.department_name = ''
        this.email = ''
        this.mobile_number = ''
        this.telephone_number = ''
        this.password = ''
        this.confirmPassword = ''
      },
      getSign(dept){
        let sign = ''
        sign = `data:${get(dept,'signature.type')};${get(dept,'signature.base')},${get(dept,'signature.img')}`
        return sign
      },
      createDepartment(){
        if(this.password === this.confirmPassword){
          this.$store.dispatch('adminDepartments/createDepartment', {
            email: this.email,
            password: this.password,
            in_charge: this.in_charge,
            department_name: this.department_name,
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
      },
      showUpdateDepartment(department){
        this.dept_id = department._id;
        this.updateModal = true
        this.in_charge_upd = department.in_charge
        this.department_name_upd = department.department_name
        this.mobile_number_upd = department.mobile_number
        this.telephone_number_upd = department.telephone_number
        this.signature = `data:${get(department,'signature.type')};${get(department,'signature.base')},${get(department,'signature.img')}`
      },
      updateDepartment(){
        if(this.signature_upd){
          const formData = new FormData()
          formData.append('signature',this.signature_upd)
          formData.append('dept_id', this.dept_id)
          formData.append('in_charge', this.in_charge_upd)
          formData.append('department_name', this.department_name_upd)
          formData.append('mobile_number', this.mobile_number_upd)
          formData.append('telephone_number', this.telephone_number_upd)

          this.$store.dispatch('adminDepartments/uploadSignature',{
            formData:formData
          }).then(res=>{
            if(res.response){
              // this.getDepartment()
              this.searchDepartments()
              this.makeToast(this, false, 'Update Successful', res.message, 4000, 'success')
              this.updateModal = false
            }
          }).catch(err=>{
            this.makeToast(this, false, 'Update Failed', err.message, 4000, 'danger')
          })
        }else{
          this.makeToast(this, false, 'Update Failed', 'Please choose a file', 4000, 'warning')
        }
      }
    }
}
</script>

<style scoped>
element.style {
    padding-left: 0;
}
</style>