import React from 'react'

function EditarUsuario() {
    return (
        <section className="form-registro ">
            <form>
                <h4>Editar usuario</h4>
                <input className="controls" type="text" name="Nombre" defaultValue="Andres" required  disabled/>
                <input className="controls" type="email" name="E-mail" defaultValue="andresMartinez@gmail.com" required disabled />
                <select className="controls mouse" required>
                    <option disabled hidden>Rol del Usuario</option>
                    <option selected>Administrador</option>
                    <option>Vendedor</option>
                </select>
                <select className="controls mouse" required>
                    <option disabled hidden>Estado del Usuario</option>
                    <option selected>Pendiente</option>
                    <option>Autorizado</option>
                    <option>No Autorizado</option>
                </select>
                <input className="boton" type="button" onClick={()=>alert("El Usuario se ha editado correctamente")} defaultValue="Editar Producto" />
                
            </form>
        </section>
    )
}

export default EditarUsuario;
