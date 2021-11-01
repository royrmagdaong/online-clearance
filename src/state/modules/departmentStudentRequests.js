import {
    getStudentRequests,
    approveSignatureRequest
} from '../../api'

var store = {
    namespaced: true,
    state: {
        studentRequests: []
    },
    getters: {
        getStudentRequests: state => state.studentRequests
    },
    mutations: {
        SET_STUDENT_REQUESTS(state, payload){
            state.studentRequests = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getStudentRequests(context){
            return new Promise((resolve, reject) => {
                getStudentRequests().then(res => {
                    if(res.response){
                        context.commit('SET_STUDENT_REQUESTS', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        approveSignatureRequest(context, payload){
            return new Promise((resolve, reject) => {
                approveSignatureRequest(payload).then(res => {
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