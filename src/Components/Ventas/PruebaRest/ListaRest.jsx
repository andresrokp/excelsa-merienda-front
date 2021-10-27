
/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React, { Fragment } from 'react'

export const ListaRest = ( {...props} ) => {

    console.log('Props de listaRest ~~',props);
    
    return (
        <Fragment>
            <div className="col-lg-12">
                <div className="card mb-0">
                    <div className="card-header">
                        <h3 className="h6 mb-0 text-center">ATENCIÖN: con las cantidades. Al agregar, se <strong>agrega de uno en uno</strong>. Al Quitar, se <strong>eliminan todas las repeticiones</strong> a la vez.</h3>
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
                                        <th> . </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.totalList.map((elem,index)=>(
                                        <tr key={elem.dbid+index}>
                                            <th scope="row">{elem.id}</th>
                                            <td>{elem.descripcion}</td>
                                            <td>{elem.valor}</td>
                                            <td>{elem.estado ? "SI" : "NO"}</td>
                                            <td> <button className="btn btn-primary" onClick={()=>(props.hdlAddOne(elem.dbid))}>
                                                +Add</button>
                                                {props.isCarrito ? <button className="btn btn-danger" onClick={()=>(props.hdlDeleteOne(elem.dbid))}>
                                                -Del</button> : null}
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
