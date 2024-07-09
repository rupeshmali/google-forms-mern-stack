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
        // Define a mutation endpoint to update a form
        updateForm: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `forms/${id}`, // Specify the endpoint URL with the form ID
                method: 'PATCH', // Specify the HTTP method
                body: patch, // The body of the request, containing the updated data
            }),
        }),
    }),
});

export const { useGetFormsForLoggedInUserQuery, useUpdateFormMutation } = api;
