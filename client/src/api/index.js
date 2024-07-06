import axios from 'axios'
import { SERVER_URL } from '../utils/constants'
export const apiClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})