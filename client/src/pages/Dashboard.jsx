import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);

  return (
    <div className='p-20 text-2xl'>Dashboard: Hello {currentUser.email}</div>
  )
}

export default Dashboard