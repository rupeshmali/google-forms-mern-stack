import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth'
import { create } from '../api/form';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import { useGetFormsForLoggedInUserQuery } from '../slices/formApi';
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";


const Dashboard = () => {
    const [formsView, setFormsView] = useState({
        grid: true,
        list: false
    })
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleCreateForm = async () => {
        const payload = {
            user_id: currentUser.id
        }
        const { data } = await create(payload);
        window.location.href = window.origin + PATHS.DASHBOARD + `/${data.form.form_id}`
    }
    const handleView = (view) => {
        const keys = Object.keys(formsView)
        const newObj = {

        }
        keys.forEach(key => {
            if (key === view) {
                newObj[key] = true
            } else {
                newObj[key] = false
            }
        })
        console.log({ newObj });
        setFormsView(newObj)
    }

    const { data, error, isLoading } = useGetFormsForLoggedInUserQuery();
    console.log(data);
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
            <div className='pt-5 gap-10 flex flex-col px-32'>
                <div className='flex justify-between'>
                    <div> Recent forms</div>
                    <div className='flex gap-2'>
                        <button className='bg-purple-600 text-white' onClick={() => handleView('list')}>
                            List view
                        </button>
                        <button className='bg-purple-600 text-white' onClick={() => handleView('grid')}>
                            Grid view
                        </button>
                    </div>
                </div>
                <div className={`${formsView.list ? 'flex flex-col' : 'grid grid-cols-5 gap-5'}  `}>
                    {data.forms.forms.map((form) => {
                        return (
                            <>
                                {formsView.grid &&
                                    <div className='border border-slate-300 hover:border-purple-600 p-0 rounded h-[250px] w-[220px]' onClick={() => navigate(PATHS.DASHBOARD + `/${form.form_id}`)}>
                                        <div className='min-h-[180px] bg-purple-50 rounded border-slate-300 border-b'></div>
                                        <div className='flex flex-col p-4 gap-1'>
                                            <div className='text-sm pl-0.5'>{form.form_title}</div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <SiGoogleforms color='purple' size={15} />
                                                    <p className='text-xs text-slate-400'>Opened 6:24 pm</p>
                                                </div>
                                                <BsThreeDotsVertical />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    formsView.list &&
                                    <div className='flex flex-col'>
                                        <p>{form.form_title}</p>
                                    </div>
                                }
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard