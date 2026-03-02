import React, { lazy, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
const Home = React.lazy(()=> import('./pages/Home'))
import Signup from './pages/Signup'
import Login from './pages/Login'
import NavBar from './components/common/NavBar'
import ForgetPassword from './pages/ForgetPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import MyProfile from './components/core/dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Setting from './components/core/dashboard/settings'
import EnrolledCourse from './components/core/dashboard/EnrolledCourse'
import Cart from './components/core/dashboard/Cart'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import CourseView from './components/core/dashboard/course/CourseView'
import AddCourse from './components/core/dashboard/addCourses'
import EditCourse from './components/core/dashboard/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from './components/core/Catalog/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/viewCourse/VideoDetails'
import Instructor from './components/core/dashboard/InstructureDashboard/Instructor'
import CreateCategory from './components/core/dashboard/AdminPanal/CreateCategory'
import ScrollToTop from './components/common/ScrollToTop'

function App() {

  const { user } = useSelector((state) => state.profile)

  return (
    <div className='w-[100%] min-h-screen bg-black flex flex-col font-inter'>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog/:catalogName' element={<Catalog />} />
        <Route path='/course/:courseName/:courseId' element={<CourseDetails />} />
        {/* User  */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* Profile Route*/}
        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Setting />} />
          {
            user !== null && user.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourse />} />
                <Route path='/dashboard/cart' element={<Cart />} />
              </>
            )
          }
          {
            user !== null && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/my-courses' element={<CourseView />} />
                <Route path='/dashboard/add-course' element={<AddCourse />} />
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
                <Route path='/dashboard/instructor' element={<Instructor/>}/>
              </>
            )
          }
          { 
            user !== null && user.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path='/dashboard/create-categories' element={<CreateCategory/>} />
              </>
            ) 
          }
        </Route>

        <Route
          element={<PrivateRoute>
            <ViewCourse />
          </PrivateRoute>}
        >
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/view-course/:courseId/section/:sectionId/subSection/:subSectionId'
                element={<VideoDetails/>} />
              </>
            )
          }
        </Route>


        {/*Password Routes  */}
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/update-password/:id' element={<UpdatePassword />} />

        {/* Others Pages */}
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
