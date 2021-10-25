/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import {React , Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { globalUser } from '../../../Functionalities/Firebase/Controllers/Producto/Productos'

export function Buscarproducto( props ) {

    const hdlPrintGlobal = ()=>{
        console.log( 'globalU desde click en limpiar ~~', globalUser );
    }
    
    return (
        <Fragment>
            <div className="input-group">
                <div className="col-12">
                    <input onChange={(e)=>props.propsMP.setSearchKey(e.target.value)} type="text" className="form-control bg-light border-3" placeholder="Buscar..."
                            aria-label="Search" aria-describedby="basic-addon2"/>
                </div>
                <div className="input-group-append">
                    <button onClick={()=>(hdlPrintGlobal())} className="btn btn-primary float-end m-2" type="button">
                        Limpiar
                    </button>
                </div>
            </div>
        </Fragment>
    )
}
