import {Link} from 'react-router-dom'
import React from 'react';
  
const BotonSB = {
  width: '200px',
  margin: '30px 25px',
  textAlign: 'center',
  background: '#009688',
};

const BotonSidebar = () => {
  return (
    <div>
      <Link to='/nuevaventa'>
        <button type= "button" style={BotonSB}><span></span>"Registrar Venta"</button>
      </Link>
      <Link to='/ventas'>
        <button type= "button" style={BotonSB}><span></span>"Gestionar Ventas"</button>
      </Link>
      <Link to='/admin/productos'>
        <button type= "button" style={BotonSB}><span></span>"Gestionar Productos"</button>
      </Link>
      <Link to='/admin/usuarios'>
        <button type= "button" style={BotonSB}><span></span>"Gestionar usuarios"</button>
      </Link>
      <Link to='/'>
        <button type= "button" style={BotonSB}><span></span>"Salir"</button>
      </Link>
    </div>
  )
};
  
  export default BotonSidebar;