// Se Crean las ACCIONES
import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );

        // Le asignamos los argumentos de doc
        dispatch( activeNote( doc.id, newNote ));
        dispatch( addNewNote( doc.id, newNote ));
    }   

}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

// Agrega automaticamente la nota nueva al sidebar sin actualizar
export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

// Accion para guardar en bd cuando demos click en boton SAVE
export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        // Eliminaremos el Id por que no lo necesitamos guardar en esta seccion de la bd
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFireStore );

        dispatch( refreshNote( note.id, noteToFireStore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}

// Para actualizar la nota de la barra al guardar
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            // Carga un circulo de loading
            willOpen: () => {
                Swal.showLoading();
            } 
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );
        
        // Quita el sweetAlert2 cuando sube la imagen
        Swal.close();
    }
}

export const startDelete = ( id ) => {
    return async( dispatch, getState ) => {
        
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );
    }
} 

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})
