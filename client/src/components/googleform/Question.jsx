import React, { useState } from 'react'
import FloatingMenu from './FloatingMenu'
import { CgRadioCheck } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

const Question = () => {
    const [questions, setQuestions] = useState([{
        question: '',
        options: [''],
        required: false,
        type: ''
    }])
    const handleQuestionChange = (qIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].question = e.target.value;
        setQuestions(newQuestions);
    }
    const handleOptionChange = (qIndex, oIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = e.target.value;
        setQuestions(newQuestions)
    }
    const handleRequiredChange = (qIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].required = e.target.checked;
        setQuestions(newQuestions);
    }
    const handleAddOption = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.push('');
        setQuestions(newQuestions);
    }
    const handleRemoveOption = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.splice(oIndex, 1);
        setQuestions(newQuestions)
    }
    return (
        <>
            {questions.map((question, qIndex) => {
                return (
                    <div className='flex flex-col justify-between gap-5 bg-white rounded-lg p-5'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex justify-between'>
                                <input value={question.question} type="text" placeholder='Question' className='p-5 h-[60px] w-[500px] bg-slate-50 border-b-[1px] border-b-slate-600' onChange={(e) => handleQuestionChange(qIndex, e)} />
                                <select name="" id="" className='h-[50px] p-2 border rounded'>
                                    <option value="Multiple Choice">Multiple Choice</option>
                                </select>
                            </div>
                            {
                                question.options.map((option, oIndex) => {
                                    return (
                                        <div className='flex justify-between gap-0 items-center'>
                                            <div className='flex items-center gap-0'>
                                                <CgRadioCheck size={20} color='grey' />
                                                <input className='outline-none px-2 py-0 h-[50px] w-[650px] hover:border-b-[1px]' value={option} type="text" placeholder='Option' onChange={(e) => handleOptionChange(qIndex, oIndex, e)} />
                                            </div>
                                            <div>
                                                <button className='hover:bg-slate-50 rounded-full p-2' onClick={() => handleRemoveOption(qIndex, oIndex)}><IoCloseOutline size={28} color='grey' /></button>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                            <div className='flex items-center gap-0'>
                                <CgRadioCheck size={20} color='grey' />
                                <input className='outline-none px-2 h-[50px] w-[500px] hover:border-b-[1px]' type="text" placeholder='Add Option' onClick={() => handleAddOption(qIndex)} />
                            </div>
                        </div>
                        <div className='flex justify-end items-center gap-5 border-t-[1px] pt-5'>
                            <div className='flex gap-0 items-center'>
                                <RiDeleteBin6Line size={22} color='grey' />
                                <RxDividerVertical size={40} color='#ECECEC' />
                                <div className='flex gap-2 items-center'>
                                    <input checked={question.required} onChange={(e) => handleRequiredChange(qIndex, e)} type="checkbox" name="" id="" className='h-4 w-4' />
                                    <label htmlFor="">
                                        Required
                                    </label>
                                </div>
                            </div>

                            <button className='bg-purple-700 px-5 py-2 rounded-lg text-white'>Add</button>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

export default Question
