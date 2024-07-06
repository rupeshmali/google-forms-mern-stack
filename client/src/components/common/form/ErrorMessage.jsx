import React from 'react'

const ErrorMessage = ({hasError, message}) => {
    return (
        <div className='text-sm text-red-500 h-5 max-w-[450px]'>
            {hasError && <p>Error: {message}</p>}
        </div>
    )
}

export default ErrorMessage