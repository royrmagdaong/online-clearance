import {
    uploadRequirements,
    getRequirements,
    updateRequirements
} from '../../api'

var store = {
    namespaced: true,
    state: {
        requirements: []
    },
    getters: {
        getRequirements: state => state.requirements
    },
    mutations: {
        SET_REQUIREMENTS(state,payload){
            state.requirements = payload
        }
    },
    actions:{
        initStore(){
            // context.dispatch('getUsers')
        },
        getRequirements(context, payload){
            return new Promise((resolve, reject) => {
                getRequirements(payload).then(res => {
                    if(res.response){
                        context.commit('SET_REQUIREMENTS',res.data)
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        uploadRequirements(context, formData){
            return new Promise((resolve, reject) => {
                uploadRequirements(formData).then(res => {
                    if(res.response){
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        updateRequirements(context, formData){
            return new Promise((resolve, reject) => {
                updateRequirements(formData).then(res => {
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