import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InterviewSettingsState = {
    language: string;
    specialization: string;
    technology: string;
    questionCount: number | null;
}

const initialState: InterviewSettingsState = {
    language: '',
    specialization: '',
    technology: '',
    questionCount: null
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload
        },
        setSpecialization(state, action: PayloadAction<string>) {
            state.specialization = action.payload
        },
        setTechnology(state, action: PayloadAction<string>) {
            state.technology = action.payload
        },
        setQuestionCount(state, action: PayloadAction<number | null>) {
            state.questionCount = action.payload
        }
    },
});

export const { setLanguage, setSpecialization, setTechnology, setQuestionCount } = settingsSlice.actions;
export default settingsSlice.reducer;
