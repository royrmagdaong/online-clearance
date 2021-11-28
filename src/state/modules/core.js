import {
    getCourses,
    getAvailableAcademicYear,
    viewClearance
} from '../../api'

var store = {
    namespaced: true,
    state: {
        courses: [],
        academic_year: [],
        clearance: {}
    },
    getters: {
        getCourses: state => state.courses,
        getAcadYear: state => state.academic_year,
        getClearance: state => state.clearance
    },
    mutations: {
        SET_COURSES(state, payload){
            state.courses = payload
        },
        SET_ACAD_YEAR(state, payload){
            state.academic_year = payload
        },
        SET_CLEARANCE(state, payload){
            state.clearance = payload
        }
    },
    actions:{
        initStore(context){
            context.dispatch('getCourses')
            context.dispatch('getAvailableAcademicYear')
        },
        getCourses(context){
            return new Promise((resolve, reject) => {
                getCourses().then(res => {
                    if(res.response){
                        context.commit('SET_COURSES', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getAvailableAcademicYear(context){
            return new Promise((resolve, reject) => {
                getAvailableAcademicYear().then(res => {
                    if(res.response){
                        context.commit('SET_ACAD_YEAR', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        viewClearance(context, payload){
            return new Promise((resolve, reject) => {
                viewClearance(payload).then(res => {
                    if(res.response){
                        context.commit('SET_CLEARANCE', res)
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