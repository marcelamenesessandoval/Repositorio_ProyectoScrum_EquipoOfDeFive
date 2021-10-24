import React, { useEffect, useState, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';
import axios from "axios";



const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);


    const obtenerProductos = async () => {
        const options = { method: 'GET', url: 'http://localhost:5000/productos' };
        await axios
            .request(options)
            .then(function (response) {
                setProductos(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
        setEjecutarConsulta(false);
    };



    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerProductos();
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);


    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Registrar producto');
        } else {
            setTextoBoton('Regresar');
        }
    }, [mostrarTabla]);




    return (
        <div className="styleContentSection">

            {mostrarTabla ?
                <TablaProductos listaProductos={productos}
                setEjecutarConsulta={setEjecutarConsulta} /> :
                <IngresarPage
                    setMostrarTabla={setMostrarTabla}
                    listaProductos={productos}
                    setAgregarProducto={setProductos} />
            };

            <button onClick={() => { setMostrarTabla(!mostrarTabla) }} className="buttonCreate">{textoBoton}</button>
        </div>
    );

}


const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {

    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    console.log("Lista de productos", listaProductos)
    console.log("Filtrados", productosFiltrados)

    useEffect(() => {
        console.log("Este es el listado de productos", listaProductos)
    }, [listaProductos]);

    console.log("Lista:", listaProductos);


    useEffect(() => {
        console.log('Búsqueda', busqueda);
        setProductosFiltrados(
            listaProductos.filter((elemento) => {
                console.log("Elemento", elemento);
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());

            })
        );
        console.log("Revisión productos fitrados")
    }, [busqueda, listaProductos]);



    return (
        <>

            <h2 className="tableTitle">Gestión de productos</h2>
            <p className="textTable">A continuación, se enseña el listado de productos registrados. Para registrar un nuevo producto, pulse el botón <b>Registrar producto.</b></p>

            <section className="styleOptionsTable">
                {/* <Link to="/admin/productos/ingresar">
                    <button className="buttonCreate">Registrar producto</button>
                </Link> */}
                <div className="searchInTable">
                    <label className="labelSearch" htmlFor="buscar">Buscar: </label>
                    <input
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="inputSearch" type="text" />
                </div>
            </section>

            <table className="table">
                <thead>
                    <tr className="fila">
                        <th className="column narrowColumn">ID</th>
                        <th className="column">PRODUCTO</th>
                        <th className="column widthColumn">DESCRIPCIÓN</th>
                        <th className="column iconColumn">OPCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    {productosFiltrados.map((producto) => {
                        return (<FilaProducto
                            producto={producto}
                            setEjecutarConsulta={setEjecutarConsulta}
                            key={nanoid()}
                        />
                        );
                    })}

                </tbody>
            </table>

            <section className="pager">
                <div className="numPag">
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div className="numPag">1</div>
                <div className="numPag">2</div>
                <div className="numPag">3</div>
                <div className="numPag">4</div>
                <div className="numPag">5</div>
                <div className="numPag">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </section>

        </>
    )

}


const FilaProducto = ({ setMostrarTabla, producto, setEjecutarConsulta }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);

    console.log("Producto:", producto);


    const eliminarProducto = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/productos/eliminar',
            headers: { 'Content-Type': 'application/json' },
            data: { id: producto._id },
        };


        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("El producto se ha eliminado correctamente");
                setEjecutarConsulta(true);
            })

            .catch(function (error) {
                console.error("error", error);
                alert("Hubo un error al eliminar el producto");
            });
        setOpenDialog(false);
    };

    return (

        <tr className="row">
            <td className="cell">{producto.idProduct}</td>
            <td className="cell">{producto.producto}</td>
            <td className="cell">{producto.descripcion}</td>
            <td className="cell">
                <i className="far fa-eye detailIcon tooltip">
                    <span className="tooltipText">Detalles</span>
                </i>

                <i className="far fa-edit editIcon tooltip"
                    onClick={() => setEdit(!edit)}>
                    <span className="tooltipText">Editar</span>
                </i>


                <i class="fas fa-trash-alt deleteIcon tooltip"
                    onClick={() => setOpenDialog(true)}>
                    <span className="tooltipText">Eliminar</span>
                </i>

                <Dialog fullWidth maxWidth="sm" className="dialog" open={openDialog}>
                    <h3 className="titleDialog">Confirmar eliminación</h3>
                    <div>
                        <p className="textDelete">¿Está seguro de eliminar este producto?</p>
                    </div>
                    <div className="divButtonDialog">
                        <button
                            onClick={() => eliminarProducto()}
                            className="buttonDialogDelete">Sí, eliminar
                        </button>
                        <button
                            onClick={() => setOpenDialog(false)}
                            className="buttonDialogDelete">Cancelar
                        </button>
                    </div>
                </Dialog>

            </td>
        </tr>

    )
};




