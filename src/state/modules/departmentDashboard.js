import {
    getDepartment
} from '../../api'

var store = {
    namespaced: true,
    state: {
        department: {}
    },
    getters: {
        getDepartment: state => state.department 
    },
    mutations: {
        SET_DEPARTMENT(state, payload){
            state.department = payload
        }
    },
    actions:{
        initStore(){
        },
        getDepartment(context){
            return new Promise((resolve, reject) => {
                getDepartment().then(res => {
                    if(res.response){
                        context.commit('SET_DEPARTMENT',res.data[0])
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