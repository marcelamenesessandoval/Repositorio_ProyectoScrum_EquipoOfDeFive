import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';



const arregloProductosProvisional = [
    {
        id: "p001",
        producto: "Producto 1",
        descripcion: "Producto con características de prueba.",
    },
    {
        id: "p002",
        producto: "Producto 2",
        descripcion: "Producto con características de prueba.",
    },
    {
        id: "p003",
        producto: "Producto 3",
        descripcion: "Producto con características de prueba.",
    },
    {
        id: "p004",
        producto: "Producto 4",
        descripcion: "Producto con características de prueba.",
    },
    {
        id: "p005",
        producto: "Producto 3",
        descripcion: "Producto con características de prueba.",
    }
];



const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(arregloProductosProvisional);
    }, [])

    return (
        <div className="styleContentSection">

            <h2 className="tableTitle">Gestión de productos</h2>
            <p className="textTable">A continuación, se enseña el listado de productos registrados. Para registrar un nuevo producto, pulse el botón <b>Registrar producto.</b></p>

            <TablaProductos listaProductos={productos} />

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
        </div>
    );

}


const TablaProductos = ({ listaProductos }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    useEffect(() => {
        console.log("Este es el listado de productos", listaProductos)
    }, [listaProductos]);



    useEffect(() => {
        console.log('Búsqueda', busqueda);
        console.log('Lista de productos', arregloProductosProvisional);
        setProductosFiltrados(
            listaProductos.filter((elemento) => {
                console.log("Elemento", elemento);
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaProductos]);



    return (
        <>
            <section className="styleOptionsTable">
                <Link to="/admin/productos/ingresar">
                    <button className="buttonCreate">Registrar producto</button>
                </Link>
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
                        return (
                            <tr key={nanoid} className="row">
                                <td className="cell">{producto.id}</td>
                                <td className="cell">{producto.producto}</td>
                                <td className="cell">{producto.descripcion}</td>
                                <td className="cell">
                                    <i className="far fa-eye detailIcon tooltip">
                                        <span className="tooltipText">Detalles</span>
                                    </i>
                                    <Link to="/admin/productos/editar">
                                        <i className="far fa-edit editIcon tooltip">
                                            <span className="tooltipText">Editar</span>
                                        </i>
                                    </Link>


                                    <i class="fas fa-trash-alt deleteIcon tooltip"
                                        onClick={() => setOpenDialog(true)}>
                                        <span className="tooltipText">Eliminar</span>
                                    </i>

                                    <Dialog fullWidth maxWidth="sm" className="dialog" open={openDialog}>
                                        <h3 className="titleDialog">Confirmar eliminación</h3>
                                        <div>
                                            <p className="textDelete">¿Está seguro de eliminar el producto?</p>
                                        </div>
                                        <div className="divButtonDialog">
                                            <button className="buttonDialogDelete">Sí, eliminar</button>
                                            <button
                                                onClick={() => setOpenDialog(false)}
                                                className="buttonDialogDelete">Cancelar</button>
                                        </div>
                                    </Dialog>

                                </td>
                            </tr>

                        );
                    })}

                </tbody>
            </table>

        </>
    )

}


export default ProductosPage;