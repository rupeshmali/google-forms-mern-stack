import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";

const FloatingMenu = ({ setAddQuestion, setFloatingMenu }) => {

    const handleClick = () => {
        setAddQuestion(true);
        setFloatingMenu(false);
    }

    return (
        <div className='min-w-5 bg-white h-[250px] rounded-md shadow-md p-3'>
            <IoMdAddCircleOutline size={25} color='black' onClick={handleClick} />
        </div>
    )
}

export default FloatingMenu