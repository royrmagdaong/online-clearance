<template>
  <div>
      <!-- Side navigation -->
      <div class="sidenav">
        <div class="mb-5"></div>
        <div @click="routeTo('/admin/dashboard')" :class="{'active-tab': $route.path === '/admin/dashboard'}">Dashboard</div>
        <div @click="routeTo('/admin/head-departments')" :class="{'active-tab': $route.path === '/admin/head-departments'}">Head Departments</div>
        <div @click="routeTo('/admin/students')" :class="{'active-tab': $route.path === '/admin/students'}">Students</div>
        <div @click="routeTo('/admin/users')" :class="{'active-tab': $route.path === '/admin/users'}">Users</div>
        <div @click="logout('/')">Logout</div>
      </div>

      <!-- Page content -->
      <div class="main">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data:()=>({
  }),
  mounted(){
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
  font-size: 18px;
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

/* Style page content */
.main {
  margin-left: 16vw; /* Same as the width of the sidebar */
  padding: 44px;
}
</style>