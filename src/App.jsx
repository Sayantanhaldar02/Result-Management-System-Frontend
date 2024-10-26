import { useState } from 'react'
import LoginForm from './Page/Login/Login'
import RegistrationForm from './Page/Registration/Registration'
import { Route, Routes } from 'react-router-dom'
import Student_Dashboard from './Student_Dashboard/Student_Dashboard'
import Admin_Dashboard from './Admin_Dashboard/Admin_Dashboard'
import ProtectedRoute from './Protected_Routes/ProtectedRoute'
import { PageNotFound } from './Page/PageNotFound/PageNotFound'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/sign-up' element={<RegistrationForm />} />
        <Route path='/student-dashboard' element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Student_Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/admin-dashboard' element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin_Dashboard />
          </ProtectedRoute>
        } />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
