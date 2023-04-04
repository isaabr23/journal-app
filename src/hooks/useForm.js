
import { useState } from "react"

// El useForme recibe un objeto el cual queremos manipular
export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    // Para borrar lo introducido en la caja una vez que se agrega a la lista
    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }

    //  Nos ayuda a leerlo rapidamente (objeto)
    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }
    return [values, handleInputChange, reset];
}

// Se utiliza en LoginScreen para dejar el nombre del usuario y pass fijos (video 234)