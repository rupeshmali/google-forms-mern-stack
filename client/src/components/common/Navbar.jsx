import React from 'react'
import { SiGoogleforms } from "react-icons/si";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PATHS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-row justify-between items-center font-sans text-stone-600 px-2 pb-1'>
            <div className='flex items-center gap-6 pt-1'>
                <div className='flex items-center gap-1 text-2xl text-stone-500 hover:bg-slate-100 px-3 rounded' onClick={() => navigate(PATHS.LANDING)}>
                    <SiGoogleforms size={32} color='#5F259F' />
                    <span className='text-stone-600 hover:text-stone-950'>
                        Google
                    </span>
                    <span className='font-light'>
                        Forms
                    </span>
                </div>
                <div className='flex gap-7 items-center pt-2'>
                    <div className='hover:text-stone-950 border-b-2 border-blue-500 pt-3 px-1 pb-3'>
                        Overview
                    </div>
                    <div className='hover:text-stone-950 pt-3 px-1 pb-3'>
                        Features
                    </div>
                    <div className='hover:text-stone-950 pt-3 px-1 pb-3'>
                        Security
                    </div>
                    <div className='hover:text-stone-950 pt-3 px-1 pb-3'>
                        Pricing
                    </div>
                </div>
            </div>
            <div className='flex gap-2 pt-1'>
                <button className='px-3 flex items-center gap-2 hover:bg-slate-100 rounded'>
                    More tools <MdKeyboardArrowDown size={25} />
                </button>
                <button className='text-blue-500 px-4 hover:bg-blue-50 rounded' onClick={() => navigate(PATHS.SIGNIN)}>
                    Sign in
                </button>
                <button className='border px-7 py-3 rounded text-blue-600 hover:border-blue-600 hover:bg-blue-50'>
                    Go to Forms
                </button>
                <button className='bg-blue-600 px-7 py-3 rounded text-white hover:bg-blue-700'>
                    Try Forms for Work
                </button>
            </div>
        </div>
    )
}

export default Navbar