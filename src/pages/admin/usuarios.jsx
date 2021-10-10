import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';


const arregloUsuariosProvisional = [
    {
        id: "U001",
        nombre: "Sandra Sarmiento",
        rol: "Vendedor",
        estado: "Pendiente",
    },
    {
        id: "U002",
        nombre: "Milena López Hernández",
        rol: "Administrador",
        estado: "Autorizado",
    },
    {
        id: "U003",
        nombre: "Carlos Alberto Montoya",
        rol: "Vendedor",
        estado: "No autorizado",
    },
    {
        id: "U004",
        nombre: "Julián Sepúlveda",
        rol: "Vendedor",
        estado: "Autorizado",
    },
    {
        id: "U005",
        nombre: "Nicolás León Díaz",
        rol: "Administrador",
        estado: "Autorizado",
    }
];



const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setUsuarios(arregloUsuariosProvisional);
    }, [])

    return (
        <div className="styleContentSection">

            <h2 className="tableTitle">Gestión de usuarios</h2>
            <p className="textTable">A continuación, se enseña el listado de usuarios registrados.</p>

            <TablaUsuarios listaUsuarios={usuarios} />

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


const TablaUsuarios = ({ listaUsuarios }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [usuariosFiltrados, setUsariosFiltrados] = useState(listaUsuarios);


    useEffect(() => {
        console.log("Este es el listado de usuarios", listaUsuarios)
    }, [listaUsuarios]);


    useEffect(() => {
        console.log('Búsqueda', busqueda);
        console.log('Lista de usuarios', arregloUsuariosProvisional);
        setUsariosFiltrados(
            listaUsuarios.filter((elemento) => {
                console.log("Elemento", elemento);
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaUsuarios]);


    return (
        <>

            <section className="styleOptionsTable">
                <div className="searchInTableUser">
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
                        <th className="column widthColumn">NOMBRE USUARIO</th>
                        <th className="column">ROL</th>
                        <th className="column ">ESTADO</th>
                        <th className="column iconColumn">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario) => {
                        return (
                            <tr key={nanoid} className="row">
                                <td className="cell">{usuario.id}</td>
                                <td className="cell">{usuario.nombre}</td>
                                <td className="cell">{usuario.rol}</td>
                                <td className="cell">{usuario.estado}</td>
                                <td className="cell">
                                    <i className="far fa-eye detailIcon tooltip">
                                        <span className="tooltipText">Detalles</span>
                                    </i>
                                    <Link to='/admin/usuarios/editarUsuario'>
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
                                            <p className="textDelete">¿Está seguro de eliminar el usuario?</p>
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


export default UsuariosPage;