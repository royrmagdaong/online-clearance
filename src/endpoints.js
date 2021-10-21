const user = 'user/'
const student = 'student/'
const department = 'head-department/'

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

    // admin
    fetchDepartments: department,
    fetchUsersCount: user + 'total-users',
    fetchStudentsCount: student + 'total-students',
    fetchDepartmentsCount: department + 'total-departments',
    createDepartment: department + 'create'
}