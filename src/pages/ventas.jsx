import React, { useEffect, useState } from "react";

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
        <div>
            <section className="styleContentSection">

                <h2 className="tableTitle">Gestión de ventas</h2>
                <p className="textTable">A continuación, se enseña el listado de ventas registradas. Para modificar la información de ventas, pulse sobre el ícono editar.</p>
                <br />
                <p className="textTable">Para registrar un nuevo producto, pulse el botón <b>Registrar venta.</b></p>

                <section className="styleOptionsTable">
                    <button className="buttonCreate">Registrar venta</button>
                    <div className="searchInTable">
                        <label className="labelSearch" htmlFor="buscar">Buscar: </label>
                        <input className="inputSearch" type="text" />
                    </div>
                </section>

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

            </section>

        </div>
    );

}


const TablaVentas = ({ listaVentas }) => {
    useEffect(() => {
        console.log("Este es el listado de ventas", listaVentas)
    }, [listaVentas]);


    return (
        <>
            <table className="table">
                <thead>
                    <tr className="row">
                        <th className="column narrowColumn">ID</th>
                        <th className="column">PRODUCTO</th>
                        <th className="column widthColumn">NOMBRE DEL CLIENTE</th>
                        <th className="column ">DOC. DE IDENTIDAD</th>
                        <th className="column">FECHA DE VENTA</th>
                        <th className="column">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVentas.map((venta)=>{
                        return(
                            <tr className="row">
                                <td className= "cell">{venta.id}</td>
                                <td className= "cell">{venta.producto}</td>
                                <td className= "cell">{venta.nombreCliente}</td>
                                <td className= "cell">{venta.docCliente}</td>
                                <td className= "cell">{venta.fechaVenta}</td>
                                <td className= "cell">         
                                    <i className="far fa-eye detailIcon tooltip"> 
                                    <span className="tooltipText">Detalles</span>
                                    </i>
                                    <i className="far fa-edit editIcon tooltip">
                                    <span className="tooltipText">Editar</span>
                                    </i>
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