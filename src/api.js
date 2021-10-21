import endpoints from './endpoints'
import axios from 'axios'

export function login(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.signIn, {
            email: payload.email,
            password: payload.password
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function fetchUsers(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.fetchUsers, {
            searchString: payload.searchString,
            admin: payload.admin,
            department: payload.department,
            student: payload.student
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function fetchUsersCount(){
    return new Promise((resolve, reject) => {
        axios.get(endpoints.fetchUsersCount)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function fetchStudents(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.fetchStudents, {
            searchString: payload.searchString,
            course: payload.course,
            yearLevel: payload.yearLevel
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function fetchStudentsCount(){
    return new Promise((resolve, reject) => {
        axios.get(endpoints.fetchStudentsCount)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getStudentInfo(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getStudentInfo, {
            id: payload.id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function updateStudentInfo(payload){
    return new Promise((resolve, reject) => {
        axios.patch(endpoints.updateStudentInfo+`/${payload.id}`, {
            first_name: payload.first_name,
            last_name: payload.last_name,
            course: payload.course,
            year_level: payload.year_level
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function registerStudent(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.registerStudent, {
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            password: payload.password,
            course: payload.course,
            year_level: payload.year_level
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function verifyStudent(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.verifyStudent, {
            id: payload.id,
            code: payload.code,
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function fetchDepartments(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.fetchDepartments,{
            searchString: payload.searchString
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function fetchDepartmentsCount(){
    return new Promise((resolve, reject) => {
        axios.get(endpoints.fetchDepartmentsCount)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function createDepartment(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.createDepartment,{
            email: payload.email,
            password: payload.password,
            in_charge: payload.in_charge,
            department_name: payload.department_name,
            mobile_number: payload.mobile_number,
            telephone_number: payload.telephone_number
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}