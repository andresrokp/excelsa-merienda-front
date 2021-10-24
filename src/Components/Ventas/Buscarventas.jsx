/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import {React , Fragment, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export function Buscarventas( props ) {

    // const [inKey, setInKey] = useState('');
    // const hdlClean = ()=>{setInKey('')}
    // value={inKey}
    // onClick={hdlClean}
    
    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="text-end">
                        Búsqueda dinámica.
                    </div>
                    <input onChange={(e)=>props.propsMP.setSearchKey(e.target.value)} type="text" className="form-control bg-light border-3" placeholder="Buscar..."
                            aria-label="Search" aria-describedby="basic-addon2"/>
                </div>
            </div>
        </Fragment>
    )
}
