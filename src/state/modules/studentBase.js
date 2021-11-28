import {
    getCompletedClearance
} from '../../api'

var store = {
    namespaced: true,
    state: {
        clearance: []
    },
    getters: {
        getClearance: state => state.clearance
    },
    mutations: {
        SET_CLEARANCE(state, payload){
            state.clearance = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getCompletedClearance(context, payload){
            return new Promise((resolve, reject) => {
                getCompletedClearance(payload).then(res => {
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