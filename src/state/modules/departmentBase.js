import {
    changeProfilePictureDept,
    getSchoolYear
} from '../../api'

var store = {
    namespaced: true,
    state: {
        department: {},
        schoolYear: null
    },
    getters: {
        getDepartment: state => state.department,
        getSchoolYear: state => state.schoolYear
    },
    mutations: {
        SET_DEPARTMENT(state, payload){
            state.department = payload
        },
        SET_SCHOOL_YEAR(state, payload){
            state.schoolYear = payload
        }
    },
    actions:{
        initStore(){
        },
        changeProfilePictureDept(context, payload){
            return new Promise((resolve, reject) => {
                changeProfilePictureDept(payload).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getSchoolYear(context){
            return new Promise((resolve, reject) => {
                getSchoolYear().then(res => {
                    if(res.response){
                        context.commit('SET_SCHOOL_YEAR',res.data)
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