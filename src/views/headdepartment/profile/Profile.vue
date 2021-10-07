<template>
  <div>
      <h2 class="text-center">Head Department Profile</h2>
      <p class="text-info text-center">
          Welcome
          <span class="text-uppercase">{{ get(userInfo, 'name') }}</span>
      </p>
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