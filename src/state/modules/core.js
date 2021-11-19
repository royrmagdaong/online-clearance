import {
    getCourses,
    getAvailableAcademicYear
} from '../../api'

var store = {
    namespaced: true,
    state: {
        courses: [],
        academic_year: []
    },
    getters: {
        getCourses: state => state.courses,
        getAcadYear: state => state.academic_year
    },
    mutations: {
        SET_COURSES(state, payload){
            state.courses = payload
        },
        SET_ACAD_YEAR(state, payload){
            state.academic_year = payload
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
        }
    }
}

export default store