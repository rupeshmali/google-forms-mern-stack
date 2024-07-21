import React, { useState } from 'react'
import Email from '../components/common/form/Email'
import Name from '../components/common/form/Name'
import { useLocation } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import Password from '../components/common/form/Password';

const Signup = () => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState('name');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    return (
        <div className='bg-slate-100 min-h-screen min-w-screen flex items-center justify-center'>
            {
                (currentStep === 'name') &&
                <Name setCurrentStep={setCurrentStep} form={form} setForm={setForm} />
            }
            {
                (currentStep === 'email') &&
                <Email role={'signup'} setCurrentStep={setCurrentStep} form={form} setForm={setForm} />
            }
            {
                (currentStep === 'password') &&
                <Password role={'signup'} setCurrentStep={setCurrentStep} form={form} setForm={setForm} />
            }
        </div>
    )
}

export default Signup