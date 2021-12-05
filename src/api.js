import endpoints from './endpoints'
import axios from 'axios'

// FOR USER API CALLS

export function viewClearance(payload){
    return new Promise((resolve, reject) => {
        axios.get(`${endpoints.viewClearance}/${payload.clearance_id}`)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

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

export function getCourses(){
    return new Promise((resolve, reject) => {
        axios.get(endpoints.getCourses)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getAvailableAcademicYear(){
    return new Promise((resolve, reject) => {
        axios.get(endpoints.getAvailableAcademicYear)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getSchoolYear(){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getSchoolYear)
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
            year_level: payload.year_level,
            section: payload.section
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function changeProfilePicture(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.changeProfilePicture, payload.formData)
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
            year_level: payload.year_level,
            section: payload.section
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
        axios.post(endpoints.requestSignature,
            payload.formData
        )
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function updateRequestSignature(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.updateRequestSignature,
            payload.formData
        )
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getDepartmentsByCourse(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getDepartmentsByCourse,{
            course: payload.course
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getCompletedClearance(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getCompletedClearance,{
            student: payload.student
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function changeProfilePictureDept(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.changeProfilePictureDept, payload.formData)
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

export function addCourse(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.addCourse,{
            code: payload.code,
            description: payload.description,
            sections: payload.sections,
            number_of_years: payload.number_of_years
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function updateCourse(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.updateCourse,{
            course_id: payload.course_id,
            code: payload.code,
            description: payload.description,
            sections: payload.sections,
            number_of_years: payload.number_of_years
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function updateSchoolYear(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.updateSchoolYear,{
            semester: payload.semester,
            academic_year: payload.academic_year
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}



// For Department APIs

export function getDepartment(){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getDepartment,{})
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

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

export function disapproveSignatureRequest(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.disapproveSignatureRequest,{
            clearance_id: payload.clearance_id,
            disapproved_message: payload.disapproved_message,
            requirements_id: payload.requirements_id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getApprovedStudents(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getApprovedStudents,{
            searchString: payload.searchString,
            course: payload.course,
            year_level: payload.year_level,
            section: payload.section,
            semester: payload.semester,
            academic_year: payload.academic_year
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getRequirements(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getRequirements,{
            department_id: payload.department_id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function uploadSignature(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.uploadSignature,payload.formData)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function uploadRequirements(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.uploadRequirements,payload.formData)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function updateRequirements(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.updateRequirements,payload.formData)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getStudentRequirements(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getStudentRequirements,{
            department_id: payload.department_id,
            clearance_id: payload.clearance_id
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getCurrentClearanceData(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getCurrentClearanceData,{
            academic_year: payload.academic_year,
            semester: payload.semester
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getClearanceData(){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getClearanceData)
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}

export function getApprovedStudentsByDeptForPrint(payload){
    return new Promise((resolve, reject) => {
        axios.post(endpoints.getApprovedStudentsByDeptForPrint,{
            semester: payload.semester,
            academic_year: payload.academic_year
        })
        .then(res => { resolve(res.data)})
        .catch(err => { reject(err)} )
    })
}