import React, { useState } from 'react'
import { useGetFormQuery, useSaveResponseMutation } from '../slices/formApi';
import { useParams } from 'react-router-dom';
import { FaStarOfLife } from "react-icons/fa6";

const UserSubmissionForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [answers, setAnswers] = useState({});
    const params = useParams();

    const { data, error, isLoading } = useGetFormQuery(params.id);
    const [saveResponse, { isError }] = useSaveResponseMutation();

    const handleInputChange = (questionId, e) => {
        setAnswers({
            ...answers,
            [questionId]: e.target.id
        })
    }
    const handleSubmit = async () => {
        const requiredQuestions = data.form.questions.filter(question => question.question_required)
        if (requiredQuestions.length > 0 && Object.keys(answers).length === 0) {
            setErrorMessage('Error: Please answer all required questions.')
            return;
        }
        const missingKeys = requiredQuestions
            .map(question => question.question_id)
            .filter(questionId => !answers.hasOwnProperty(questionId));

        if (missingKeys.length > 0) {
            setErrorMessage('Error: required questions are not answered. 45 line wala')
            return;
        }
        const response = await saveResponse({
            formId: data.form.form_id,
            answers: answers
        })
    }
    const handleClearForm = () => {
        window.location.reload();
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;
    return (
        // <div className='flex flex-col items-center h-screen w-screen bg-white'>
        <div className='flex flex-col items-center w-screen  bg-purple-100  p-10 gap-5'>
            <div className='flex flex-col gap-5 w-[650px] bg-white rounded-lg border-t-[10px] border-purple-700'>
                <p className='text-4xl px-5 pt-5'>
                    {data.form.form_title}
                </p>
                <p className='px-5'>
                    {data.form.form_description}
                </p>
                <hr />
                <p className='text-red-600 px-5 pb-5'>
                    * Indicates required question
                </p>
            </div>
            {
                data.form.questions.map((question) => (
                    <div className='flex flex-col gap-5 w-[650px] bg-white rounded-md p-5' key={question.question_id}>
                        <p className='flex gap-0.5 font-bold '>
                            {question.question_text}
                            {
                                question.question_required && <FaStarOfLife color='red' size={8} />
                            }
                        </p>
                        <div className='flex flex-col gap-2' key={question.question_id} >
                            {question.options.map((option) => (
                                <div className='flex gap-2'>
                                    <input type="radio" id={option.option_id} name={question.question_id} value={option.option_text} onChange={(e) => handleInputChange(question.question_id, e)} />
                                    <label for={option.option_id}>{option.option_text}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            <div className=''>
                {
                    (errorMessage !== '') && <p className='text-red-600'>{errorMessage}</p>
                }
            </div>
            <div className='flex w-[650px] justify-between'>
                <button className='bg-purple-700 text-white px-6 rounded text-sm' onClick={handleSubmit}>
                    Submit
                </button>
                <button className='text-purple-700 hover:bg-purple-200 hover:text-purple-800  px-3 py-2 rounded-md text-sm' onClick={handleClearForm}>
                    Clear form
                </button>
            </div>
        </div>
    )
}

export default UserSubmissionForm