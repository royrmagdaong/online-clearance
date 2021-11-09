<template>
  <div>
      <!-- Side navigation -->
      <div class="sidenav d-none d-md-block">
        <div class="mb-5"></div>
        <div @click="routeTo('/admin/dashboard')" :class="{'active-tab': $route.path === '/admin/dashboard'}">Dashboard</div>
        <div @click="routeTo('/admin/users')" :class="{'active-tab': $route.path === '/admin/users'}">Users</div>
        <div @click="routeTo('/admin/students')" :class="{'active-tab': $route.path === '/admin/students'}">Students</div>
        <div @click="routeTo('/admin/head-departments')" :class="{'active-tab': $route.path === '/admin/head-departments'}">Head Departments</div>
        <div @click="routeTo('/admin/course-section')" :class="{'active-tab': $route.path === '/admin/course-section'}">Course/Section</div>
        <div @click="routeTo('/admin/clearance-form-request')" :class="{'active-tab': $route.path === '/admin/clearance-form-request'}">Clearance Form Requests</div>
        <div @click="logout('/')">Logout</div>
      </div>

      <!-- for SM and DOWN -->
      <b-navbar toggleable type="dark" class="d-flex d-md-none sm-nav" style="background: #292b29 !important;">
          <b-navbar-brand href="#">PTC Online Clearance</b-navbar-brand>

          <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
              <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
              <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
          </b-navbar-toggle>

          <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
              <b-nav-item @click="routeTo('/admin/dashboard')" :class="{'active-tab2': $route.path === '/admin/dashboard'}">Dashboard</b-nav-item>
              <b-nav-item @click="routeTo('/admin/users')" :class="{'active-tab2': $route.path === '/admin/users'}">Users</b-nav-item>
              <b-nav-item @click="routeTo('/admin/students')" :class="{'active-tab2': $route.path === '/admin/students'}">Students</b-nav-item>
              <b-nav-item @click="routeTo('/admin/head-departments')" :class="{'active-tab2': $route.path === '/admin/head-departments'}">Head Departments</b-nav-item>
              <b-nav-item @click="routeTo('/admin/course-section')" :class="{'active-tab2': $route.path === '/admin/course-section'}">Course/Section</b-nav-item>
              <b-nav-item @click="routeTo('/admin/clearance-form-request')" :class="{'active-tab2': $route.path === '/admin/clearance-form-request'}">Clearance Form Requests</b-nav-item>
              <b-nav-item @click="logout('/')">Logout</b-nav-item>
          </b-navbar-nav>
          </b-collapse>
      </b-navbar>

      <!-- Page content -->
      <div class="main d-none d-md-block">
        <router-view></router-view>
      </div>
      <div class="d-block d-md-none" style="padding-top: 56px;">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
// import { io } from 'socket.io-client'

export default {
  data:()=>({
  }),
  mounted(){
    // const socket = io("http://localhost:5000");
    // socket.on("admin", (arg) => {
    //   console.log(arg); 
    // });
  },
  methods:{
    routeTo(route){
      if(this.$route.path !== route){
        this.$router.push(route)
      }
    },
    logout(route){
      this.$store.dispatch('auth/logout')
      this.routeTo(route)
    }
  }
}
</script>

<style scoped>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 16vw; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #292b29; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

/* The navigation menu links */
.sidenav div {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 16px;
  color: #e2dede;
  display: block;
}

.sidenav div:hover{
  background: #e2dede;
  cursor: pointer;
  color: #292b29;
}

.active-tab{
  background: #e2dede;
  color: #292b29 !important;
}

.active-tab2 a{
    color: #FFFFFF !important;
}
.sm-nav{
    position: fixed;
    width: 100%;
    z-index: 13;
}

/* Style page content */
.main {
  margin-left: 16vw; /* Same as the width of the sidebar */
  padding: 44px;
}
</style>