import {
    getDepartment,
    getCurrentClearanceData,
    getClearanceData
} from '../../api'

var store = {
    namespaced: true,
    state: {
        department: {},
        currentClearanceData: [],
        clearanceData: []
    },
    getters: {
        getDepartment: state => state.department,
        getCurrentClearanceData: state => state.currentClearanceData,
        getClearanceData: state => state.clearanceData,
    },
    mutations: {
        SET_DEPARTMENT(state, payload){
            state.department = payload
        },
        SET_CURRENT_DATA(state, payload){
            state.currentClearanceData = payload
        },
        SET_CLEARANCE_DATA(state, payload){
            state.clearanceData = payload
        }
    },
    actions:{
        initStore(){
        },
        getDepartment(context){
            return new Promise((resolve, reject) => {
                getDepartment().then(res => {
                    if(res.response){
                        context.commit('SET_DEPARTMENT',res.data[0])
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getCurrentClearanceData(context,payload){
            return new Promise((resolve, reject) => {
                getCurrentClearanceData(payload).then(res => {
                    if(res.response){
                        context.commit('SET_CURRENT_DATA',res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getClearanceData(context){
            return new Promise((resolve, reject) => {
                getClearanceData().then(res => {
                    if(res.response){
                        context.commit('SET_CLEARANCE_DATA',res.data)
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