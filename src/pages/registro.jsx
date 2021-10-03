import React from 'react';

const RegistroPage = () => {
    return <div>
        <div className = "registro">

    <h1> Registro usuarios</h1>
    
    <form>
        <label for="Username">Ingrese su correo electronico</label>
        <input type="email"/>
    
        <label for="Nombres">Ingrese sus nombres </label>
        <input type="text" />
    
        <label for="Apellidos">Ingrese sus apellidos </label>
        <input type="text"/>
    
        <label for="password">Ingrese su Contraseña</label>
        <input type="password" />
        
        
    
        <input type="submit" value="Registrarse"/>
    
    
        <p>Ya tienes una cuenta</p>
    
    </form>
    </div>
    </div>;
};

export default RegistroPage;