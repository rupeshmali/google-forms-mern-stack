import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from '../../utils/constants';

const Layout = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser.email) {
        return <Navigate to={ PATHS.SIGNIN.INDEX } />
    }

    return (
        <Outlet />
    )
}

export default Layout