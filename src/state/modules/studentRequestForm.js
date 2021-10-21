import {
    fetchDepartments
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
        },
        getDepartments(context, payload){
            return new Promise((resolve, reject) => {
                fetchDepartments(payload).then(res => {
                    if(res.response){
                        context.commit('SET_DEPARTMENTS', res.data)
                        console.log(res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
    }
}

export default store