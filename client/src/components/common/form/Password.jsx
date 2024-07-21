import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import LanguageAndLegalLinks from './LanguageAndLegalLinks';
import { AuthContext } from '../../../contexts/auth';
import { isStrongPassword } from '../../../utils/auth';
import ErrorMessage from './ErrorMessage';
import { ERRORS } from '../../../utils/constants';
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const Password = ({ role, setCurrentStep, form, setForm }) => {
    const { handleSignUp, handleSignIn } = useContext(AuthContext)
    const [hasError, setHasError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordStrong, setIsPasswordStrong] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handlePassword = (e) => {
        if (isStrongPassword(e.target.value)) {
            setIsPasswordStrong(true)
        }
        setForm({
            ...form,
            password: e.target.value
        })
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleSubmit = async () => {
        console.log("came in handleSubmit");
        console.log(form);
        if (form.password === '') {
            setHasError(true)
            setErrorMessage(ERRORS.PASSWORD.REQUIRED)
            return;
        }
        if (!isStrongPassword(form.password)) {
            setHasError(true)
            setErrorMessage(ERRORS.PASSWORD.STRONG)
            return;
        }
        if (confirmPassword !== form.password && role==='signup') {
            setHasError(true)
            setErrorMessage(ERRORS.PASSWORD.MISMATCH)
            return;
        }
        if(role==='signup') await handleSignUp();
        if(role==='signin') await handleSignIn(form.email, form.password);

    }
    console.log("Password: ", form);
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between p-9 rounded-3xl bg-white w-[1040px]'>
                {
                    (role === 'signup') ?
                        (<div className='flex flex-col gap-5'>
                            <FcGoogle size={55} />
                            <div className='text-4xl'>
                                Create a strong password
                            </div>
                            <div>
                                <p>
                                    To ensure the best security, create a password that includes
                                </p>
                                <p>
                                    a mix of uppercase and lowercase letters, numbers (0-9),
                                </p>
                                <p>
                                    and special characters like !@#$%^&
                                </p>
                            </div>
                        </div>
                        ) : (
                            <div className='flex flex-col gap-5'>
                                <FcGoogle size={55} />
                                <div className='text-4xl'>
                                    <p>Almost there!</p>
                                    <p>Just one more step to sign in.</p>
                                </div>
                            </div>
                        )
                }
                <div className='flex flex-col pt-10 gap-7'>
                    <div>
                        <ErrorMessage hasError={hasError} message={errorMessage} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <input onChange={handlePassword} value={form.password} type={showPassword ? 'text' : 'password'} placeholder='Password' className='border-stone-900 border w-[450px] rounded px-4 py-4 placeholder:text-slate-700' />
                        <div>
                            {
                                (form.password.length > 0 && role === 'signup') && (
                                    isPasswordStrong ?
                                        <div className='flex items-center gap-1 text-green-500 text-sm'><FaCheckCircle color='green' /> Strong</div> :
                                        <p className='flex items-center gap-1 text-yellow-500 text-sm'><FaExclamationTriangle color='orange' /> Weak</p>
                                )
                            }
                        </div>
                        {
                            (role === 'signup') &&
                            <input onChange={handleConfirmPassword} value={confirmPassword} type={showPassword ? 'text' : 'password'} placeholder='Confirm' className='border-stone-900 border w-[450px] rounded px-4 py-4 placeholder:text-slate-700' />
                        }
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" name="" id="" className='' onChange={handleShowPassword} />
                            <label htmlFor="" className='text-sm'>Show password</label>
                        </div>

                    </div>
                    <div className='flex justify-end items-center'>
                        {/* <button className='text-blue-600 text-sm hover:bg-slate-100 px-5 py-3 rounded-3xl'>Create account</button> */}
                        <button className='bg-blue-600 hover:bg-blue-700 rounded-3xl px-6 py-3 text-white text-sm' onClick={handleSubmit}>
                            {role === 'signin' ? 'Sign in' : 'Create Account'}
                        </button>
                    </div>
                </div>
            </div>
            <LanguageAndLegalLinks />
        </div>
    )
}

export default Password