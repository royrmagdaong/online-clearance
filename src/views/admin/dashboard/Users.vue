<template>
  <div class="p-2">
    <div class="d-flex mb-1 align-items-center">
      <b-form-input v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchUser"></b-form-input>
      <b-dropdown id="dropdown-form" text="Role" ref="dropdown" class="m-2" variant="success" dropright>
        <b-dropdown-form style="min-width: 200px;">
          <b-form-checkbox v-model="cb_all" class="mb-1" @change="selectAll">All</b-form-checkbox>
          <b-form-checkbox v-model="cb_admin" class="mb-1" @change="selectAdmin">Admin</b-form-checkbox>
          <b-form-checkbox v-model="cb_department" class="mb-1" @change="selectDepartment">Head Department</b-form-checkbox>
          <b-form-checkbox v-model="cb_student" class="mb-1" @change="selectStudent">Student</b-form-checkbox>
        </b-dropdown-form>
      </b-dropdown>
    </div>

    <b-table
      id="my-table"
      :items="users"
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
    ></b-table>
    <div class="d-flex justify-content-end flex-row">
      <b-pagination
          v-model="currentPage"
          :total-rows="get(users, 'length')"
          :per-page="perPage"
          aria-controls="my-table"
          class="d-none d-sm-flex"
      ></b-pagination>
    </div>
    <!-- for xs -->
    <b-table
      id="my-table"
      :items="users"
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
    ></b-table>
    <div class="d-flex justify-content-end flex-row">
      <b-pagination
          v-model="currentPage"
          :total-rows="get(users, 'length')"
          :per-page="perPage"
          aria-controls="my-table"
          class="d-flex d-sm-none"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import {get} from 'lodash'
export default {
    data:()=>({
        get,
        searchString: '',
        perPage: 10,
        currentPage: 1,
        fields:['email', 'role', 'is_verified'],
        cb_all: true,
        cb_admin: true,
        cb_department: true,
        cb_student: true,
    }),
    computed: {
      users(){
        return this.$store.getters['adminUsers/getUsers']
      }
    },
    mounted(){
      this.searchUser()
    },
    methods:{
      searchUser(){
        this.$store.dispatch('adminUsers/getUsers', { 
          searchString: this.searchString,  
          admin: this.cb_admin, 
          department: this.cb_department, 
          student: this.cb_student
        })
      },
      selectAll(){
        if(this.cb_all){
          this.cb_admin = true
          this.cb_department = true
          this.cb_student = true
        }else{
          this.cb_admin = false
          this.cb_department = false
          this.cb_student = false
        }
        this.searchUser()
      },
      selectAdmin(){
        if(this.cb_all && !this.cb_admin){
          this.cb_all = false
        }
        this.searchUser()
      },
      selectDepartment(){
        if(this.cb_all && !this.cb_department){
          this.cb_all = false
        }
        this.searchUser()
      },
      selectStudent(){
        if(this.cb_all && !this.cb_student){
          this.cb_all = false
        }
        this.searchUser()
      }
    }
}
</script>

<style>
.page-item.active .page-link {
    background-color: #28a745 !important;
}
</style>