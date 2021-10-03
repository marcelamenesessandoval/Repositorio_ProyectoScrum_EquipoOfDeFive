import React from 'react'
import { Link } from 'react-router-dom';

const UsuariosPage = () => {
    return <div>Esta es la pagina para GESTION DE USUARIOS en el aplicativo web.
        <Link to='/admin/usuarios/editarUsuario'> <input type="submit" value='Editar Usuario' /> </Link>
    </div>;
};

export default UsuariosPage;