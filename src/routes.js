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
import HeadDepartmentProfile from './views/headdepartment/profile/Profile'

// Student
import StudentBase from './views/student/Base'
import StudentProfile from './views/student/profile/Profile'



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
      component: Home
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
                    path: "grades", 
                    component: AdminBase
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
            redirect: 'profile'
          },
          {
            path: 'profile',
            component: HeadDepartmentProfile
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