import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Navbar from './components/common/Navbar'
import { PATHS } from './utils/constants'
import Login from './pages/Login'
import { AuthContext, AuthProvider } from './contexts/auth'
import Dashboard from './pages/Dashboard'
import Layout from './components/protected/Layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path={PATHS.LANDING} element={<Landing />} />
            <Route path={PATHS.SIGNUP.INDEX} element={<Signup />} />
            <Route path={PATHS.SIGNUP.EMAIL} element={<Signup />} />
            <Route path={PATHS.SIGNUP.PASSWORD} element={<Signup />} />
            <Route path={PATHS.SIGNIN.INDEX} element={<Login />} />
            <Route path={PATHS.SIGNIN.PASSWORD} element={<Login />} />

            <Route path={PATHS.DASHBOARD} element={<Layout />} >
              <Route index element={<Dashboard />} />
            </Route>
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
