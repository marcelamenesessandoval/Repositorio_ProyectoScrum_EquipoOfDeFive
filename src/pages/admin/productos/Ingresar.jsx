import React from 'react'

const IngresarPage = () => {
    return (
        <div className="fondo">
        <section className="form-registro">
                <form>
                    <h4>Registro de Producto</h4>
                    <input className="controls" type="number" name="ID (Inmutable)" placeholder="Identificador unico" max="9999" required />
                    <input className="controls" type="text" name="Nombre Producto" placeholder="Nombre del Producto" required />
                    <input className="controls descripcion" type="text" name="Descripcion" placeholder="Añadir una descripcion del producto" required />
                    <input className="controls " type="number" name="Valor Unitario" placeholder="Valor Unitario" required />
                    <select className="controls mouse" required defaultValue={0}  >
                        <option  disabled value={0} >Estado del Producto</option>
                        <option >Disponible</option>
                        <option >No Disponible</option>
                    </select>
                     <input className="botonRegistro" type="submit" onClick={()=>alert("El producto se ha añadido correctamente")} defaultValue="Añadir Producto" />

                </form>



            </section>
            </div>
    );
}

export default IngresarPage;
