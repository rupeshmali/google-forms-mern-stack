import React from 'react'
import { useNavigate } from 'react-router-dom'

const ResponseSubmitSuccess = ({formTitle, location}) => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center  bg-purple-100 h-screen w-screen p-20'>
        <div className='flex flex-col justify-start items-start gap-5 p-8 w-[500px] bg-white rounded-lg border-t-[12px] border-t-purple-800 shadow'>
            <p className='text-3xl'>{formTitle}</p>
            <p>Your response has been recorded.</p>
            <button className='text-blue-500 text-sm underline' onClick={() =>  window.location.reload()}>Submit another response</button>
        </div>
    </div>
  )
}

export default ResponseSubmitSuccess