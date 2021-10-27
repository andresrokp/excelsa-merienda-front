
/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React, { Fragment } from 'react'
import { actualizarDocumentoDatabase } from '../../Functionalities/Firebase/Controllers/Producto/Productos'

export const ListaRoles = ( props ) => {

    const hdlSwitch= async (elem)=>{
        let newRole = ''
        console.log(elem)
        if (elem.role === 'espera') newRole = 'vendedor';
        if (elem.role === 'vendedor') newRole = 'admin';
        if (elem.role === 'admin') newRole = 'espera';
        await actualizarDocumentoDatabase('userList', elem.dbid, {email: elem.email, role: newRole, uid: elem.uid, name: elem.name})
        props.hdlRefresh()


    }
    
    return (
        <Fragment>
            <div className="col-lg-12">
                <div className="card mb-0">
                    <div className="card-header">
                        <h3 className="h4 mb-0 text-center">Listado total Usuarios</h3>
                        <p className="text-center">NOTA: Presione el boton para cambiar el estado y el rol de un usuario</p>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table mb-0 table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>email</th>
                                        <th>Estado</th>
                                        <th>Rol</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.totalList.map((elem)=>(
                                        <tr key={elem.dbid}>
                                            <th scope="row">{elem.name}</th>
                                            <td>{elem.email}</td>
                                            <td>{elem.role === 'espera' ? 'Pendiente' : 'Autorizado'}</td>
                                            <td>{elem.role}</td>
                                            <td> 
                                                <button className="btn btn-primary" onClick={()=>hdlSwitch(elem)}>
                                                    Switch
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <th className="border-bottom-0" scope="row"></th>
                                        <td className="border-bottom-0"></td>
                                        <td className="border-bottom-0"></td>
                                        <td className="border-bottom-0"></td>
                                        <td className="border-bottom-0"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
