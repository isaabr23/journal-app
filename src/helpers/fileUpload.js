

// Nos ayuda para la accion de subir fotos/imagenes a cloudinary
export const fileUpload = async( file ) => {
    const cloudUrl = '	https://api.cloudinary.com/v1_1/dmh5rwaq4/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'React-Journal');
    formData.append('file', file);

    try {
        // En aswer tendremos todo lo que responda cloudinary
        const answer = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        // Si la respuesta es ok
        if ( answer.ok ) {
            const cloudResp =  await answer.json();

            // Si la carga es correcta nos retornara el url que se actualiza en farebase
            return cloudResp.secure_url;
        } else {
            throw await answer.json();
        }

    } catch (error) {
        throw error;
    }
}