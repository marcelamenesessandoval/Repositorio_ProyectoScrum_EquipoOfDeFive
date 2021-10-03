import React, { useEffect, useState } from "react";

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
        <div>
            <section className="styleContentSection">

                <h2 className="tableTitle">Gestión de usuarios</h2>
                <p className="textTable">A continuación, se enseña el listado de usuarios registrados. Para modificar la información de usuarios, pulse sobre el ícono editar.</p>
            
                <section className="styleOptionsTable">
                    <div className="searchInTableUser">
                        <label className="labelSearch" htmlFor="buscar">Buscar: </label>
                        <input className="inputSearch" type="text" />
                    </div>
                </section>
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

            </section>

        </div>
    );

}


const TablaUsuarios = ({ listaUsuarios }) => {
    useEffect(() => {
        console.log("Este es el listado de usuarios", listaUsuarios)
    }, [listaUsuarios]);

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="fila">
                        <th className="column narrowColumn">ID</th>
                        <th className="column widthColumn">NOMBRE USUARIO</th>
                        <th className="column">ROL</th>
                        <th className="column ">ESTADO</th>
                        <th className="column">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((usuario)=>{
                        return(
                            <tr className="row">
                                <td className= "cell">{usuario.id}</td>
                                <td className= "cell">{usuario.nombre}</td>
                                <td className= "cell">{usuario.rol}</td>
                                <td className= "cell">{usuario.estado}</td>
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


export default UsuariosPage;