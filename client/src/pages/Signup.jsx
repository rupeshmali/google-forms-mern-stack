import React from 'react'
import Email from '../components/common/form/Email'
import Name from '../components/common/form/Name'
import { useLocation } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import Password from '../components/common/form/Password';

const Signup = () => {
    const location = useLocation();
    return (
        <div className='bg-slate-100 min-h-screen min-w-screen flex items-center justify-center'>
            {
                (location.pathname === PATHS.SIGNUP.NAME) &&
                <Name />
            }
            {
                (location.pathname === PATHS.SIGNUP.EMAIL) &&
                <Email />
            }
            {
                (location.pathname === PATHS.SIGNUP.PASSWORD) &&
                <Password />
            }
        </div>
    )
}

export default Signup