
import { useAuth0 } from "@auth0/auth0-react";
import React from 'react'


const BotonMain = ({ Tipo }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
        <button onClick={() => loginWithRedirect()}><span></span>Ingresar</button>
      
    </>

  )
};


export default BotonMain;