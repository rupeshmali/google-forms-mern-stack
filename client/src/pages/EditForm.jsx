import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetFormsForLoggedInUserQuery, useGetResponsesQuery } from '../slices/formApi';
import FloatingMenu from '../components/googleform/FloatingMenu';
import Questions from '../components/googleform/Questions';
import Question from '../components/googleform/Question';
import Responses from '../components/googleform/Responses';

import FormHeader from '../components/googleform/FormHeader';
import FormMenubar from '../components/googleform/FormMenubar';

const EditForm = () => {

  const [form, setForm] = useState({});
  const [addQuestion, setAddQuestion] = useState(false);
  const [floatingMenu, setFloatingMenu] = useState(true);
  const [showResponses, setShowResponses] = useState(false);
  const params = useParams();
  const { data, error, isLoading } = useGetFormsForLoggedInUserQuery();
  const { data: resData, error: resError, isLoading: resLoading } = useGetResponsesQuery(params.id);


  useEffect(() => {
    if (!isLoading && data) {
      const currentForm = data.forms.forms.find((form) => form.form_id === Number(params.id));
      if (currentForm) {
        setForm({
          title: currentForm.form_title,
          description: currentForm.form_description,
          uuid: currentForm.form_uuid
        });
      }
    }
  }, [data, isLoading, params.id]);

  if (isLoading || resLoading) return <div>Loading...</div>;
  if (error || resError) return <div className='text-4xl text-red-600'>Error: {error.message}</div>;

  return (
    <div className='flex flex-col'>
      <FormMenubar form={form} />
      <div className='flex bg-white items-center justify-center w-screen gap-5'>
        <div className={`${!showResponses && 'border-b-[3px] border-purple-800'} border-b-[2px] border-white  hover:border-b-[3px] hover:border-purple-800 p-2 cursor-pointer text-sm`} onClick={() => setShowResponses(false)}>Questions</div>
        <div className={`${showResponses && 'border-b-[3px] border-purple-800'} flex gap-3 border-b-[2px] border-white  hover:border-b-[3px] hover:border-purple-800 p-2 cursor-pointer text-sm`} onClick={() => setShowResponses(true)}>
          Responses
          <p className='text-white bg-purple-800 px-1 rounded-xl text-sm'>
            {resData.answers?.length}
          </p>
        </div>
      </div>

      {showResponses ?
        <Responses data={resData} isLoading={resLoading} error={resError} /> :
        <div className='flex justify-center bg-purple-100 p-5 gap-5 h-svh  overflow-y-auto max-h-screen'>
          <div className='flex flex-col gap-5'>
            <FormHeader form={form} setForm={setForm} />
            <div className='flex gap-5'>
              <div>
                {addQuestion && <Question />}
              </div>
              <div>
                {addQuestion && <FloatingMenu setAddQuestion={setAddQuestion} setFloatingMenu={setFloatingMenu} icon='close' />}
              </div>
            </div>
            <Questions />
          </div>
          {
            floatingMenu && <FloatingMenu setAddQuestion={setAddQuestion} setFloatingMenu={setFloatingMenu} icon='add' />
          }
        </div>
      }

    </div>
  )
}

export default EditForm