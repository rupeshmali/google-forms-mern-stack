import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { MdLogout } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const UserProfile = () => {
    const { currentUser, handleSignOut } = useContext(AuthContext);
    const handleSignOutClick = () => {
        console.log("logout clicked");
        handleSignOut();
    }
     return (
        <div className='fixed right-5 top-20 bg-slate-200 rounded-xl flex flex-col gap-5 items-center p-5'>
            <div className='flex justify-end w-[200px]'>
                <AiOutlineClose />
            </div>
            <div className='flex justify-between text-sm'>
                {currentUser.email}
            </div>
            <div>
                <InitialsAvatar name={currentUser.firstName + ' ' + currentUser.lastName} />
            </div>
            <div className='text-xl'>
                Hi, {currentUser.firstName}!
            </div>
            <div className='flex items-center justify-center gap-2 bg-white p-3 w-[200px] rounded-3xl' onClick={handleSignOutClick}>
                <MdLogout />
                <button >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default UserProfile