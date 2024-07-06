export const isValidEmail = (email) => {
    const regex = /^\S+@\S+$/;
    return regex.test(email);
}
export const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return strongRegex.test(password);
}