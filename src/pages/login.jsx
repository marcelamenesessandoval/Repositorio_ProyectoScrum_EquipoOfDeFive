import React from 'react';

const LoginPage = () => {
    return <div>
        <div className = "login-box">
          
          <h1>Iniciar sesion</h1>
        <form>
        <label for="Username">Ingrese el correo</label>
        <input type="email" placeholder="abc@gmail.com"></input>

        <label for="Password">Contraseña</label>
        <input type="password" placeholder="contraseña"></input>

        <input type="submit" value="Ingresar"></input>

        <p>Olvido su Contraseña</p>
        <br></br>
        <p>¿No tienes una cuenta?</p>


        </form>

        </div>
      
    </div>
    
};

export default LoginPage;