const serverName = 'http://localhost:5000/'
const user = 'user/'
const student = 'student/'
const department = 'head-department/'
const clearance = 'clearance/'
const course = 'course/'
const requirements = 'requirements/'

export default {
    // general user
    serverName: serverName,
    signIn: user + 'signin',
    fetchUsers: user,
    getCourses: course,
    viewRequirementsUrl: serverName + requirements + 'view',
    getAvailableAcademicYear: clearance + 'acad-year',

    // student
    fetchStudents: student,
    registerStudent: student + 'create',
    verifyStudent: student + 'verify',
    getStudentInfo: student + 'student-info',
    updateStudentInfo: student + 'update',
    requestClearanceForm: clearance + 'create',
    getClearanceForms: clearance + 'student-clearance',
    requestSignature: clearance + 'request-signature',
    getDepartmentsByCourse: department + 'departments-bycourse',
    getCompletedClearance: clearance + 'completed-clearance',

    // admin
    fetchDepartments: department,
    fetchUsersCount: user + 'total-users',
    fetchStudentsCount: student + 'total-students',
    fetchDepartmentsCount: department + 'total-departments',
    createDepartment: department + 'create',
    getClearanceFormRequests: clearance + 'clearance-form-request',
    approveClearanceRequest: clearance + 'approve-clearance',

    // head department
    getDepartment: department + 'department',
    getStudentRequests: clearance + 'students-signature-request',
    approveSignatureRequest: clearance + 'approve-signature-request',
    getApprovedStudents: clearance + 'approved-students',
    uploadSignature: department + 'upload-signature',
    uploadRequirements: requirements + 'upload-requirements',
    getRequirements: requirements,
    updateRequirements: requirements + 'update-requirements',
    getStudentRequirements: clearance + 'student-requirements'
}