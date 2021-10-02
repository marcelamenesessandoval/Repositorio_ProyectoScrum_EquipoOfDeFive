import React from 'react'

const IngresarPage = () => {
    return (
        
            <section className="form-registro">
                <form>
                    <h4>Registro de Productos</h4>
                    <input className="controls" type="number" name="ID (Inmutable)" placeholder="Identificador unico" max="9999" required />
                    <input className="controls" type="text" name="Nombre Producto" placeholder="Nombre del Producto" required />
                    <input className="controls descripcion" type="text" name="Descripcion" placeholder="Añadir una descripcion del producto" required />
                    <input className="controls " type="number" name="Valor Unitario" placeholder="Valor Unitario" required />
                    <select className="controls mouse" required  >
                        <option selected disabled hidden>Estado del Producto</option>
                        <option >Disponible</option>
                        <option >No Disponible</option>
                    </select>
                    <input className="boton" type="submit" value="Añadir Producto" />

                </form>



            </section>
        
    );
}

export default IngresarPage;
