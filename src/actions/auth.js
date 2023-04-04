import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

// nos loguea con la bd y manda mensaje si el usuario es incorrecto 
export const startLoginEP = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
 
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ));

                dispatch(finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch(finishLoading() );

                // SweetAlert2 'Error' = Texto principal *** e.message = colocaremos el mensaje que queramos de isFormValid deRegisterScreen *** 'error' = la ventana de error 
                Swal.fire('Error', e.message, 'error');
            } )
    }
}

// Hacemos el dispatch para crear usuario y contraseña cuando estamos en REgistrar y se guarda en firebase (video 242)

export const startRegisterWithEmailPassName = ( email, password, name ) => {
    return ( dispatch ) => {

        //Tambien ya hace la autenticacion con la bd
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {
                                            // Coloca en nombre que se coloca en la caja y se lo da al displayName
                await user.updateProfile({ displayName: name });
                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            } )
    }
}


// Podemos ver uid (id de firebase) y displayName (nombre del usuario de la cuenta de google)
// en el arbol de Redux-Diff-Tree
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => { // Del arbol de la pagina
                dispatch(
                    login( user.uid, user.displayName)
                )
            });
    }
}

export const login = ( uid, displayName ) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
    });

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );   // Elimina las notas al salir de la sesion (notes= [] y active = null)
    }
}

export const logout = () => ({
    type: types.logout
})