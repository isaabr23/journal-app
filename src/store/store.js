import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';    // Para acciones asincronas Middleware

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

// Para que en create stoe podamos agregar el applyMiddleware (video 236)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

// Aqui se crea el STORE pide un REDUCER como argumento pero creamos el 
// combineReducers para que se puedan incluir mas reducers en caso de que la app crezca
// Se exportara al JournalApp como informacion por medio del Provider
export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);