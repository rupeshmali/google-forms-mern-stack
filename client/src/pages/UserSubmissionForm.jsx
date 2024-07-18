import React, { useState } from 'react'
import { useGetFormQuery, useSaveQuestionMutation, useSaveResponseMutation } from '../slices/formApi';
import { useLocation, useParams } from 'react-router-dom';
import { FaStarOfLife } from "react-icons/fa6";
import ResponseSubmitSuccess from '../components/userResponse/ResponseSubmitSuccess';

const UserSubmissionForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [answers, setAnswers] = useState({});
    const [checkBoxAnswers, setCheckBoxAnswers] = useState({});
    // const [shortAnswers, setShortAnswers] = useState({});
    const [formsubmitSuccess, setFormSubmitSuccess] = useState(false);
    const params = useParams();
    const location = useLocation();
    const { data, error, isLoading } = useGetFormQuery(params.id);
    const [saveResponse, { isError }] = useSaveResponseMutation();

    const handleInputChange = (questionId, questionText, e) => {
        console.log('questionId, questionText, e', questionId, questionText, e.target.value);
        setAnswers({
            ...answers,
            [questionId]: {
                questionText: questionText,
                answerText: e.target.value
            }
        })
    }
    const handleMcqChange = (questionId, questionText, e) => {
        setAnswers({
            ...answers,
            [questionId]: {
                questionText: questionText,
                answerId: e.target.id,
                answerText: e.target.value
            }
        })
    }
    const handleCheckBoxChange = (questionId, questionText, e) => {
        const currentAnswers = checkBoxAnswers[questionId] || { ids: [], values: [] };
        let newIds, newValues;

        if (e.target.checked) {
            newIds = [...currentAnswers.ids, e.target.id];
            newValues = [...currentAnswers.values, e.target.value];
        } else {
            newIds = currentAnswers.ids.filter(id => id !== e.target.id);
            newValues = currentAnswers.values.filter(value => value !== e.target.value);
        }

        setCheckBoxAnswers({
            ...checkBoxAnswers,
            [questionId]: {
                ids: newIds,
                values: newValues
            }
        });

        setAnswers({
            ...answers,
            [questionId]: {
                questionText: questionText,
                answerIds: newIds,
                answerValues: newValues
            }
        });
    }

    const handleSubmit = async () => {
        console.log({ answers });
        if(data.form.questions.length === 0){
            setErrorMessage("Error: The form cannot be submitted as it contains no questions. Please check with the form creator.")
            return;
        }
        const requiredQuestions = data.form.questions.filter(question => question.question_required)
        if (requiredQuestions.length > 0 && Object.keys(answers).length === 0) {
            setErrorMessage('Error: Please answer all required questions.')
            return;
        }
        const missingKeys = requiredQuestions
            .map(question => question.question_id)
            .filter(questionId => !answers.hasOwnProperty(questionId));

        if (missingKeys.length > 0) {
            setErrorMessage('Error: Please answer all required questions.')
            return;
        }
        const response = await saveResponse({
            formId: data.form.form_id,
            answers: answers
        })
        if (response.data.success) {
            setFormSubmitSuccess(true)
        }
    }
    const handleClearForm = () => {
        window.location.reload();
    }


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;
    if (formsubmitSuccess) return (<ResponseSubmitSuccess formTitle={data.form.form_title} location={location.pathname} />)
    return (
        <div className='flex flex-col items-center w-screen bg-purple-100 p-10'>
            <div className='flex flex-col gap-5'>
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
                            <p className='flex gap-0.5'>
                                {question.question_text}
                                {
                                    question.question_required && <FaStarOfLife color='red' size={8} />
                                }
                            </p>
                            {//MCQ QUESTIONS
                                (question.question_type === 'multipleChoice') &&
                                <div className='flex flex-col gap-2' key={question.question_id} >
                                    {question.options.map((option) => (
                                        <div className='flex gap-2'>
                                            <input type="radio" id={option.option_id} name={question.question_id} value={option.option_text} onChange={(e) => handleMcqChange(question.question_id, question.question_text, e)} />
                                            <label for={option.option_id}>{option.option_text}</label>
                                        </div>
                                    ))}
                                </div>
                            }
                            {//CHECKBOXES QUESTIONS
                                (question.question_type === 'checkboxes') &&
                                <div className='flex flex-col gap-2' key={question.question_id} >
                                    {question.options.map((option) => (
                                        <div className='flex gap-2'>
                                            <input type="checkbox" id={option.option_id} name={question.question_id} value={option.option_text} onChange={(e) => handleCheckBoxChange(question.question_id, question.question_text, e)} />
                                            <label for={option.option_id}>{option.option_text}</label>
                                        </div>
                                    ))}
                                </div>
                            }
                            {//SHORT ANSWER
                                (question.question_type === 'shortAnswer') &&
                                <div>
                                    <input type="text" placeholder='Your answer' className='border-b-[1px] p-2 rounded' onChange={(e) => handleInputChange(question.question_id, question.question_text, e)} />
                                </div>
                            }
                            {//PARAGRAPH ANSWER
                                (question.question_type === 'paragraph') &&
                                <div>
                                    <textarea name="" id="" placeholder='Your answer' className='border-b-[1px] p-2 rounded w-[500px]' onChange={(e) => handleInputChange(question.question_id, question.question_text, e)} />
                                </div>
                            }
                            {//DATE QUESTION
                                (question.question_type === 'date') &&
                                <div>
                                    <input type="date" name="" id="" className='border-b-[1px] p-2 rounded' onChange={(e) => handleInputChange(question.question_id, question.question_text, e)}/>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-col w-[650px] justify-between'>
                <div className='h-8 pt-2'>
                    {
                        (errorMessage !== '') && <p className='text-red-600 text-sm'>{errorMessage}</p>
                    }
                </div>
                <div className='flex justify-between'>
                    <button className='bg-purple-700 text-white px-6 rounded text-sm' onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className='text-purple-700 hover:bg-purple-200 hover:text-purple-800  px-3 py-2 rounded-md text-sm' onClick={handleClearForm}>
                        Clear form
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSubmissionForm