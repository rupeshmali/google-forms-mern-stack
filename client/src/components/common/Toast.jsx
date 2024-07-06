import React from 'react'
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { TOAST_TYPES } from '../../utils/constants';

const Toast = ({ type, message }) => {

    return (
        <>
            {(type === TOAST_TYPES.SUCCESS) &&
                <div className="flex  items-center gap-2 border-green-500 border-2 text-sm bg-green-100 text-green-900 top-10 left-[50%] rounded-xl p-2 transform translate-x-[-50%]  fixed">
                    <FaCheckCircle  color='green' />
                    <p>{message}</p>
                </div>
            }
            {(type === TOAST_TYPES.FAILURE) &&
                <div className="flex items-center gap-2 border-red-500 border-2 text-sm bg-red-100 text-red-900 top-10 left-[50%] rounded-xl p-2 transform translate-x-[-50%]  fixed">
                    <FaExclamationCircle color='red'/>
                    <p>{message}</p>
                </div>
            }
        </>
    )
}

export default Toast