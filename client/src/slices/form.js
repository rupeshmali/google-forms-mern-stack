import { createSlice } from "@reduxjs/toolkit"
import { getByUser } from "../api/form"

const initialState = {
    forms: []
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForms: async (state, action) => {
            
        },
        requestForms: async (state, action) => {
                // const { data } = await getByUser();
                // // state.jobs = [...state.jobs, ...action.payload]
                // state.forms = [...state.forms, ...data.forms]
            console.log("forms state: ", state);
        } 
    }
})

export const { setForms, requestForms } = formSlice.actions
export const formReducer = formSlice.reducer