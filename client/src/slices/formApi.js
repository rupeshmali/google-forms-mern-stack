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
    }),
});

export const { useGetFormsForLoggedInUserQuery } = api;
