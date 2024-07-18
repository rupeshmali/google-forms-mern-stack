import React, { useState } from 'react'
import { CgRadioCheck } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useSaveQuestionMutation } from '../../slices/formApi';
import { useParams } from 'react-router-dom';
import CustomSelect from '../custom/CustomSelect';
import { RxBox } from "react-icons/rx";
import { MdOutlineDateRange } from 'react-icons/md';

const Question = () => {

    const [saveQuestion, { isLoading, isError }] = useSaveQuestionMutation();
    const [questionType, setQuestionType] = useState({ value: 'multipleChoice' });
    console.log({ questionType });
    const [question, setQuestion] = useState({
        text: '',
        options: [''],
        required: false,
        type: ''
    })
    const { id } = useParams();

    const handleSaveQuestion = async () => {
        try {
            question.type = questionType.value;
            console.log("Question before Save: ", question);
            const { data } = await saveQuestion({ formId: id, question: question });
            if (data.success) {
                setQuestion({
                    text: '',
                    options: [''],
                    required: false,
                    type: ''
                })
                window.location.reload();
            }
            console.log('Question saved successfully:', data);
        } catch (error) {
            console.error('Failed to save question:', error);
        }
    };
    const handleQuestionChange = (e) => {
        let newQuestion = { ...question }
        newQuestion.text = e.target.value
        setQuestion(newQuestion)
    }
    const handleOptionChange = (oIndex, e) => {
        console.log(e.target.value);
        let newQuestion = { ...question }
        newQuestion.options[oIndex] = e.target.value;
        setQuestion(newQuestion)
    }
    const handleRequiredChange = (e) => {
        console.log("required clicked: ", e.target.checked);
        let newQuestion = { ...question }
        newQuestion.required = e.target.checked
        setQuestion(newQuestion)
    }
    const handleAddOption = () => {
        let newQuestion = { ...question }
        newQuestion.options.push('')
        setQuestion(newQuestion)
    }
    const handleRemoveOption = (oIndex) => {
        let newQuestion = { ...question }
        newQuestion.options.splice(oIndex, 1)
        setQuestion(newQuestion)
    }

    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col justify-between gap-5 bg-white rounded-lg p-5  min-w-[800px] shadow-lg'>
                <div className='flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <input value={question.text} type="text" placeholder='Question' className='p-5 h-[60px] w-[500px] bg-slate-50 border-b-[1px] border-b-slate-600 outline-none focus:border-b-purple-800 focus:border-b-2' onChange={(e) => handleQuestionChange(e)} />
                        <CustomSelect setQuestionType={setQuestionType} />
                    </div>

                    { //RADIO BUTTON and CHECKBOX QUESTIONS
                        ((questionType.value === 'multipleChoice') || (questionType.value === 'checkboxes')) &&
                        question.options.map((option, oIndex) => {
                            return (
                                <div className='flex justify-between gap-0 items-center' key={oIndex}>
                                    <div className='flex items-center gap-2'>
                                        {(questionType.value === 'multipleChoice') ?
                                            <CgRadioCheck size={20} color='grey' /> :
                                            <RxBox size={20} color='grey' />
                                        }
                                        <input className='outline-none  py-0 h-[50px] w-[650px] hover:border-b-[1px] focus:border-b-purple-800 focus:border-b-2' value={option} type="text" placeholder='Option' onChange={(e) => handleOptionChange(oIndex, e)} />
                                    </div>
                                    <div>
                                        <button className='hover:bg-slate-50 rounded-full p-2' onClick={() => handleRemoveOption(oIndex)}><IoCloseOutline size={28} color='grey' /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        ((questionType.value === 'multipleChoice') || (questionType.value === 'checkboxes')) &&
                        <div className='flex items-center gap-0'>
                            {(questionType.value === 'multipleChoice') ?
                                <CgRadioCheck size={20} color='grey' /> :
                                <RxBox size={20} color='grey' />
                            }
                            <input readOnly className='outline-none px-2 h-[50px] w-[500px] hover:border-b-[1px]' type="text" placeholder='Add Option' onClick={() => handleAddOption()} />
                        </div>
                    }
                    { //SHORT ANSWER QUESTION
                        questionType.value === 'shortAnswer' &&
                        <div className='border-b-[1px] border-black border-dotted max-w-[400px] py-1 mb-8'>
                            <p className='text-stone-500 text-sm'>Short answer text</p>
                        </div>
                    }
                    { //LONG ANSWER QUESTION
                        questionType.value === 'paragraph' &&
                        <div className='border-b-[1px] border-black border-dotted max-w-[650px] py-1 mb-8'>
                            <p className='text-stone-500 text-sm'>Long answer text</p>
                        </div>
                    }
                    { //DATE 
                        questionType.value === 'date' && 
                        <div className='flex justify-between items-center w-[200px] border-b-[1px]'>
                            <p className='text-stone-500 text-sm'>MM/DD/YYYY</p>
                            <MdOutlineDateRange size={23} color='grey' />
                        </div>
                    }
                </div>
                <div className='flex justify-end items-center gap-5 border-t-[1px] pt-5'>
                    <div className='flex gap-0 items-center'>
                        <button className='hover:rounded-full hover:bg-slate-100 p-3' onClick={() => handleDeleteQuestion()} >
                            <RiDeleteBin6Line size={22} color='grey' />
                        </button>
                        <RxDividerVertical size={40} color='#ECECEC' />
                        <div className='flex gap-2 items-center'>
                            <input checked={question.required} onChange={(e) => handleRequiredChange(e)} type="checkbox" name="" id="" className='h-4 w-4' />
                            <label htmlFor="">
                                Required
                            </label>
                        </div>
                    </div>
                    <button className='bg-purple-700 px-5 py-2 rounded text-white' onClick={handleSaveQuestion}>Save</button>
                </div>
            </div>
        </div>
    )
}


export default Question
