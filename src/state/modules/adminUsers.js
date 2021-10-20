import {
    fetchUsers
} from '../../api'

var store = {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers: state => state.users
    },
    mutations: {
        SET_USERS(state, payload){
            state.users = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getUsers(context, payload){
            return new Promise((resolve, reject) => {
                fetchUsers(payload).then(res => {
                    if(res.response){
                        context.commit('SET_USERS', res.data)
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