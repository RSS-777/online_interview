import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeState = {
    language: string;
    profession: string;
    category: string;
}

const initialState: TypeState = {
    language: '',
    profession: '',
    category: ''
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload
        },
        setProfession(state, action: PayloadAction<string>) {
            state.profession = action.payload
        },
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        }
    },
});

export const { setLanguage, setProfession, setCategory } = settingsSlice.actions;
export default settingsSlice.reducer;