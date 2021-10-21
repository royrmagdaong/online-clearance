import {
    getStudentInfo,
    updateStudentInfo
} from '../../api'

var store = {
    namespaced: true,
    state: {
        studentInfo: {}
    },
    getters: {
        getStudentInfo: state => state.studentInfo
    },
    mutations: {
        SET_STUDENT_INFO(state, payload){
            state.studentInfo = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getStudentInfo(context, payload){
            return new Promise((resolve, reject) => {
                getStudentInfo(payload).then(res => {
                    if(res.response){
                        context.commit('SET_STUDENT_INFO', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        updateStudentInfo(context, payload){
            return new Promise((resolve, reject) => {
                updateStudentInfo(payload).then(res => {
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