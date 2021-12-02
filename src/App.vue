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
/* GLOBAL CSS */

.page-item.active .page-link{
  background-color: #28a74544 !important;
}
body{
  background: #11998e45;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #38ef7e16, #11998e16);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #38ef7e16, #11998e16); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
