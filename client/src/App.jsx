import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Navbar from './components/common/Navbar'
import { PATHS } from './utils/constants'
import Login from './pages/Login'
import { AuthProvider } from './contexts/auth'
import Dashboard from './pages/Dashboard'
import Layout from './components/protected/Layout'
import EditForm from './pages/EditForm'
import UserSubmissionForm from './pages/UserSubmissionForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            {/* LANDING PAGE */}
            <Route path={PATHS.LANDING} element={<Landing />} />
            {/* AUTH PAGES */}
            <Route path={PATHS.SIGNUP} element={<Signup />} />
            {/* <Route path={PATHS.SIGNUP.EMAIL} element={<Signup />} />
            <Route path={PATHS.SIGNUP.PASSWORD} element={<Signup />} /> */}
            <Route path={PATHS.SIGNIN} element={<Login />} />
            {/* <Route path={PATHS.SIGNIN.PASSWORD} element={<Login />} /> */}
            {/* CREATE and DISPLAY FORMS */}
            <Route path={PATHS.DASHBOARD} element={<Layout />} >
              <Route index element={<Dashboard />} />
              <Route path={PATHS.FORM} element={<EditForm />} />
            </Route>
            {/* FORM SUBMIT */}
            <Route path={PATHS.USER_FORM_SUBMIT} element={<UserSubmissionForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
