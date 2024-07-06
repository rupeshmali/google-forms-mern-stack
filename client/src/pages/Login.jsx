import React from 'react'
import Name from '../components/common/form/Name'
import Email from '../components/common/form/Email'
import { useLocation } from 'react-router-dom'
import { PATHS } from '../utils/constants'
import Password from '../components/common/form/Password'

const Login = () => {
  const location = useLocation();
  return (
    <div className='bg-slate-100 min-h-screen min-w-screen flex items-center justify-center'>
      {
        (location.pathname === PATHS.SIGNIN.INDEX) && <Email role='signin' />
      }
      {
        (location.pathname === PATHS.SIGNIN.PASSWORD) && <Password role='signin' />
      }
    </div>
  )
}

export default Login