export const PATHS = {
    LANDING: '/',
    SIGNUP: {
        INDEX: '/auth/signup/name',
        NAME: '/auth/signup/name',
        EMAIL: '/auth/signup/email',
        PASSWORD: '/auth/signup/password'
    },
    SIGNIN: '/auth/signin'
}

export const ERRORS = {
    NAME: 'First Name is required.',
    EMAIL: 'The email field is empty or the email address is invalid.',
    PASSWORD: {
        REQUIRED: 'Password is required.',
        STRONG: 'Please enter a strong password having capital and small letters, numbers and special characters.',
        MISMATCH: 'Passwords do not match.'
    }
}

export const SERVER_URL = 'http://localhost:3000'

export const TOAST_TYPES = {
    SUCCESS: 'success',
    FAILURE: 'error'
}
