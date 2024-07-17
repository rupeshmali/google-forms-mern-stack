import React, { useState } from 'react'
import ShareFormLinkModal from './ShareFormLinkModal'
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";
import { BsEye } from "react-icons/bs";
import LoggedInUserAvatar from '../common/LoggedInUserAvatar';
import { PATHS } from '../../utils/constants';

const FormMenubar = ({form}) => {
  const [sendBtnClicked, setSendBtnClicked] = useState(false);

    return (
        <>
            {
                sendBtnClicked && <ShareFormLinkModal  setSendBtnClicked={setSendBtnClicked} formUuId={form.uuid} />
            }
            <div className='flex justify-between p-2'>
                <div className='flex gap-5 items-center'>
                    <SiGoogleforms size={40} color='purple' className='cursor-pointer' onClick={() => navigate(PATHS.DASHBOARD)} />
                    <div className='text-lg'>
                        <p>{form.title}</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <button>
                        <BsEye size={25} />
                    </button>
                    <button className='bg-purple-800 text-white px-6 py-2 rounded text-sm' onClick={() => setSendBtnClicked(true)}>
                        Send
                    </button>
                    <div className='cursor-pointer'>
                        <BsThreeDotsVertical />
                    </div>
                    <LoggedInUserAvatar />
                </div>
            </div>
        </>
    )
}

export default FormMenubar