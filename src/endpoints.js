const serverName = 'http://localhost:5000/'
const user = 'user/'
const student = 'student/'
const department = 'head-department/'
const clearance = 'clearance/'
const course = 'course/'
const requirements = 'requirements/'
const schoolYear = 'school-year/'

export default {
    // general user
    serverName: serverName,
    signIn: user + 'signin',
    fetchUsers: user,
    getCourses: course,
    viewRequirementsUrl: serverName + requirements + 'view',
    getAvailableAcademicYear: clearance + 'acad-year',
    viewClearance: clearance + 'viewer',
    getSchoolYear: schoolYear,

    // student
    fetchStudents: student,
    registerStudent: student + 'create',
    verifyStudent: student + 'verify',
    getStudentInfo: student + 'student-info',
    updateStudentInfo: student + 'update',
    requestClearanceForm: clearance + 'create',
    getClearanceForms: clearance + 'student-clearance',
    requestSignature: clearance + 'request-signature',
    updateRequestSignature: clearance + 'update-request-signature',
    getDepartmentsByCourse: department + 'departments-bycourse',
    getCompletedClearance: clearance + 'completed-clearance',
    changeProfilePicture: student + 'change-prof-pic',
    viewStudentProfilePic: serverName + student + 'view',

    // admin
    fetchDepartments: department,
    fetchUsersCount: user + 'total-users',
    fetchStudentsCount: student + 'total-students',
    fetchDepartmentsCount: department + 'total-departments',
    createDepartment: department + 'create',
    getClearanceFormRequests: clearance + 'clearance-form-request',
    approveClearanceRequest: clearance + 'approve-clearance',
    addCourse: course + 'create',
    updateCourse: course + 'update',
    updateSchoolYear: schoolYear + 'update',
    getStudentsByCourseCount: user + 'student-count-by-course',
    getClearanceCountByDept: clearance + 'clearance-status-count',

    // head department
    getDepartment: department + 'department',
    getStudentRequests: clearance + 'students-signature-request',
    approveSignatureRequest: clearance + 'approve-signature-request',
    disapproveSignatureRequest: clearance + 'disapprove-signature-request',
    getApprovedStudents: clearance + 'approved-students',
    uploadSignature: department + 'upload-signature',
    uploadRequirements: requirements + 'upload-requirements',
    getRequirements: requirements,
    updateRequirements: requirements + 'update-requirements',
    getStudentRequirements: clearance + 'student-requirements',
    changeProfilePictureDept: department + 'change-prof-pic',
    viewDeptProfilePic: serverName + department + 'view',
    getCurrentClearanceData: clearance + 'current-clearance-data',
    getClearanceData: clearance + 'clearance-data',
    getApprovedStudentsByDeptForPrint: clearance + 'approved-students-print'
}