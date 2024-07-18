import React from 'react'
import { IoLink } from "react-icons/io5";
import { PATHS } from '../../utils/constants';

const ShareFormLinkModal = ({ setSendBtnClicked, formUuId }) => {
    return (
        <div className='flex flex-col gap-5 fixed bg-white border w-[500px] rounded-md left-[50%] top-[30%] transform translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex  justify-between p-5'>
                <p className='text-2xl'>
                    Send form
                </p>
                <button onClick={() => setSendBtnClicked(false)}>X</button>
            </div>
            <div className='flex gap-10 items-center border-b border-t p-5 bg-slate-50'>
                <p>Send via</p>
                <div className='bg-stone-200 rounded-md p-2'>
                    <IoLink size={20} />
                </div>
            </div>
            <div className='flex flex-col p-5 gap-5'>
                <p>Link</p>
                <div className='border-black border-b-2'>
                    <p>{window.location.origin + PATHS.USER_FORM_SUBMIT.replace(':id', formUuId)}</p>
                </div>
            </div>
            <div className='flex justify-end gap-5 p-5'>
                <button className='border px-5 py-2 rounded' onClick={() => setSendBtnClicked(false)}>Cancel</button>
                <button className='border px-5 py-2 rounded'>Copy</button>
            </div>
        </div>
    )
}

export default ShareFormLinkModal