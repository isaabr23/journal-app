import { db } from "../firebase/firebase-config"



export const loadNotes = async( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })       
    });

    // console.log(notes); hacemos que los datos de la bd se inserten (push) en notes = []
    return notes;
}