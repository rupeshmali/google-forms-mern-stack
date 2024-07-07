import React, { useState } from 'react'
import { SiGoogleforms } from "react-icons/si";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PATHS } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { TbGridDots } from "react-icons/tb";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import UserProfile from '../UserProfile';

const Navbar = () => {
    const [displayUserProfileModal, setDisplayUserProfileModal] = useState(false);
    const { currentUser } = useContext(AuthContext);
    console.log("currentUser from context: ", currentUser);
    const navigate = useNavigate();
    const location = useLocation();
    const handleUserProfileModal = () => {
        console.log('Avatar clicked');
        setDisplayUserProfileModal(!displayUserProfileModal)
    }

    return (
        <div className='flex flex-row justify-between items-center font-sans text-stone-600 px-2 pb-1'>
            {
                location.pathname === PATHS.DASHBOARD ? (<>
                    <div className='flex items-center p-3 gap-5'>
                        <div className='p-0 rounded-full hover:bg-slate-100'>
                            <FiMenu size={22} />
                        </div>
                        <div className='flex items-center gap-2'>
                            <SiGoogleforms size={35} color='#5F259F' />
                            <p className='text-[22px] text-slate-500'>
                                Forms
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center p-2'>
                        <input type="text" className='bg-slate-100 w-[700px] p-3 rounded-md' placeholder='Search'/>
                    </div>
                    <div className='flex gap-5 items-center p-2'>
                        <div>
                            <TbGridDots size={20} />
                        </div>
                        <div onClick={handleUserProfileModal}>
                            <InitialsAvatar name={currentUser.firtName + ' ' + currentUser.lastName} />
                            {
                                displayUserProfileModal && <UserProfile />
                            }
                        </div>
                    </div>
                </>
                ) : (<><div className='flex items-center gap-6 pt-1'>
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
                        <button className='text-blue-500 px-4 hover:bg-blue-50 rounded' onClick={() => navigate(PATHS.SIGNIN.INDEX)}>
                            Sign in
                        </button>
                        <button className='border px-7 py-3 rounded text-blue-600 hover:border-blue-600 hover:bg-blue-50'>
                            Go to Forms
                        </button>
                        <button className='bg-blue-600 px-7 py-3 rounded text-white hover:bg-blue-700'>
                            Try Forms for Work
                        </button>
                    </div>
                </>
                )
            }

        </div>
    )
}

export default Navbar