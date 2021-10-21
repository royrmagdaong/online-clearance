import Vue from 'vue'
import Router from 'vue-router'

// 
import Home from './views/Home'
import NotFound from './views/NotFound'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'

// Admin
import AdminBase from './views/admin/Base'
import AdminDashboard from './views/admin/dashboard/Dashboard'
import AdminUsers from './views/admin/dashboard/Users'
import AdminStudents from './views/admin/dashboard/Students'
import AdminHeadDepartments from './views/admin/dashboard/HeadDepartments'

// Head department
import HeadDepartmentBase from './views/headdepartment/Base'
import HeadDepartmentProfile from './views/headdepartment/profile/ProfileBase'
import HeadDepartmentApproved from './views/headdepartment/profile/Approved'
import HeadDepartmentDashboard from './views/headdepartment/profile/Dashboard'
import HeadDepartmentRequirements from './views/headdepartment/profile/Requirements'
import HeadDepartmentStudentRequest from './views/headdepartment/profile/StudentRequest'

// Student
import StudentBase from './views/student/Base'
import StudentProfile from './views/student/profile/ProfileBase'
import StudentRequestForm from './views/student/profile/RequestForm'
import StudentInfo from './views/student/profile/StudentInfo'
import StudentVerification from './views/StudentVerification'



Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'page-not-found',
      component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: "/login",
    },
    {
      path: '/register',
      name: 'register',
      component: SignUp,
      meta:{
        noLoggedInUser: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn,
      meta:{
        noLoggedInUser: true
      }
    },
    {
      path: '/verify/:id',
      name: 'verification',
      component: StudentVerification,
      meta:{
        noLoggedInUser: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminBase,
      redirect: "admin/dashboard",
      meta:{
        requiresAuth: true,
        isAdminOnly: true
      },
      children: [
        {
          path: '/',
          redirect: "dashboard"
        },
        { 
          path: "dashboard",
          component: AdminDashboard
        },
        { 
          path: "users",
          component: AdminUsers
        },
        { 
          path: "students",
          component: AdminStudents
        },
        { 
          path: "head-departments",
          component: AdminHeadDepartments
        },
        { path: "*", component: NotFound } // should be last
      ]
    },
    {
      path: '/student',
      name: 'student',
      component: StudentBase,
      redirect: "student/profile",
      meta:{
        requiresAuth: true,
        isStudentOnly: true
      },
      children: [
        { 
            path: "profile", 
            component: StudentProfile,
            children:[
                { 
                  path: "/", 
                  redirect: "student-info"
                },
                { 
                  path: "student-info", 
                  component: StudentInfo
                },
                { 
                  path: "request-form", 
                  component: StudentRequestForm
                }
            ]
        },
        { path: "*", component: NotFound }
      ]
    },
    {
        path: '/head-department',
        name: 'head-department',
        component: HeadDepartmentBase,
        redirect: "head-department/profile",
        meta:{
          requiresAuth: true,
          isHeadDepartmentOnly: true
        },
        children: [
          {
            path: '/',
            redirect: 'dashboard'
          },
          {
            path: 'profile',
            component: HeadDepartmentProfile,
            redirect: 'dashboard'
          },
          {
            path: 'dashboard',
            component: HeadDepartmentDashboard
          },
          {
            path: 'approved',
            component: HeadDepartmentApproved
          },
          {
            path: 'requirements',
            component: HeadDepartmentRequirements
          },
          {
            path: 'student-request',
            component: HeadDepartmentStudentRequest
          },
          { path: "*", component: NotFound } // should be last
        ]
      }
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  let userRole = null
  if(userInfo){
    userRole = userInfo.role
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!userInfo){
      next('/login')
    }else if( to.matched.some(record => record.meta.isAdminOnly) && (userRole === 'student' || userRole === 'head-department') ){
      if(userRole === 'student'){
        next('/student')
      }else{
        next('/head-department')
      }
    }else if( to.matched.some(record => record.meta.isHeadDepartmentOnly) && (userRole === 'student' || userRole === 'admin') ){
      if(userRole === 'student'){
        next('/student')
      }else{
        next('/admin')
      }
    }else if( to.matched.some(record => record.meta.isStudentOnly) && (userRole === 'head-department' || userRole === 'admin') ){
      if(userRole === 'admin'){
        next('/admin')
      }else{
        next('/head-department')
      }
    }else{
      next()
    }
  } else if(to.matched.some(record => record.meta.noLoggedInUser)){
    if(userRole){
      if(userRole === 'applicant'){
        next('/applicant')
      }else if(userRole === 'company-admin' || userRole === 'company-user'){
        next('/company')
      }else{
        next('/admin')
      }
    }else{
      next()
    }
  }else{
    next()
  }

});

export default router;