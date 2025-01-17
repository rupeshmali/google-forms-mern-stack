import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../utils/constants';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFormsForLoggedInUser: builder.query({
            query: () => 'forms/user',
        }),
        getForm: builder.query({
            query: (formUuid) => `response/form/${formUuid}`,
        }),
        getResponses: builder.query({
            query: (formId) => `response/form/${formId}/answers`
        }),
        saveResponse: builder.mutation({
            query: ({formId, answers}) => ({
                url: `response/form/${formId}`,
                method: 'POST',
                body: {formId, answers},
            })
        }),
        updateForm: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `forms/${id}`, 
                method: 'PATCH', 
                body: patch, 
            }),
        }),
        saveQuestion: builder.mutation({
            query: ({ formId, question }) => ({
                url: `forms/${formId}/question`,
                method: 'POST',
                body: question,
            }),
        })
    }),
});

export const { useGetFormsForLoggedInUserQuery, useGetFormQuery, useGetResponsesQuery, useSaveResponseMutation ,useUpdateFormMutation, useSaveQuestionMutation,  } = api;
