<template>
  <div>
    <div class="overflow-auto">
        <div class="d-flex mb-1 align-items-center justify-content-between">
          <b-form-input class="mr-2 mt-2 mb-2" v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchCourse"></b-form-input>
        </div>

        <b-table
            id="my-table"
            :items="courses"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
            responsive
        >
          <template #cell(sections)="row">
            <div class="">
              <span v-for="(section,index) in get(row, 'item.sections')" :key="index">
                <span>{{ section }}</span>
                <span v-if="get(row, 'item.sections').length-1 !== index">, </span>
              </span>
            </div>
          </template>
          <template #cell(actions)="row">
            <div class="d-flex justify-content-center align-items-center">
              <b-button 
                size="sm" 
                variant="info"
                @click="showUpdateCourse(row.item)"
              >
                Update
              </b-button>
            </div>
          </template>
        </b-table>
        <div class="d-flex justify-content-end flex-row pg-1">
            <b-pagination
                v-model="currentPage"
                :total-rows="1"
                :per-page="perPage"
                aria-controls="my-table"
                content-class="text-danger"
            ></b-pagination>
        </div>
    </div>
    <!-- create modal -->
    <!-- <b-modal title="Create Department" hide-footer hide-header-close no-close-on-backdrop :visible="createDeptModal">
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
    </b-modal> -->
  </div>
</template>

<script>
import {toast} from '../../../mixins/toast'
import {get} from 'lodash'

export default {
  mixins: [toast],
    data:()=>({
      get,
      perPage:10,
      currentPage: 1,
      searchString:'',
      fields:['code','description', {key: 'sections', label: 'Sections'}, {key: 'actions', label: ''}],
    }),
    computed: {
      courses(){
        return this.$store.getters['core/getCourses']
      }
    },
    mounted(){
      
    },
    methods:{
      searchCourse(){
        console.log('search course')
      },
      showUpdateCourse(){
        console.log('update course')
      }
    }
}
</script>

<style scoped>
</style>