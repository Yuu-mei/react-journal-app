import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, updateNote } from "./";

export const startNewNote = () => {
    //getState siempre lo tienes y te devuelve todo el state
    return async(dispatch, getState) => {
        
        dispatch(savingNewNote());
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('UID not stablished');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        // You need to remove the ID if you wish to update with firebase because it will create a new one if not
        const noteToFireStore = {...activeNote};
        delete noteToFireStore.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFireStore, {merge:true});

        dispatch(updateNote(activeNote));
    }
}

export const startUploadingFiles= (files=[]) => {
    return async(dispatch) => {
        dispatch(savingNewNote());
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        // Better than doing it with a for
        const photosURLs = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosURLs));
    }
}