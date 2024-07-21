import { createContext, useEffect, useState } from "react";
import { getMe, signin, signup } from "../api/auth";
import { isAxiosError } from "axios";
import Toast from "../components/common/Toast";
import { ERRORS, PATHS, TOAST_TYPES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [form, setForm] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email:'',
    //     password:''
    // })
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('')
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleToast = (type, message) => {
        console.log("message: ", message);

        setToastType(type)
        setToastMessage(message)
        console.log("toastMessage: ", toastMessage);
        setTimeout(() => {
            setToastMessage('');
        }, 5000)
    }

    const handleSignUp = async () => {
        try {
            if (firstName === '' || email === '' || password === '') {
                handleToast(TOAST_TYPES.FAILURE, ERRORS.SOMETHING_WENT_WRONG)
                return
            }
            const payload = {
                firstName,
                lastName,
                email,
                password
            }
            const { data } = await signup(payload)
            handleToast(TOAST_TYPES.SUCCESS, data.message);
            navigate(PATHS.SIGNIN.INDEX)
        } catch (error) {
            console.log('Came inside catch block of signUp', error.message);
            if (isAxiosError(error)) {
                handleToast(TOAST_TYPES.FAILURE, ERRORS.SOMETHING_WENT_WRONG)
            } else {
                handleToast(TOAST_TYPES.FAILURE, ERRORS.SOMETHING_WENT_WRONG)
            }
        }
    }

    const handleSignIn = async (email, password) => {
        try {
            if (email === '' || password === '') {
                handleToast(TOAST_TYPES.FAILURE, ERRORS.SOMETHING_WENT_WRONG)
                return
            }
            const payload = {
                email,
                password
            }
            const { data } = await signin(payload);
            localStorage.setItem('token', data.token)
            handleToast(TOAST_TYPES.SUCCESS, data.message);
            setCurrentUser(data.user)
            // navigate(PATHS.DASHBOARD)
            window.location.href = window.location.origin + PATHS.DASHBOARD;
        } catch (error) {
            if (isAxiosError(error)) {
                handleToast(TOAST_TYPES.FAILURE, ERRORS.SOMETHING_WENT_WRONG)
            } else {
                handleToast(TOAST_TYPES.FAILURE, ERRORS.SOMETHING_WENT_WRONG)
            }
        }
    }
    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = window.location.origin + PATHS.SIGNIN.INDEX;
    }
    const handleAuth = async () => {
        try {
            const item =   localStorage.getItem('token')
            const { data } = await getMe();
            setCurrentUser(data.user)
        } catch (error) {
            localStorage.removeItem('token')
        }
        setLoading(false);
    }
    const values = {
        firstName,
        lastName,
        // email,
        // password,
        currentUser,
        setFirstName,
        setLastName,
        // setEmail,
        // setPassword,
        handleSignUp,
        handleSignIn,
        handleSignOut
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            setLoading(false);
            return;
        }
        handleAuth();
    }, [])
    if (loading) {
        return <div className="h-screen flex items-center justify-center">
            Loading...
        </div>
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