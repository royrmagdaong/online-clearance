import {
    getCourses
} from '../../api'

var store = {
    namespaced: true,
    state: {
        courses: []
    },
    getters: {
        getCourses: state => state.courses
    },
    mutations: {
        SET_COURSES(state, payload){
            state.courses = payload
        }
    },
    actions:{
        initStore(context){
            context.dispatch('getCourses')
        },
        getCourses(context){
            return new Promise((resolve, reject) => {
                getCourses().then(res => {
                    if(res.response){
                        context.commit('SET_COURSES', res.data)
                        console.log(res.data)
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