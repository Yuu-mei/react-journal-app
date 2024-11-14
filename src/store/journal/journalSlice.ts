import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    note = action.payload;
                }
                return note;
            });
            state.messageSaved = `${action.payload.title} updated!`
        },
        setPhotosToActiveNote: (state, action) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state, action) => {
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
    }
});

export const { addNewEmptyNote, setActiveNote, setNotes, savingNewNote, updateNote, deleteNoteById, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions;