import {
    fetchStudents
} from '../../api'

var store = {
    namespaced: true,
    state: {
        students: []
    },
    getters: {
        getStudents: state => state.students
    },
    mutations: {
        SET_STUDENTS(state, payload){
            state.students = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getStudents(context, payload){
            return new Promise((resolve, reject) => {
                fetchStudents(payload).then(res => {
                    if(res.response){
                        context.commit('SET_STUDENTS', res.data)
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