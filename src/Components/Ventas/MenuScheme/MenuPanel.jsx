
/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React, { Fragment } from 'react'
import { BotonModal } from './BotonModal'
import { Buscarventas } from '../Buscarventas';



export const MenuPanel = ( props ) => {
    return (
        <Fragment>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="mb-0 text-center">Gestión de ventas</h3>
                    </div>
                    <div className="card-body text-center">
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-6 col-md-3 mb-3">
                                <BotonModal btnNumber={1} btnName={"Registro Nueva Venta"} propsMP={props}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-9">
                                <Buscarventas propsMP={props}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


