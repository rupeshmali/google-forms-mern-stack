import { createContext, useState } from "react";
import { signup } from "../api/auth";
import { isAxiosError } from "axios";
import Toast from "../components/common/Toast";
import { PATHS, TOAST_TYPES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('')

    const navigate = useNavigate();

    const handleToast = (type, message) => {
        setToastType(type)
        setToastMessage(message)
        setTimeout(() => {
            setToastMessage('');
        }, 5000)
    }

    const handleSignUp = async () => {
        try {
            if (firstName === '' || email === '' || password === '') {
                handleToast(TOAST_TYPES.FAILURE, 'Something went wrong. Please try again.')
                return
            }
            const payload = {
                firstName,
                lastName,
                email,
                password
            }
            const { data } = await signup(payload)
            if (data.success) {
                handleToast(TOAST_TYPES.SUCCESS, data.message);
            }
            navigate(PATHS.SIGNIN)
        } catch (error) {
            if (isAxiosError(error)) {
                handleToast(TOAST_TYPES.FAILURE, 'Something went wrong. Please try again.')
            } else {
                handleToast(TOAST_TYPES.FAILURE, 'Something went wrong. Please try again.')
            }
        }
    }

    const values = {
        firstName,
        lastName,
        email,
        password,
        setFirstName,
        setLastName,
        setEmail,
        setPassword,
        handleSignUp
    }

    return (
        <AuthContext.Provider value={values}>
            {
                (toastMessage !== '') && (
                    <Toast type={toastType} message={toastMessage} />
                )
            }
            {children}
        </AuthContext.Provider>
    )
}