import React, { useEffect, useState, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';
import axios from "axios";


const VentasPage = () => {
    const [ventas, setVentas] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);


    const obtenerVentas = async () => {
        const options = { method: 'GET', url: 'http://localhost:5000/ventas' };
        await axios
            .request(options)
            .then(function (response) {
                setVentas(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
        setEjecutarConsulta(false);
    };



    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerVentas();
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);


    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Registrar venta');
        } else {
            setTextoBoton('Regresar');
        }
    }, [mostrarTabla]);


    return (
        <div className="styleContentSection">

            {mostrarTabla ?
                <TablaVentas listaVentas={ventas}
                    setEjecutarConsulta={setEjecutarConsulta} /> :
                <IngresarPage
                    setMostrarTabla={setMostrarTabla}
                    listaVentas={ventas}
                    setAgregarVenta={setVentas} />
            };

            <button onClick={() => { setMostrarTabla(!mostrarTabla) }} className="buttonCreate">{textoBoton}</button>
        </div>
    );

}



const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {

    const [busqueda, setBusqueda] = useState('');
    const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

    console.log("Lista de ventas", listaVentas)
    console.log("Filtrados", ventasFiltradas)

    useEffect(() => {
        console.log("Este es el listado de ventas", listaVentas)
    }, [listaVentas]);


    useEffect(() => {
        console.log('Búsqueda', busqueda);
        setVentasFiltradas(
            listaVentas.filter((elemento) => {
                console.log("Elemento", elemento);
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());

            })
        );
        console.log("Revisión ventas fitradas", ventasFiltradas)
    }, [busqueda, listaVentas]);


    return (
        <>

            <h2 className="tableTitle">Gestión de ventas</h2>
            <p className="textTable">A continuación, se enseña el listado de ventas registradas. Para registrar una nueva venta, pulse el botón <b>Registrar venta.</b></p>

            <section className="styleOptionsTable">
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
                        <th className="column widthColumn">NOMBRE DEL CLIENTE</th>
                        <th className="column ">DOC. DE IDENTIDAD</th>
                        <th className="column">FECHA DE VENTA</th>
                        <th className="column iconColumn">OPCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    {ventasFiltradas.map((venta) => {
                        return (<FilaVenta
                            venta={venta}
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



const FilaVenta = ({ setMostrarTabla, venta, setEjecutarConsulta }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);

    console.log("Venta:", venta);


    const eliminarVenta = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/ventas/' + venta._id + '/',
            headers: { 'Content-Type': 'application/json' },
            data: { id: venta._id },
        };


        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("La venta se ha eliminado correctamente");
                setEjecutarConsulta(true);
            })

            .catch(function (error) {
                console.error("error", error);
                alert("Hubo un error al eliminar la venta");
            });
        setOpenDialog(false);
    };


    return (

        <tr className="row">
            <td className="cell">{venta.idVenta}</td>
            <td className="cell">{venta.producto}</td>
            <td className="cell">{venta.nombreCliente}</td>
            <td className="cell">{venta.docIdentidadCliente}</td>
            <td className="cell">{venta.fechaVenta}</td>
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
                        <p className="textDelete">¿Está seguro de eliminar esta venta?</p>
                    </div>
                    <div className="divButtonDialog">
                        <button
                            onClick={() => eliminarVenta()}
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


const IngresarPage = ({ setMostrarTabla, listaVentas, setAgregarVenta }) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });


        const options = {
            method: 'POST',
            url: 'http://localhost:5000/ventas',
            headers: { 'Content-Type': 'application/json' },
            data: {
                idVenta: nuevaVenta.idVenta, valorTotal: nuevaVenta.valorTotal, producto: nuevaVenta.producto,
                cantidad: nuevaVenta.cantidad, precioUnitarioProduct: nuevaVenta.precioUnitarioProduct, fechaVenta: nuevaVenta.fechaVenta,
                nombreCliente: nuevaVenta.nombreCliente, vendedor: nuevaVenta.vendedor, docIdentidadCliente: nuevaVenta.docIdentidadCliente
            }
        };


        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("La venta se ha añadido correctamente");
            })
            .catch(function (error) {
                console.error(error);
                alert("Hubo un error al guardar la venta");
            });


        setMostrarTabla(true)

    };

    return (
        <div className='fondo'>
            <section className="form-registro ">
                <form ref={form} onSubmit={submitForm}>
                    <h4>Registro de Venta</h4>
                    <input className="controls" type="number" name="idVenta" max={9999} placeholder="Identificador unico producto" required />
                    <input className="controls" type="number" name="valorTotal" placeholder="Valor Total Venta" required />
                    <select className="controls mouse" name="producto" required defaultValue={0}>
                        <option disabled value={0}>Seleccione Producto</option>
                        <option>Computador Todo en uno</option>
                        <option >Laptop</option>
                        <option >Teclado</option>
                        <option >Mouse</option>
                        <option >Disco Duro</option>
                        <option >Diadema</option>
                        <option >Usb</option>
                        <option >Parlantes</option>
                    </select>
                    <input className="controls" type="number" name="cantidad" placeholder="Cantidad" required />
                    <input className="controls" type="number" name="precioUnitarioProduct" placeholder='Precio unitario' required />
                    <input className="controls" type="date" name="fechaVenta" required />
                    <input className="controls" type="text" name="nombreCliente" placeholder='Nombre del cliente' required />
                    <input className="controls " type="number" name="docIdentidadCliente" placeholder='Doc. Identificación' required />
                    <input className="controls" type="text" name="vendedor" placeholder='Nombre del vendedor' required />
            
                    <button className="botonRegistro" type="submit">
                        Enviar 
                    </button>
                </form>
            </section>
        </div>
    );
}





export default VentasPage;
