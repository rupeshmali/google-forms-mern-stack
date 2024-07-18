import React from 'react'
import { useGetResponsesQuery } from '../../slices/formApi';
import { useParams } from 'react-router-dom';

const Responses = ({ data, isLoading, error }) => {
    const params = useParams()
    // const { data, error, isLoading } = useGetResponsesQuery(params.id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;
    console.log({ data });
    return (
        <div className='flex flex-col gap-5 p-10'>
            {
                data.answers.map((response) => (
                    <div key={response.response_id} className='bg-white border-purple-500 border rounded-md shadow-md p-5 text-sm'>
                        <div>
                            {Object.entries(response.response_data).map(([key, value]) => (
                                <div key={key} className='flex gap-2'>
                                    <strong> {value.questionText}:</strong>
                                    {
                                        (value.answerValues?.length > 0) ?
                                            value.answerValues.map((ans) => (
                                                <div>
                                                    {ans}
                                                </div>
                                            )) :
                                            (<div> {value.answerText} </div>)
                                    }
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