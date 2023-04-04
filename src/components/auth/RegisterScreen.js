import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPassName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    // con esto podemos obtener los valores de msgError
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Pepe',
        email: 'pepePepe@gmail.com',
        password: '123456',
        password2: '123456',
    })

    // Destructuramos
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPassName( email, password, name ) );
        }
    }

    // Se instala la libreria **npm i validator** ayuda a validar correos  y nos ahorra codigo
    const isFormValid = () => {

        if (name.trim().length === 0) {
            
            // colocamos el dispatch en en video 240
            dispatch( setError('Name Required') )
            return false;

        } else if ( !validator.isEmail( email )) { // Si email no es un Email
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false;
        }
            dispatch( removeError() );
        return  true;
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>

        {/* Condicionamos si existe msgError  mandara la alerta y el mensaje correspondiente */}
            {
                msgError &&
                (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                )
            }

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                
                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </div>
    )
}
