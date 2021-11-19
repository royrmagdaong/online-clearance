import {
    getApprovedStudents
} from '../../api'

var store = {
    namespaced: true,
    state: {
        approvedStudents: []
    },
    getters: {
        getApprovedStudents: state => state.approvedStudents
    },
    mutations: {
        SET_APPROVED_STUDENTS(state, payload){
            state.approvedStudents = payload
        }
    },
    actions:{
        initStore(){
        },
        getApprovedStudents(context, payload){
            return new Promise((resolve, reject) => {
                getApprovedStudents(payload).then(res => {
                    if(res.response){
                        context.commit('SET_APPROVED_STUDENTS', res.data)
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