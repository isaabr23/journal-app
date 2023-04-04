import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    // Para que si el id de la nota cambia si y solo si
    const activeId = useRef( note.id );

    useEffect(() => {
        
        // Solo si cambia el note.id (al dar click) se reseteara la note y se le asigna el nuevo note.id
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }
        
    }, [note, reset])

    // Podemos ver como se actualiza en Redux/state/notes/active el texto que esta en la caja
    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDelete( id ) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

               <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {    
                    (note.url)
                    && (
                        <div className="notes__image">
                            <img 
                                style={{width: 200}}
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>

                <button
                    className="btn btn-danger X"
                    onClick={ handleDelete }
                >
                    Delete
                </button>

        </div>
    )
}
