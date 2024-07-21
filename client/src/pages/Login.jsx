import React, { useState } from 'react'
import Name from '../components/common/form/Name'
import Email from '../components/common/form/Email'
import { useLocation } from 'react-router-dom'
import { PATHS } from '../utils/constants'
import Password from '../components/common/form/Password'

const Login = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('email');
  const [form, setForm] = useState({
      email: '',
      password: ''
  })
  return (
    <div className='bg-slate-100 min-h-screen min-w-screen flex items-center justify-center'>
      {
        currentStep === 'email' &&
         <Email role='signin' form={form} setForm={setForm} setCurrentStep={setCurrentStep}/>
      }
      {
        currentStep === 'password' &&
        <Password role='signin' form={form} setForm={setForm} setCurrentStep={setCurrentStep}/>
      }
    </div>
  )
}

export default Login