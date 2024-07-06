export const PATHS = {
    LANDING: '/',
    SIGNUP: {
        INDEX: '/auth/signup/name',
        NAME: '/auth/signup/name',
        EMAIL: '/auth/signup/email',
        PASSWORD: '/auth/signup/password'
    },
    SIGNIN: {
        INDEX: '/auth/signin/email',
        PASSWORD: '/auth/signin/password'
    },
    DASHBOARD: '/forms'
}

export const ERRORS = {
    NAME: 'First Name is required.',
    EMAIL: 'The email address is invalid. Please enter a valid email.',
    PASSWORD: {
        REQUIRED: 'Password is required.',
        STRONG: 'Please enter a password having capital and small letters, numbers and special characters.',
        MISMATCH: 'Passwords do not match.'
    },
    SOMETHING_WENT_WRONG: ''
}

export const SERVER_URL = 'http://localhost:3000'

export const TOAST_TYPES = {
    SUCCESS: 'success',
    FAILURE: 'error'
}
