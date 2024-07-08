import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { create } from '../api/form';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import { useGetFormsForLoggedInUserQuery } from '../slices/formApi';


const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()
    
    const handleCreateForm = async () => {
        const payload = {
            user_id: currentUser.id
        }
        const { data } = await create(payload);
        // navigate(PATHS.DASHBOARD + `/${data.form.form_id}`)
        window.location.href = window.origin + PATHS.DASHBOARD + `/${data.form.form_id}`
    }

    const { data, error, isLoading } = useGetFormsForLoggedInUserQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col justify-center gap-5 p-5 pb-10 bg-slate-100'>
                <div className='pl-[120px] text-slate-600'>
                    Start a new form
                </div>
                <div className='flex flex-col gap-2 pl-28'>
                    <img onClick={handleCreateForm} src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png" width={180} className='border rounded hover:border-purple-800' />
                    <p className='text-sm pl-1 text-black'>Blank form</p>
                </div>
            </div>
            <div className='pl-32 pt-5 gap-10 flex flex-col'>
                Recent forms
                <div className=' flex flex-col gap-5 w-[500px]'>
                    {data.forms?.map((form) => {
                        return <div className='bg-slate-300 p-5 rounded'>{form.form_id}       {form.form_title}        {form.user_id}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard