import React from 'react'
import { useGetResponsesQuery } from '../../slices/formApi';
import { useParams } from 'react-router-dom';

const Responses = () => {
    const params = useParams()
    const { data, error, isLoading } = useGetResponsesQuery(params.id);


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;
    console.log({data});
    return (
        <div className='flex flex-col gap-10'>
            {
                data.answers.map((response) => (
                    <div key={response.response_id} className='bg-purple-100'>
                        <h3>Response ID: {response.response_id}</h3>
                        <h4>Form ID: {response.form_id}</h4>
                        <div>
                            {Object.entries(response.response_data).map(([key, value]) => (
                                <div key={key}>
                                    <strong> {value.questionText}:</strong> {value.answerText}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Responses