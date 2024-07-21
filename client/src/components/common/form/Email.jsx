import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import LanguageAndLegalLinks from './LanguageAndLegalLinks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ERRORS, PATHS } from '../../../utils/constants';
import { AuthContext } from '../../../contexts/auth';
import { isValidEmail } from '../../../utils/auth';
import ErrorMessage from './ErrorMessage';

const Email = ({ role, setCurrentStep, form, setForm }) => {
    const [hasError, setHasError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            email: e.target.value
        })
    }
    const handleSubmit = () => {
        if (!isValidEmail(form.email)) {
            setHasError(true)
            return;
        }
        setCurrentStep('password')
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between p-9 rounded-3xl bg-white h-[400px] w-[1040px]'>
                <div className='flex flex-col gap-5'>
                    <FcGoogle size={55} />
                    {
                        role === 'signin' ? <p className='text-4xl'>Sign in</p> : <p className='text-4xl'>Sign up</p>
                    }
                    <p>to continue to Forms</p>
                </div>
                <div className='flex flex-col pt-20 gap-10'>
                    <div className='flex flex-col gap-2'>
                        <input onChange={handleChange} value={form.email} type="text" placeholder='Email' className='border-stone-900 border w-[450px] rounded px-4 py-4 placeholder:text-slate-700' />
                        {/* <a className='text-blue-600 text-sm font-semibold'>Forgot email?</a> */}
                        <ErrorMessage hasError={hasError} message={ERRORS.EMAIL} />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-sm text-slate-700'>Not your computer? Use Guest mode to sign in privately.</p>
                        <a className='text-blue-600 text-sm font-semibold'>Learn more about using Guest mode</a>
                    </div>
                    <div className='flex gap-5 justify-end items-center'>
                        {
                            role === 'signin' &&
                            <button className='text-blue-600 text-sm hover:bg-slate-100 px-5 py-3 rounded-3xl' onClick={() => navigate(PATHS.SIGNUP.INDEX)}>Create account</button>
                        }
                        <button className='bg-blue-600 hover:bg-blue-700 rounded-3xl px-6 py-3 text-white text-sm' onClick={handleSubmit}>Next</button>
                    </div>
                </div>
            </div>
            <LanguageAndLegalLinks />
        </div>
    )
}

export default Email