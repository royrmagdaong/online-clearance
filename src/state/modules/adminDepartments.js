import {
    fetchDepartments,
    createDepartment
} from '../../api'

var store = {
    namespaced: true,
    state: {
        departments: []
    },
    getters: {
        getDepartments: state => state.departments
    },
    mutations: {
        SET_DEPARTMENTS(state, payload){
            state.departments = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getDepartments(context, payload){
            return new Promise((resolve, reject) => {
                fetchDepartments(payload).then(res => {
                    if(res.response){
                        context.commit('SET_DEPARTMENTS', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        createDepartment(context, payload){
            return new Promise((resolve, reject) => {
                createDepartment(payload).then(res => {
                    if(res.response){
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