<template>
<div>
    <!-- for MD and UP -->
    <div class="main-nav bg-success d-none d-md-flex">
        <div class="bname">
            PTC Online Clearance
        </div>
        <div class="links d-flex font-weight-bold text-uppercase text-white" v-if="!userInfo">
            <div class="mx-2" @click="routeTo('/login')">login</div>
            <div class="mx-2" @click="routeTo('/register')">sign up</div>
        </div>
        <div class="links d-flex font-weight-bold text-uppercase text-white" v-else>
            <div class="mx-2" @click="logout('/login')">logout</div>
        </div>
    </div>
    <!-- for SM and DOWN -->
    <b-navbar toggleable type="dark" variant="success" class="d-flex d-md-none sm-nav">
        <b-navbar-brand href="#">PTC Online Clearance</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto" v-if="!userInfo">
            <b-nav-item @click="routeTo('/login')">LOGIN</b-nav-item>
            <b-nav-item @click="routeTo('/register')">SIGN UP</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item @click="logout('/login')">LOGOUT</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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
.main-nav{
    justify-content: space-between;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    /*padding-top: 12px;
    padding-bottom: 12px; */
    height: 6vh;
    letter-spacing: 2px;
    position: fixed;
    width: 100%;
    z-index: 3;
}
.bname{
    font-size: 24px;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
.links{
    font-weight: 600;
    letter-spacing: 1px;
}
.links div:hover{
    color: rgb(63, 61, 61);
    cursor: pointer;
}

/* sm and down nav */
.sm-nav{
    position: fixed;
    width: 100%;
    z-index: 3;
}
</style>