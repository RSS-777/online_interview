import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeState = {
    language: string;
    profession: string;
    category: string;
    quantity: number | null;
}

const initialState: TypeState = {
    language: '',
    profession: '',
    category: '',
    quantity: null
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
        },
        setQuantityQuestion(state, action: PayloadAction<number | null>) {
            state.quantity = action.payload
        }
    },
});

export const { setLanguage, setProfession, setCategory, setQuantityQuestion } = settingsSlice.actions;
export default settingsSlice.reducer;