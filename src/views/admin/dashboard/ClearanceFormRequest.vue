<template>
  <div>
    <div>
        <div class="d-flex mb-1 align-items-center">
          <b-form-input v-model="searchString" placeholder="Search" style="max-width: 250px;" debounce="300" @update="searchStudents"></b-form-input>
          <b-dropdown id="dropdown-form2" text="Course" ref="dropdown2" class="ml-2" variant="success">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox v-model="cb_all" class="mb-1" @change="selectAll">All</b-form-checkbox>
              <b-form-checkbox v-model="cb_bsit" class="mb-1" value="BSIT" unchecked-value="" @change="selectBSIT">BSIT</b-form-checkbox>
              <b-form-checkbox v-model="cb_ccs" class="mb-1" value="CCS" unchecked-value="" @change="selectCCS">CCS</b-form-checkbox>
              <b-form-checkbox v-model="cb_bsoa" class="mb-1" value="BSOA" unchecked-value="" @change="selectBSOA">BSOA</b-form-checkbox>
              <b-form-checkbox v-model="cb_hrm" class="mb-1" value="HRM" unchecked-value="" @change="selectHRM">HRM</b-form-checkbox>
            </b-dropdown-form>
          </b-dropdown>
          <b-dropdown id="dropdown-form3" text="Year level" ref="dropdown3" class="m-2" variant="success">
            <b-dropdown-form style="min-width: 150px;">
              <b-form-checkbox v-model="cb_all2" class="mb-1" @change="selectAll2">All</b-form-checkbox>
              <b-form-checkbox v-model="cb_1st" class="mb-1" value="1st" unchecked-value="" @change="select1st">1ST</b-form-checkbox>
              <b-form-checkbox v-model="cb_2nd" class="mb-1" value="2nd" unchecked-value="" @change="select2nd">2ND</b-form-checkbox>
              <b-form-checkbox v-model="cb_3rd" class="mb-1" value="3rd" unchecked-value="" @change="select3rd">3RD</b-form-checkbox>
              <b-form-checkbox v-model="cb_4th" class="mb-1" value="4th" unchecked-value="" @change="select4th">4TH</b-form-checkbox>
            </b-dropdown-form>
          </b-dropdown>
        </div>

        <b-table
            id="my-table"
            :items="clearanceFormRequests"
            :per-page="perPage"
            :current-page="currentPage"
            bordered
            :fields="fields"
        ></b-table>
        <div class="d-flex justify-content-end flex-row">
            <b-pagination
                v-model="currentPage"
                :total-rows="clearanceFormRequests.length"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    data:()=>({
        searchString: '',
        perPage: 10,
        currentPage: 1,
        fields:[
          {key:'student.first_name', label: 'First Name'}, 
          {key:'student.last_name', label: 'Last Name'},
          'course', 'year_level','section'
        ],
        cb_all: true,
        cb_bsit: 'BSIT',
        cb_ccs: 'CCS',
        cb_bsoa: 'BSOA',
        cb_hrm: 'HRM',
        cb_all2: true,
        cb_1st: '1st',
        cb_2nd: '2nd',
        cb_3rd: '3rd',
        cb_4th: '4th'
    }),
    computed: {
      clearanceFormRequests(){
        return this.$store.getters['adminClearanceFormRequests/getClearanceFormRequests']
      }
    },
    mounted(){
      this.getClearanceFormRequests()
      this.searchStudents()
    },
    methods:{
      getClearanceFormRequests(){
        this.$store.dispatch('adminClearanceFormRequests/getClearanceFormRequests')
      },
      searchStudents(){
        console.log('search')
      },
      selectAll(){
        if(this.cb_all){
          this.cb_bsit = 'BSIT'
          this.cb_ccs = 'CCS'
          this.cb_bsoa = 'BSOA'
          this.cb_hrm = 'HRM'
        }else{
          this.cb_bsit = ''
          this.cb_ccs = ''
          this.cb_bsoa = ''
          this.cb_hrm = ''
        }
        this.searchStudents()
      },
      selectAll2(){
        if(this.cb_all2){
          this.cb_1st = '1st'
          this.cb_2nd = '2nd'
          this.cb_3rd = '3rd'
          this.cb_4th = '4th'
        }else{
          this.cb_1st = ''
          this.cb_2nd = ''
          this.cb_3rd = ''
          this.cb_4th = ''
        }
        this.searchStudents()
      },
      selectBSIT(){
        if(this.cb_all && !this.cb_bsit){
          this.cb_all = false
        }
        this.searchStudents()
      },
      selectBSOA(){
        if(this.cb_all && !this.cb_bsoa){
          this.cb_all = false
        }
        this.searchStudents()
      },
      selectCCS(){
        if(this.cb_all && !this.cb_ccs){
          this.cb_all = false
        }
        this.searchStudents()
      },
      selectHRM(){
        if(this.cb_all && !this.cb_hrm){
          this.cb_all = false
        }
        this.searchStudents()
      },
      select1st(){
        if(this.cb_all2 && !this.cb_1st){
          this.cb_all2 = false
        }
        this.searchStudents()
      },
      select2nd(){
        if(this.cb_all2 && !this.cb_2nd){
          this.cb_all2 = false
        }
        this.searchStudents()
      },
      select3rd(){
        if(this.cb_all2 && !this.cb_3rd){
          this.cb_all2 = false
        }
        this.searchStudents()
      },
      select4th(){
        if(this.cb_all2 && !this.cb_4th){
          this.cb_all2 = false
        }
        this.searchStudents()
      }
    }
}
</script>

<style scoped>
</style>