import { apiClient } from ".";

const prefix = '/auth';

export const signup = async (payload) =>  apiClient.post(`${prefix}/sign-up`, payload);


export const signin = async (payload) =>  apiClient.post(`${prefix}/sign-in`, payload);
