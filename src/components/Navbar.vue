<template>
    <div class="main-nav bg-success">
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 12px;
    padding-bottom: 12px;
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
</style>