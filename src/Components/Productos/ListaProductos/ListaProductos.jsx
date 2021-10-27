
/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React, { Fragment } from 'react'
import { eliminarDocumentoDatabase } from '../../../Functionalities/Firebase/Controllers/Producto/Productos';
import { BotonModal } from '../MenuProductos/BotonModal';

export const ListaProductos = ( props ) => {

    const hdlDeleteProducto = async ( dbid ) => {
        await eliminarDocumentoDatabase('productos', dbid );
        props.hdlAddListDB();
    }
    
    return (
        <Fragment>
            <div className="col-lg-12">
                <div className="card mb-0">
                    <div className="card-header">
                        <h3 className="h4 mb-0 text-center">Listado total de productos</h3>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table mb-0 table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Descripción</th>
                                        <th>Valor Unitario</th>
                                        <th>Disponible</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.totalList.map((elem)=>(
                                        <tr key={elem.id}>
                                            <th scope="row">{elem.id}</th>
                                            <td>{elem.descripcion}</td>
                                            <td>{elem.valor}</td>
                                            <td>{elem.estado ? "SI" : "NO"}</td>
                                            <td>
                                                <BotonModal btnName={'Editar'} btnNumber={2} curElem={elem} propsLP={props}/>
                                                <button onClick={()=>(hdlDeleteProducto(elem.dbid))} className="btn btn-danger" type="button">
                                                    Quitar</button>
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
