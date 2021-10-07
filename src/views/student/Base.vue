<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-3 card shadow-sm" style="min-height: 700px;">
        <img height="150" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNfh5XEmL28p3fZftINhCjPR1g7V8IDWJ9-H58s0jyp4GMH_nWaRqFrRFu-6CJbaTdK0&usqp=CAU" class="rounded mx-auto d-block" alt="prof_pic">
        <div class="text-center mt-2 text-capitalize">{{ get(userInfo, 'name') }}</div>
      </div>
      <div class="col-7">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {get} from 'lodash'
export default {
    data:()=>({
        get
    }),
    computed:{
        userInfo(){
            return this.$store.getters['auth/getUserInfo']
        }
    }
}
</script>

<style>

</style>