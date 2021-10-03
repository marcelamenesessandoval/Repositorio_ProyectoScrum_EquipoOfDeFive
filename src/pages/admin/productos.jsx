import React from 'react'
import { Link } from 'react-router-dom';

const ProductosPage = () => {
    return <div>Esta es la pagina para GESTION DE PRODUCTOS en el aplicativo web 2.0
               <Link to='productos/ingresar'> <input type="submit" value='añadir producto' /> </Link>
               <Link to='productos/editar'> <input type="submit" value='Editar producto' /> </Link>
               
    </div>;
};

export default ProductosPage;