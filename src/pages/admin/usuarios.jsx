import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';
import axios from "axios";



const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarTabla
        // , setMostrarTabla
    ] = useState(true);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    const obtenerUsuarios = async () => {
        const options = { method: 'GET', url: 'http://localhost:5000/usuarios' };
        await axios
            .request(options)
            .then(function (response) {
                setUsuarios(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
        setEjecutarConsulta(false);
    };

    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerUsuarios();
        }
    }, [ejecutarConsulta]);


    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);


    return (
        <div className="styleContentSection">

            <TablaUsuarios listaUsuarios={usuarios}
                setEjecutarConsulta={setEjecutarConsulta} />

        </div>
    );

}



const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

    console.log("Lista de usuarios", listaUsuarios)
    console.log("Filtrados", usuariosFiltrados)


    useEffect(() => {
        console.log("Este es el listado de usuarios", listaUsuarios)
    }, [listaUsuarios]);


    useEffect(() => {
        console.log('Búsqueda', busqueda);
        setUsuariosFiltrados(
            listaUsuarios.filter((elemento) => {
                console.log("Elemento", elemento);
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());

            })
        );
    }, [busqueda, listaUsuarios]);


    return (
        <>
            <h2 className="tableTitle">Gestión de usuarios</h2>
            <p className="textTable">A continuación, se enseña el listado de usuarios registrados. Para ajustar la información de usuario, ingrese al formulario de edición </p>

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
                        <th className="column widthColumn">NOMBRE USUARIO</th>
                        <th className="column">ROL</th>
                        <th className="column ">ESTADO</th>
                        <th className="column iconColumn">OPCIONES</th>
                    </tr>
                </thead>


                <tbody>
                    {usuariosFiltrados.map((usuario) => {
                        return (<FilaUsuario
                            usuario={usuario}
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



const FilaUsuario = ({ setMostrarTabla, usuario, setEjecutarConsulta }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);

    console.log("Usuario:", usuario);


    const eliminarUsuario = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/usuarios/' + usuario._id + '/',
            headers: { 'Content-Type': 'application/json' },
            data: { id: usuario._id },
        };


        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("El usuario se ha eliminado correctamente");
                setEjecutarConsulta(true);
            })

            .catch(function (error) {
                console.error("error", error);
                alert("Hubo un error al eliminar el usuario");
            });
        setOpenDialog(false);
    };

    return (
        <tr className="row">
            <td className="cell">{usuario.idUsuario}</td>
            <td className="cell">{usuario.nombreUsuario}</td>
            <td className="cell">{usuario.rol}</td>
            <td className="cell">{usuario.estadoUsuario}</td>
            <td className="cell">
                {/* <i className="far fa-eye detailIcon tooltip">
                    <span className="tooltipText">Detalles</span>
                </i> */}

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
                        <p className="textDelete">¿Está seguro de eliminar este usuario?</p>
                    </div>
                    <div className="divButtonDialog">
                        <button
                            onClick={() => eliminarUsuario()}
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


//ESTA ES LA SECCIÓN DE LA EDICIÓN AÚN NO ES SEGURO SI FUNCIONA CORRECTAMENTE, ADEMÁS FALTA DEFINIR QUÉ CAMPOS SE TRAEN DE LOGGIN

// const EditarUsuario = ({ usuario, setMostrarTabla, setEjecutarConsulta }) => {
//     const [edit, setEdit] = useState(false);
//      const [infoEditada, setInfoEditada] = useState({
        
//     // FALTA INDICAR QUÉ DATOS SE VAN A EDITAR

//      );


//     const form = useRef(null);

//     const submitForm = async (e) => {
//         e.preventDefault();
//         const fd = new FormData(form.current);
//         const nuevoUsuario = {};
//         fd.forEach((value, key) => {
//             nuevoUsuario[key] = value;
//         });

//         const options = {
//             method: 'PATCH',
//             url: 'http://localhost:5000/usuarios/' + usuario._id + '/',
//             headers: { 'Content-Type': 'application/json' },
//             data: { ...infoEditada },
//         };


//         await axios
//             .request(options)
//             .then(function (response) {
//                 console.log(response.data);
//                 alert("El usuario se ha actualizado correctamente");
//                 setEdit(false);
//                 setEjecutarConsulta(true);
//             })
//             .catch(function (error) {
//                 alert("Hubo un error al actualizar el usuario");
//                 console.error(error);
//             });


//         setMostrarTabla(true)

//     };


//     return (
//         <div className="fondo">
//             <section className="form-registro">

//                 <form ref={form} onSubmit={submitForm}>
//                     <h4>Editar usuario</h4>

//                 //FALTA INDICAR QUÉ CAMPOS SE VAN A EDITAR PUES ALGUNOS SUPONGO QUE SE TRAEN DEL AUTH0 

//                     <button className="botonRegistro" type="submit">
//                         Enviar
//                     </button>
//                 </form>

//             </section>
//         </div>
//     );
// }





export default UsuariosPage;



