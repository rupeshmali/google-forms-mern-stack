import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFormsForLoggedInUserQuery, useUpdateFormMutation } from '../slices/formApi';
import debounce from 'lodash.debounce'
import FloatingMenu from '../components/googleform/FloatingMenu';
import Questions from '../components/googleform/Questions';
import Question from '../components/googleform/Question';

const EditForm = () => {

  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [addQuestion, setAddQuestion] = useState(false);
  const [floatingMenu, setFloatingMenu] = useState(true);
  const { data, error, isLoading } = useGetFormsForLoggedInUserQuery();
  const [updateForm] = useUpdateFormMutation();
  const params = useParams();

  useEffect(() => {
    if (!isLoading && data) {
      const currentForm = data.forms.forms.find((form) => Number(form.form_id) === Number(params.id));
      if (currentForm) {
        setFormTitle(currentForm.form_title);
        setFormDescription(currentForm.form_description);
      }
    }
  }, [data, isLoading, params.id]);

  const debouncedUpdateFormTitle = useCallback(
    debounce((newTitle) => {
      console.log("Inside debounce: ", newTitle);
      updateForm({ id: params.id, form_title: newTitle });
    }, 500),
    [updateForm, params.id]
  );
  const debouncedUpdateFormDescription = useCallback(
    debounce((newDescription) => {
      console.log("Inside debounce: ", newDescription);
      updateForm({ id: params.id, form_description: newDescription });
    }, 500),
    [updateForm, params.id]
  );
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    debouncedUpdateFormTitle(newTitle);
  };
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setFormDescription(newDescription);
    debouncedUpdateFormDescription(newDescription);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;

  return (
    <div className='flex justify-center bg-purple-100 p-5 gap-5 h-svh  overflow-y-auto max-h-screen'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col bg-white rounded-md shadow-md border-l-blue-500 border-l-[6px] border-t-purple-700 border-t-[12px] min-w-[800px] p-5 h-[180px]'>
          <input type="text" placeholder='Form title' value={formTitle} className='text-4xl py-2 border-b-[1px] focus:border-black outline-none' onChange={handleTitleChange} />
          <input type="text" placeholder='Form description' value={formDescription} className='text-sm pt-3 border-b-[1px] focus:border-black outline-none' onChange={handleDescriptionChange} />
        </div>
        {addQuestion && <Question />}
        {<Questions />}
      </div>
      {
        floatingMenu &&  <FloatingMenu setAddQuestion={setAddQuestion} setFloatingMenu={setFloatingMenu}/>
      } 
    </div>
  )
}

export default EditForm