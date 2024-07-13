import React from 'react'
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

const FloatingMenu = ({ setAddQuestion, setFloatingMenu, icon }) => {

    const handleClick = () => {
        if (icon === 'close') {
            setAddQuestion(false)
            setFloatingMenu(true)
        } else {
            setAddQuestion(true);
            setFloatingMenu(false);
        }
    }

    return (
        <div className='min-w-5 bg-white h-[250px]  rounded-md shadow-lg p-3 hover:shadow-gray-300'>
            {
                icon === 'add' && <IoMdAddCircleOutline size={25} color='black' onClick={handleClick} />
            }
            {
                icon === 'close' && <IoMdCloseCircleOutline size={25} color='black' onClick={handleClick} />
            }
        </div>
    )
}

export default FloatingMenu