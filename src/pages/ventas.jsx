import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';


const arregloVentasProvisional = [
    {
        id: "V001",
        producto: "Producto 1",
        nombreCliente: "Claudia Lopera Díaz",
        docCliente: "1022376354",
        fechaVenta: "03/05/2021"
    },
    {
        id: "V002",
        producto: "Producto 4",
        nombreCliente: "Adriano Mendoza Castillo",
        docCliente: "435465654",
        fechaVenta: "27/04/2021"
    },
    {
        id: "V003",
        producto: "Producto 2",
        nombreCliente: "María Clavijo Cardona",
        docCliente: "345345343",
        fechaVenta: "07/06/2021"
    },
    {
        id: "V004",
        producto: "Producto 1",
        nombreCliente: "Luz Ángela Buitrago Torres",
        docCliente: "73467643",
        fechaVenta: "18/02/2021"
    },
    {
        id: "V005",
        producto: "Producto 3",
        nombreCliente: "Natalia Cortés Calderón",
        docCliente: "1043653434",
        fechaVenta: "22/09/2021"
    },
];


const VentasPage = () => {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        setVentas(arregloVentasProvisional);
    }, [])

    return (
        <div className="styleContentSection">
            <h2 className="tableTitle">Gestión de ventas</h2>
            <p className="textTable">A continuación, se enseña el listado de ventas registradas. Para registrar un nuevo producto, pulse el botón <b>Registrar venta.</b></p>

            <TablaVentas listaVentas={ventas} />

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


const TablaVentas = ({ listaVentas }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

    useEffect(() => {
        console.log("Este es el listado de ventas", listaVentas)
    }, [listaVentas]);


    useEffect(() => {
        console.log('Búsqueda', busqueda);
        console.log('Lista de usuarios', arregloVentasProvisional);
        setVentasFiltradas(
            listaVentas.filter((elemento) => {
                console.log("Elemento", elemento);
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaVentas]);


    return (
        <>

            <section className="styleOptionsTable">
                <Link to='/ventas/ingresarVenta'>
                    <button className="buttonCreate">Registrar venta</button>
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
                    <tr className="row">
                        <th className="column narrowColumn">ID</th>
                        <th className="column">PRODUCTO</th>
                        <th className="column widthColumn">NOMBRE DEL CLIENTE</th>
                        <th className="column ">DOC. DE IDENTIDAD</th>
                        <th className="column">FECHA DE VENTA</th>
                        <th className="column iconColumn">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasFiltradas.map((venta) => {
                        return (
                            <tr key={nanoid} className="row">
                                <td className="cell">{venta.id}</td>
                                <td className="cell">{venta.producto}</td>
                                <td className="cell">{venta.nombreCliente}</td>
                                <td className="cell">{venta.docCliente}</td>
                                <td className="cell">{venta.fechaVenta}</td>
                                <td className="cell">
                                    <i className="far fa-eye detailIcon tooltip">
                                        <span className="tooltipText">Detalles</span>
                                    </i>
                                    <Link to='/ventas/editarVenta'>
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
                                            <p className="textDelete">¿Está seguro de eliminar la venta?</p>
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



export default VentasPage;