import React from 'react'

const EditarPage = () => {
    return (
        <div className='fondo'>
        <section className="form-registro ">
            <form>
                <h4>Edicion de Productos</h4>
                <input className="controls" type="number" name="ID (Inmutable)" defaultValue= "0000" max={9999} disabled />
                <input className="controls" type="text" name="Nombre Producto" defaultValue="Disco duro" required />
                <input className="controls descripcion" type="text" name="Descripcion" defaultValue="Seagate Exos X18 16TB Enterprise HDD " required />
                <input className="controls " type="number" name="Valor Unitario" defaultValue="50.000" required />
                <select className="controls mouse" required defaultValue={0}>
                    <option disabled >Estado del Producto</option>
                    <option>Disponible</option>
                    <option value={0}>No Disponible</option>
                </select>
                <input className="botonRegistro" type="button" onClick={()=>alert("El producto se ha editado correctamente")} defaultValue="Editar Producto" />
                
            </form>
        </section>
        </div>

    );
}

export default EditarPage;
