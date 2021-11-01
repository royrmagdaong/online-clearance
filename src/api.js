import endpoints from './endpoints'
import axios from 'axios'

// FOR USER API CALLS

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


// FOR STUDENT API CALLS

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

export function requestClearanceForm(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.requestClearanceForm, {
            student: payload.student,
            academic_year: payload.academic_year,
            semester: payload.semester,
            course: payload.course,
            section: payload.section,
            year_level: payload.year_level
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getClearanceForms(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getClearanceForms, {
            student: payload.student
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function requestSignature(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.requestSignature, {
            clearance_id: payload.clearance_id,
            department_id: payload.department_id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

// FOR ADMIN API CALLS

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

export function getClearanceFormRequests(){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getClearanceFormRequests,{})
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function approveClearanceRequest(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.approveClearanceRequest,{
            id: payload.clearance_id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

// For Department APIs

export function getStudentRequests(){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getStudentRequests,{})
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function approveSignatureRequest(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.approveSignatureRequest,{
            clearance_id: payload.clearance_id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}