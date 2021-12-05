import {
    updateSchoolYear
} from '../../api'

var store = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        updateSchoolYear(context, payload){
            return new Promise((resolve, reject) => {
                updateSchoolYear(payload).then(res => {
                    if(res.response){
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