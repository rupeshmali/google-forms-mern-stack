import React from 'react';
import Select from 'react-select';
import { MdOutlineShortText, MdOutlineCheckBox, MdOutlineDateRange } from 'react-icons/md';
import { GrTextAlignFull } from "react-icons/gr";
import { RiRadioButtonLine } from "react-icons/ri";

const options = [
    { value: 'shortAnswer', label: <div className='flex gap-2 items-center justify-start'><MdOutlineShortText size={20} /> Short answer</div> },
    { value: 'paragraph', label: <div className='flex gap-2 items-center justify-start'><GrTextAlignFull size={15} /> Paragraph</div> },
    { value: 'multipleChoice', label: <div className='flex gap-2 items-center justify-start'><RiRadioButtonLine size={20} /> Multiple Choice</div> },
    { value: 'checkboxes', label: <div className='flex gap-2 items-center justify-start'><MdOutlineCheckBox size={20} /> Checkboxes</div> },
    { value: 'date', label: <div className='flex gap-2 items-center justify-start'><MdOutlineDateRange size={20} /> Date</div> }
];

const CustomSelect = ({ setQuestionType }) => {

    const handleChange = (selectedOption) => {
        setQuestionType(selectedOption)
    };

    return (
        <Select options={options} defaultValue={options[2]} className='w-[200px]' onChange={handleChange} />
    );
};

export default CustomSelect;
