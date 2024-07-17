import React, { useEffect, useState } from 'react'
import { CgRadioCheck } from "react-icons/cg";
import { useParams } from 'react-router-dom';
import { useGetFormsForLoggedInUserQuery } from '../../slices/formApi';

const Questions = () => {
    const [form, setForm] = useState({})
    const { data, error, isLoading } = useGetFormsForLoggedInUserQuery();
    const params = useParams()

    useEffect(() => {
        if (!isLoading && data) {
            const currentForm = data.forms.forms.find((form) => Number(form.form_id) === Number(params.id));
            if (currentForm) {
                console.log("IMP DATA: ", currentForm);
                setForm(currentForm);
            }
        }
    }, [data, isLoading, params.id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col gap-5'>
            {
                form.questions?.map((question, qIndex) => {
                    return (
                        <div className='flex flex-col justify-between gap-2 bg-white rounded-lg p-5  min-w-[800px] max-w-[800px] shadow-sm' key={question.question_id}>
                            <p>{question.question_text}</p>

                            {
                                question.options.map((option, oIndex) => {
                                    return (
                                        <div className='flex items-center gap-0' key={option.option_id}>
                                            <CgRadioCheck size={20} color='grey' />
                                            <input className='outline-none px-2 py-0 h-[50px] w-[650px]' value={option.option_text} type="text" placeholder='Option' />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Questions
