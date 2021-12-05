import {
    changeProfilePictureDept,
    getSchoolYear,
    getApprovedStudentsByDeptForPrint
} from '../../api'

var store = {
    namespaced: true,
    state: {
        department: {},
        schoolYear: null,
        approvedStudentsForPrint: []
    },
    getters: {
        getDepartment: state => state.department,
        getSchoolYear: state => state.schoolYear,
        getApprovedStudents: state => state.approvedStudentsForPrint
    },
    mutations: {
        SET_DEPARTMENT(state, payload){
            state.department = payload
        },
        SET_SCHOOL_YEAR(state, payload){
            state.schoolYear = payload
        },
        SET_APPROVED_STUDENTS_FOR_PRINT(state, payload){
            state.approvedStudentsForPrint = payload
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
                        resolve(res)
                    }else{
                        resolve(res)
                    }
                }).catch(err => { reject(err) })
            })
        },
        getApprovedStudentsByDeptForPrint(context, payload){
            return new Promise((resolve, reject) => {
                getApprovedStudentsByDeptForPrint(payload).then(res => {
                    if(res.response){
                        context.commit('SET_APPROVED_STUDENTS_FOR_PRINT',res.data)
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