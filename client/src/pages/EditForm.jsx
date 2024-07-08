import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFormsForLoggedInUserQuery } from '../slices/formApi';
import { IoMdAddCircleOutline } from "react-icons/io";

const EditForm = () => {
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const { data, error, isLoading } = useGetFormsForLoggedInUserQuery();
  const params = useParams();
  const currentForm = data?.forms?.filter((form) => Number(form.form_id) === Number(params.id))

  useEffect(() => {
    if (currentForm) {
      setFormTitle(currentForm[0].form_title)
      setFormDescription(currentForm[0].form_description)
    }
  }, [])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;


  return (
    <div className='flex justify-center bg-purple-100 p-5 gap-5 h-svh'>
      <div className='flex flex-col bg-white rounded-md shadow-md border-l-blue-500 border-l-[6px] border-t-purple-700 border-t-[12px] min-w-[800px] p-5 h-[180px]'>
        <input type="text" placeholder='Form title'  value={formTitle} className='text-4xl py-2 border-b-2 focus:border-black outline-none' onChange={(e) => setFormTitle(e.target.value)} />
        <input type="text" placeholder='Form description' value={formDescription} className='text-sm pt-3 border-b-2 focus:border-black outline-none' onChange={(e) => setFormDescription(e.target.value)} />
      </div>
      <div className='min-w-5 bg-white h-[250px] rounded-md shadow-md p-2'>
        <IoMdAddCircleOutline size={25} color='grey' />
      </div>
    </div>
  )
}

export default EditForm