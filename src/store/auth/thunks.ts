import { deleteDoc, doc } from 'firebase/firestore/lite';
import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from './../../firebase';
import { checkingCredentials, login, logout } from "./";
import { clearNotesLogout, deleteNoteById } from '../journal';
import { firebaseDB } from '../../firebase/config';

export const checkingAuthentication = (email:string, password:string) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}));
        dispatch(login({uid, displayName, email, photoURL}));
    }
}

export const startLoginWithEmailPassword = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({email, password});

        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({uid, displayName, email, photoURL}));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;  
        const {activeNote} = getState().journal;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));
    }
}