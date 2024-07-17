import React from 'react'
import { useGetFormQuery } from '../slices/formApi';
import { useParams } from 'react-router-dom';

const UserSubmissionForm = () => {
    const params = useParams();
    console.log(params.id);
    const { data, error, isLoading } = useGetFormQuery(params.id);
    console.log('Single form received: ', data);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;
    return (
        // <div className='flex flex-col items-center h-screen w-screen bg-white'>
        <div className='flex flex-col items-center h-screen w-screen  bg-purple-100  p-10 gap-5'>
            <div className='flex flex-col gap-5 w-[650px] bg-white rounded-lg border-t-[10px] border-purple-700'>
                <p className='text-4xl px-5 pt-5'>
                    FORM HEADING
                </p>
                <p className='px-5'>
                    form descriptiion
                </p>
                <hr />
                <p className='text-red-600 px-5 pb-5'>
                    * Indicates required question
                </p>
            </div>
            <div className='flex flex-col gap-5 w-[650px] bg-white rounded-md p-5'>
                <p>Please select your favorite Web language:</p>
                <div className='flex gap-2'>
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">HTML</label>
                </div>
                <div className='flex gap-2'>
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">HTML</label>
                </div>
                <div className='flex gap-2'>
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">HTML</label>
                </div>
            </div>
            <div className='flex w-[650px] justify-between'>
                <button className='bg-purple-700 text-white px-6 rounded text-sm'>
                    Submit
                </button>
                <button className='text-purple-700 hover:bg-purple-200 hover:text-purple-800  px-3 py-2 rounded-md text-sm'>
                    Clear form
                </button>
            </div>
        </div>
    )
}

export default UserSubmissionForm