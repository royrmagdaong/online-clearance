import {
    addCourse,
    updateCourse
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
        addCourse(context, payload){
            return new Promise((resolve, reject) => {
                addCourse(payload).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        updateCourse(context, payload){
            return new Promise((resolve, reject) => {
                updateCourse(payload).then(res => {
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