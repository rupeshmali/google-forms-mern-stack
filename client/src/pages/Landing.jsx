import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../utils/constants';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between items-center px-20 py-20'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-3'>
                    <div className='text-6xl'>
                        Get insights
                    </div>
                    <div className='text-6xl'>
                        quickly, with
                    </div>
                    <div className='text-6xl'>
                        Google Forms
                    </div>
                </div>
                <div className='text-xl text-slate-500'>
                    <p>
                        Easily create and share online forms and surveys, and
                    </p>
                    <p>
                        analyze responses in real-time.
                    </p>
                </div>
                <div className='flex items-center gap-5'>
                    <button className='bg-blue-600 px-7 py-3 rounded text-white hover:bg-blue-700'>
                        Try Forms for Work
                    </button>
                    <button className='border px-7 py-3 rounded text-blue-600 hover:border-blue-600 hover:bg-blue-50' onClick={() => navigate(PATHS.DASHBOARD)}>
                        Go to Forms
                    </button>
                </div>
                <div className='flex items-center gap-5'>
                    <p className='text-slate-500'>
                        Don't have an account?
                    </p>
                    <button className='rounded px-3 py-3 text-blue-600 hover:bg-blue-50' onClick={() => navigate(PATHS.SIGNUP.INDEX)}>
                        Sign up for free
                    </button>
                </div>
            </div>
            <div className='rounded-xl h-[530px] w-[720px] pt-5'>
                <img className='drop-shadow-lg' src="landing.png" alt="" />
            </div>
        </div>
    )
}

export default Landing