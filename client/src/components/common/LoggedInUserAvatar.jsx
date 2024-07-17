import React, { useContext, useState } from 'react'
import UserProfile from '../UserProfile';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { AuthContext } from '../../contexts/auth';

const LoggedInUserAvatar = () => {
    const [displayUserProfileModal, setDisplayUserProfileModal] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleUserProfileModal = () => {
        setDisplayUserProfileModal(!displayUserProfileModal)
    }

    return (
        <div onClick={handleUserProfileModal} className='pr-5 cursor-pointer'>
            <InitialsAvatar
                name={currentUser.firstName + ' ' + currentUser.lastName}
                className='bg-orange-600 rounded-full p-2 text-sm text-white hover:shadow-orange-600 shadow'
            />
            {
                displayUserProfileModal && <UserProfile />
            }
        </div>
    )
}

export default LoggedInUserAvatar