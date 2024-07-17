import React, { useCallback, useEffect, useState } from 'react'
import { useGetFormsForLoggedInUserQuery, useUpdateFormMutation } from '../../slices/formApi';
import debounce from 'lodash.debounce';
import { useParams } from 'react-router-dom';

const FormHeader = ({form ,setForm}) => {

    const [updateForm] = useUpdateFormMutation();
    const params = useParams();

    const debouncedUpdateFormDetails = useCallback(
        debounce((keyName, newValue) => {
            console.log("Inside debounce: ", newValue);
            updateForm({ id: params.id, [keyName]: newValue });
        }, 500),
        [updateForm, params.id]
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        const newValue = e.target.value;
        const keyName = e.target.name;
        debouncedUpdateFormDetails(keyName, newValue);
    };

    return (
        <div className='flex flex-col bg-white rounded-md shadow-md border-l-blue-500 border-l-[6px] border-t-purple-700 border-t-[12px] max-w-[800px] min-w-[800px] p-5 h-[180px]'>
            <input type="text" name='title' placeholder='Form title' value={form.title} className='text-4xl py-2 border-b-[1px] focus:border-purple-800 focus:border-b-2 outline-none' onChange={handleChange} />
            <input type="text" name='description' placeholder='Form description' value={form.description} className='text-sm pt-3 border-b-[1px] focus:border-purple-800 focus:border-b-2  outline-none' onChange={handleChange} />
        </div>
    )
}

export default FormHeader