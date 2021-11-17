import {
    getStudentRequests,
    approveSignatureRequest,
    getStudentRequirements
} from '../../api'

var store = {
    namespaced: true,
    state: {
        studentRequests: [],
        studentRequirements: null
    },
    getters: {
        getStudentRequests: state => state.studentRequests,
        getStudentRequirements: state => state.studentRequirements
    },
    mutations: {
        SET_STUDENT_REQUESTS(state, payload){
            state.studentRequests = payload
        },
        SET_STUDENT_REQUIREMENTS(state, payload){
            state.studentRequirements = payload
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
        },
        getStudentRequirements(context, payload){
            return new Promise((resolve, reject) => {
                getStudentRequirements(payload).then(res => {
                    if(res.response){
                        context.commit('SET_STUDENT_REQUIREMENTS', res.data)
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