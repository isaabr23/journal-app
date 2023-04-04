// ESTE ES EL REDUCER DE LA AUTENTICACION

import { types } from "../types/types";

// El Reducer recibe dos parametros (state y action) en este caso el estate de default es un objeto vacio
export const authReducer = ( state = {}, action ) => {

    // Por lo regular se maneja siempre un switch

    switch ( action.type ) {

        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return { }
    
        default:
            // Por protocolo siempre regresamos el state en caso de que ninguno de los casos se cumpla en este caso seria un objeto vacio {}
            return state;
    }
}