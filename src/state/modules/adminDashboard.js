import {
    fetchDepartmentsCount,
    fetchStudentsCount,
    fetchUsersCount
} from '../../api'

var store = {
    namespaced: true,
    state: {
        department_count: 0,
        student_count: 0,
        user_count: 0
    },
    getters: {
        getDepartmentsCount: state => state.department_count,
        getStudentsCount: state => state.student_count,
        getUsersCount: state => state.user_count
    },
    mutations: {
        SET_DEPARTMENTS(state, payload){
            state.department_count = payload
        },
        SET_STUDENTS(state, payload){
            state.student_count = payload
        },
        SET_USERS(state, payload){
            state.user_count = payload
        }
    },
    actions:{
        initStore(context){
            context.dispatch('getDepartmentsCount')
            context.dispatch('getStudentsCount')
            context.dispatch('getUsersCount')
        },
        getDepartmentsCount(context){
            return new Promise((resolve, reject) => {
                fetchDepartmentsCount().then(res => {
                    if(res.response){
                        context.commit('SET_DEPARTMENTS', res.count)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getStudentsCount(context){
            return new Promise((resolve, reject) => {
                fetchStudentsCount().then(res => {
                    if(res.response){
                        context.commit('SET_STUDENTS', res.count)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getUsersCount(context){
            return new Promise((resolve, reject) => {
                fetchUsersCount().then(res => {
                    if(res.response){
                        context.commit('SET_USERS', res.count)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        }
    }
}

export default store