const IngresarPage = ({ setMostrarTabla, listaProductos, setAgregarProducto }) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });


        const options = {
            method: 'POST',
            url: 'http://localhost:5000/productos/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: { idProduct: nuevoProducto.idProduct, producto: nuevoProducto.producto, descripcion: nuevoProducto.descripcion, valorUnitario: nuevoProducto.valorUnitario, estado: nuevoProducto.estado }
        };


        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("El producto se ha añadido correctamente");
            })
            .catch(function (error) {
                console.error(error);
                alert("Hubo un error al guardar el producto");
            });


        setMostrarTabla(true)

    };




    return (
        <div className="fondo">
            <section className="form-registro">
                <form ref={form} onSubmit={submitForm}>
                    <h4>Registro de Producto</h4>
                    <input className="controls" type="number" name="idProduct" placeholder="Identificador unico" required />
                    <input className="controls" type="text" name="producto" placeholder="Nombre del Producto" required />
                    <input className="controls descripcion" type="text" name="descripcion" placeholder="Añadir una descripcion del producto" required />
                    <input className="controls " type="number" name="valorUnitario" placeholder="Valor Unitario" required />
                    <select className="controls mouse" name="estado" defaultValue={0} required>
                        <option disabled value={0}>Estado del Producto</option>
                        <option >Disponible</option>
                        <option >No Disponible</option>
                    </select>
                    {/* Botón provisional luego agregar el alert*/}
                    <button className="botonRegistro" type="submit">
                        Enviar dos
                    </button>
                    {/* <input className="botonRegistro" type="submit" onClick={() => alert("El producto se ha añadido correctamente")} defaultValue="Enviar" /> */}
                </form>


            </section>
        </div>
    );
}




// const EditProducto = ({ producto, setMostrarTabla }) => {

//     const form = useRef(null);

//     const submitForm = async (e) => {
//         e.preventDefault();
//         const fd = new FormData(form.current);
//         const nuevoProducto = {};
//         fd.forEach((value, key) => {
//             nuevoProducto[key] = value;
//         });



//         return (
//             <div className="fondo">
//                 <section className="form-registro">
//                     <form ref={form} onSubmit={submitForm}>
//                         <h4>Editar producto</h4>
//                         <input className="controls" type="number" name="idProduct" placeholder="Identificador unico" max="9999" required defaultValue={producto.idProduct} />
//                         <input className="controls" type="text" name="producto" placeholder="Nombre del Producto" required defaultValue={producto.producto} />
//                         <input className="controls descripcion" type="text" name="descripcion" placeholder="Añadir una descripcion del producto" required defaultValue={producto.descripcion} />
//                         <input className="controls " type="number" name="valorUnitario" placeholder="Valor Unitario" required defaultValue={producto.valorUnitario} />
//                         <select className="controls mouse" name="estado" defaultValue={0} required defaultValue={producto.estado}>
//                             <option disabled value={0}>Estado del Producto</option>
//                             <option >Disponible</option>
//                             <option >No Disponible</option>
//                         </select>
//                         {/* Botón provisional luego agregar el alert*/}
//                         <button className="botonRegistro" type="submit">
//                             Enviar dos
//                         </button>
//                         {/* <input className="botonRegistro" type="submit" onClick={() => alert("El producto se ha añadido correctamente")} defaultValue="Enviar" /> */}
//                     </form>


//                 </section>
//             </div>
//         );
//     }

// }




export default ProductosPage;
