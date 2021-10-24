import React from 'react'
//import { useAuth0 } from '@auth0/auth0-react';




const Botonlogout = () => {

    //const {logout} = useAuth0()

    return (
            //<button onClick={() => logout()} type= "button" ></button>
            <Link to="https://evening-wildwood-64160.herokuapp.com">
            <button>
                <span></span> <label>Cerrar Sesión</label>
            </button>
            </Link>
    )
}

export default Botonlogout;


