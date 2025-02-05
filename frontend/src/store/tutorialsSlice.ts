import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tutorial {
    id: string;
    title: string;
    content: string;
}

/**
 * Represents the state of tutorials in the application.
 * 
 * @interface TutorialsState
 * @property {Tutorial[]} tutorials - An array of tutorials.
 * @property {boolean} loading - Indicates whether the tutorials are currently being loaded.
 * @property {string | null} error - Stores any error message if an error occurs, otherwise null.
 */
interface TutorialsState {
    tutorials: Tutorial[];
    loading: boolean;
    error: string | null;
}

const initialState: TutorialsState = {
    tutorials: [],
    loading: false,
    error: null,
};

const tutorialsSlice = createSlice({
    name: 'tutorials',
    initialState,
    reducers: {
        fetchTutorialsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTutorialsSuccess(state, action: PayloadAction<Tutorial[]>) {
            state.tutorials = action.payload;
            state.loading = false;
        },
        fetchTutorialsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addTutorial(state, action: PayloadAction<Tutorial>) {
            state.tutorials.push(action.payload);
        },
        updateTutorial(state, action: PayloadAction<Tutorial>) {
            const index = state.tutorials.findIndex(tutorial => tutorial.id === action.payload.id);
            if (index !== -1) {
                state.tutorials[index] = action.payload;
            }
        },
        deleteTutorial(state, action: PayloadAction<string>) {
            state.tutorials = state.tutorials.filter(tutorial => tutorial.id !== action.payload);
        },
    },
});

export const {
    fetchTutorialsStart,
    fetchTutorialsSuccess,
    fetchTutorialsFailure,
    addTutorial,
    updateTutorial,
    deleteTutorial,
} = tutorialsSlice.actions;

export default tutorialsSlice.reducer;