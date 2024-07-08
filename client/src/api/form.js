import { apiClient } from ".";
const prefix = '/forms'

export const create = async (payload) => apiClient.post(`${prefix}/create`, payload);

export const getByUser = async () => apiClient.get(`${prefix}/user`);