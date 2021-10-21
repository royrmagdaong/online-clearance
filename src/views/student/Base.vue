<template>
  <div class="container py-4" style="position: relative;">
    <div class="row" style="margin-top: 60px;">
      <div class="col-3 card shadow-sm sidenav p-0" style="max-height: 341px; min-height: 341px;">
        <img height="120" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNfh5XEmL28p3fZftINhCjPR1g7V8IDWJ9-H58s0jyp4GMH_nWaRqFrRFu-6CJbaTdK0&usqp=CAU" class="rounded mx-auto mt-4 d-block" alt="prof_pic">
        <div class="text-center mt-4">
          <div class="p-3 student-info" @click="routeTo('student-info')" :class="{'active-tab': activeTab === 'student-info'}">Student Info</div>
          <div class="p-3 request-form" @click="routeTo('request-form')" :class="{'active-tab':activeTab === 'request-form'}">Request Form</div>
          <div class="p-3 print">Print</div>
        </div>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {get} from 'lodash'
export default {
    data:()=>({
        get,
        activeTab: ''
    }),
    computed:{

    },
    mounted(){
      this.activeTab = this.$route.path.substring(17)
    },
    methods:{
      routeTo(route){
        if(!this.$route.path.includes(route)){
            this.$router.push(route)
            this.activeTab = route
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
</style>