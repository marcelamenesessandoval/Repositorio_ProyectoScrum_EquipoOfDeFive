import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div className='backgroundTables'>
            <section className="styleContentSection">

                <h2 className="tableTitle">Gestión de productos</h2>
                <p className="textTable">A continuación, se enseña el listado de productos registrados. Para modificar la información de productos, pulse sobre el ícono editar.</p>
                <br />
                <p className="textTable">Para registrar un nuevo producto, pulse el botón <b>Registrar producto.</b></p>

                <section className="styleOptionsTable">
                    <Link to="/admin/productos/ingresar">
                        <button className="buttonCreate">Registrar producto</button>
                    </Link>
                    <div className="searchInTable">
                        <label className="labelSearch" htmlFor="buscar">Buscar: </label>
                        <input className="inputSearch" type="text" />
                    </div>
                </section>

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

            </section>

        </div>
    );

}


const TablaProductos = ({ listaProductos }) => {
    useEffect(() => {
        console.log("Este es el listado de productos", listaProductos)
    }, [listaProductos]);

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="fila">
                        <th className="column narrowColumn">ID</th>
                        <th className="column">PRODUCTO</th>
                        <th className="column widthColumn">DESCRIPCIÓN</th>
                        <th className="column">OPCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    {listaProductos.map((producto) => {
                        return (
                            <tr className="row">
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