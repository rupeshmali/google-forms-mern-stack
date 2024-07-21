export const PATHS = {
    LANDING: '/',
    SIGNUP: '/auth/signup/',
    SIGNIN: '/auth/signin/',
    DASHBOARD: '/forms',
    FORM: '/forms/:id',
    USER_FORM_SUBMIT: '/form/:id/submit'
}

export const ERRORS = {
    NAME: 'First Name is required.',
    EMAIL: 'The email address is invalid. Please enter a valid email.',
    PASSWORD: {
        REQUIRED: 'Password is required.',
        STRONG: 'Please enter a password with at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.',
        MISMATCH: 'Passwords do not match.'
    },
    SOMETHING_WENT_WRONG: 'Something went wrong, Please try again.'
}

export const SERVER_URL = 'http://localhost:3000'

export const TOAST_TYPES = {
    SUCCESS: 'success',
    FAILURE: 'error'
}
