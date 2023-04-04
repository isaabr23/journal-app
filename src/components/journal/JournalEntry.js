import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const JournalEntry = ({ id, date, title, body, url }) => {

    // Instalamos npm install moment --savede https://momentjs.com/ para poder manipular mejor el formato de hora
    const noteDate = moment(date);
    const dispatch = useDispatch();

    // Al dar click en cualquier Nota ya establecida se mostrara en la pantalla principal con su contenido
    const handleEntryClick = () => {
        dispatch(
            activeNote( id, {
                date, title, body, url
            })
        );
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">

                {/* .format('dddd') lo sacamoa de la pagina momentjs.com y como resultado tenemos *el dia de la semana (Monday)* */}
                <span>{ noteDate.format('dddd') }</span>
                {/* .format('dddd') lo sacamoa de la pagina momentjs.com y como resultado tenemos *el numero del dia (29th)* */}
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
