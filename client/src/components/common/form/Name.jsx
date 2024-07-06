import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import LanguageAndLegalLinks from './LanguageAndLegalLinks';
import { useNavigate } from 'react-router-dom';
import { ERRORS, PATHS } from '../../../utils/constants';
import { AuthContext } from '../../../contexts/auth';
import ErrorMessage from './ErrorMessage';

const Name = () => {
    const navigate = useNavigate()
    const { firstName, setFirstName, lastName, setLastName, } = useContext(AuthContext);
    const [hasError, setHasError] = useState(false)
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleSubmit = () => {
        console.log(firstName);
        if (firstName === '') {
            console.log("Please enter name");
            setHasError(true)
            return;
        }
        navigate(PATHS.SIGNUP.EMAIL)
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between p-9 rounded-3xl bg-white h-[400px] w-[1040px]'>
                <div className='flex flex-col gap-5'>
                    <FcGoogle size={55} />
                    <p className='text-4xl'>Create a Google Account</p>
                    <p>Enter your name</p>
                </div>
                <div className='flex flex-col pt-20 gap-5'>
                    <div className='flex flex-col gap-5'>
                        <input onChange={handleFirstName} value={firstName} type="text" placeholder='First Name' className='border-stone-900 border w-[450px] rounded px-4 py-4 placeholder:text-slate-700' />
                        <input onChange={handleLastName} value={lastName} type="text" placeholder='Last Name (optional)' className='border-stone-900 border w-[450px] rounded px-4 py-4 placeholder:text-slate-700' />
                        <ErrorMessage hasError={hasError} message={ERRORS.NAME}/>
                    </div>
                    <div className='flex gap-5 justify-end items-center'>
                        {/* <button className='text-blue-600 text-sm hover:bg-slate-100 px-5 py-3 rounded-3xl'>Create account</button> */}
                        <button className='bg-blue-600 hover:bg-blue-700 rounded-3xl px-6 py-3 text-white text-sm' onClick={handleSubmit}>Next</button>
                    </div>
                </div>
            </div>
            <LanguageAndLegalLinks />
        </div>
    )
}

export default Name