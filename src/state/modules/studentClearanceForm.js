import {
    getDepartmentsByCourse,
    requestClearanceForm,
    getClearanceForms,
    requestSignature
} from '../../api'

var store = {
    namespaced: true,
    state: {
        departments: [],
        clearanceForms: []
    },
    getters: {
        getDepartments: state => state.departments,
        getClearanceForms: state => state.clearanceForms
    },
    mutations: {
        SET_DEPARTMENTS(state, payload){
            state.departments = payload
        },
        SET_CLEARANCE_FORMS(state, payload){
            state.clearanceForms = payload
        }
    },
    actions:{
        initStore(){
        },
        getDepartments(context, payload){
            return new Promise((resolve, reject) => {
                getDepartmentsByCourse(payload).then(res => {
                    if(res.response){
                        context.commit('SET_DEPARTMENTS', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        requestClearanceForm(context, payload){
            return new Promise((resolve, reject) => {
                requestClearanceForm(payload).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getClearanceForms(context, payload){
            return new Promise((resolve, reject) => {
                getClearanceForms(payload).then(res => {
                    if(res.response){
                        context.commit('SET_CLEARANCE_FORMS', res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        requestSignature(context, payload){
            return new Promise((resolve, reject) => {
                requestSignature(payload).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
    }
}

export default store