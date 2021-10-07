<template>
  <div id="app">
    <Navbar v-if="get(userInfo, 'role') !== 'admin'"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { get } from 'lodash'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data:()=>({
    get
  }),
  computed:{
    userInfo(){
      return this.$store.getters['auth/getUserInfo']
    }
  },
  methods:{
    
  }
}
</script>

<style>
</style>
