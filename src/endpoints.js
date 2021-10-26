const user = 'user/'
const student = 'student/'
const department = 'head-department/'
const clearance = 'clearance/'

export default {
    // general user
    signIn: user + 'signin',
    fetchUsers: user,

    // student
    fetchStudents: student,
    registerStudent: student + 'create',
    verifyStudent: student + 'verify',
    getStudentInfo: student + 'student-info',
    updateStudentInfo: student + 'update',
    requestClearanceForm: clearance + 'create',
    getClearanceForms: clearance + 'student-clearance',
    requestSignature: clearance + 'request-signature',

    // admin
    fetchDepartments: department,
    fetchUsersCount: user + 'total-users',
    fetchStudentsCount: student + 'total-students',
    fetchDepartmentsCount: department + 'total-departments',
    createDepartment: department + 'create',
    getClearanceFormRequests: clearance + 'clearance-form-request',
    approveClearanceRequest: clearance + 'approve-clearance',

    // head department
    getStudentRequests: clearance + 'students-signature-request'
}