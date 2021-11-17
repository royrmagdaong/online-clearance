import axios from 'axios'

import {
    login,
    registerStudent,
    verifyStudent
} from '../../api'

var store = {
    namespaced: true,
    state: {
        userInfo: null
    },
    getters: {
        getUserInfo: state => state.userInfo
    },
    mutations: {
        SET_USER_INFO(state, payload){
            state.userInfo = payload
        }
    },
    actions:{
        initStore(context){
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            context.commit('SET_USER_INFO', userInfo)
        },
        signIn(context, payload){
            return new Promise((resolve, reject) => {
                login(payload).then(res => {
                    if(res.response){
                        // set token
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

                        localStorage.setItem('userInfo', JSON.stringify(res.data))
                        context.commit('SET_USER_INFO', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        registerStudent(context, payload){
            return new Promise((resolve, reject) => {
                registerStudent(payload).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        verifyStudent(context, payload){
            return new Promise((resolve, reject) => {
                verifyStudent(payload).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        logout(context){
            localStorage.removeItem('userInfo')
            context.commit('SET_USER_INFO', null)

            // unset token
            axios.defaults.headers.common['Authorization'] = ``;
        }
    }
}

export default store