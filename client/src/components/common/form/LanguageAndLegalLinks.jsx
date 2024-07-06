import React from 'react'

const LanguageAndLegalLinks = () => {
    return (
        <div className='flex justify-between'>
            <select name="" id="" className='text-xs bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md'>
                <option value={'English (United States)'}>English (United States)</option>
            </select>
            <div className='flex gap-2'>
                <p className='text-xs bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md'>Help</p>
                <p className='text-xs bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md'>Privacy</p>
                <p className='text-xs bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md'>Terms</p>
            </div>
        </div>
    )
}

export default LanguageAndLegalLinks