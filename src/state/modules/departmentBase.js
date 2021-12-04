import {
    changeProfilePictureDept
} from '../../api'

var store = {
    namespaced: true,
    state: {
        department: {}
    },
    getters: {
        getDepartment: state => state.department 
    },
    mutations: {
        SET_DEPARTMENT(state, payload){
            state.department = payload
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
        }
    }
}

export default store