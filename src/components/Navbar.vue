<template>
    <div class="main-nav">
        <div class="bname" @click="routeTo('/')">
            PTC
        </div>
        <div class="links d-flex font-weight-bold text-uppercase" v-if="!userInfo">
            <div class="mx-2" @click="routeTo('/login')">login</div>
            <div class="mx-2" @click="routeTo('/register')">sign up</div>
        </div>
        <div class="links d-flex font-weight-bold text-uppercase" v-else>
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
    background: #2FD835 !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 6px;
    padding-bottom: 6px;
    letter-spacing: 2px;
}
.bname{
    font-size: 32px;
    font-weight: 600;
    color: rgb(41, 39, 39);
}
.links{
    font-weight: 600;
    letter-spacing: 1px;
}
.links div:hover, .bname:hover{
    color: rgb(235, 230, 230);
    cursor: pointer;
}
</style>