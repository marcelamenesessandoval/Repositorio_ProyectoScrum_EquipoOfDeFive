
import {Link} from 'react-router-dom'
import React from 'react'
  
  const BotonMain = ({Tipo}) => {
    return (
    <>
      <Link to='/registro'>
        <button type= "button"><span></span>Registrate</button>
      </Link>
      <Link to='/login'>
        <button type= "button"><span></span>Login</button>
      </Link>
      <Link to='/admin'>
        <button type= "button"><span></span>Admin</button>
      </Link>
    </>
  
    )
  };
  
  export default BotonMain;