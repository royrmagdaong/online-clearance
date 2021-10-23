import {
    getClearanceFormRequests
} from '../../api'

var store = {
    namespaced: true,
    state: {
        clearanceFormRequests: [],
    },
    getters: {
        getClearanceFormRequests: state => state.clearanceFormRequests
    },
    mutations: {
        SET_CLEARANCE_FORM_REQUESTS(state, payload){
            state.clearanceFormRequests = payload
        },
    },
    actions:{
        initStore(){
        },
        getClearanceFormRequests(context){
            return new Promise((resolve, reject) => {
                getClearanceFormRequests().then(res => {
                    if(res.response){
                        context.commit('SET_CLEARANCE_FORM_REQUESTS', res.data)
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