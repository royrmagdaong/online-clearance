const user = 'user/'
const student = 'student/'
const department = 'head-department/'

export default {
    signIn: user + 'signin',
    fetchUsers: user,
    fetchStudents: student,
    fetchDepartments: department,
    fetchUsersCount: user + 'total-users',
    fetchStudentsCount: student + 'total-students',
    fetchDepartmentsCount: department + 'total-departments',
    createDepartment: department + 'create'
}