/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import {React , Fragment, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { customAlphabet } from 'nanoid'

import { actualizarDocumentoDatabase, guardarDatabase } from '../../../Functionalities/Firebase/Controllers/Producto/Productos'
import AlertAndres from '../MenuProductos/AlertAndres'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export function Registrarproducto( props ) {

    console.log(props);
    const { isCreate } = props;
    const nanoidCA = customAlphabet('0123456789JHKQ', 6)
    let hdlAddListDBx;
    let myElement = {}
    let myDbid = '';
    
    if (isCreate) {
        myElement = {id: nanoidCA(), descripcion:'', valor:'', estado:null};
        hdlAddListDBx = () => {props.propsMM.propsBM.propsMP.hdlAddListDB();};
    }else{
        myElement = { id: props.propsMM.propsBM.curElem.id,
                      descripcion: props.propsMM.propsBM.curElem.descripcion,
                      valor: props.propsMM.propsBM.curElem.valor,
                      estado: props.propsMM.propsBM.curElem.estado}
        myDbid = props.propsMM.propsBM.curElem.dbid;
        hdlAddListDBx = () => {props.propsMM.propsBM.propsLP.hdlAddListDB();};
    }
    
    const [stRegistro, setStRegistro] = useState(myElement);
    const [stEnvio, setStEnvio] = useState({isGood:false, dbid:'', show:false});

    const hdlDesc = (e)=>{ setStRegistro((prevState)=>({...prevState, descripcion:e.target.value})) }
    
    const hdlVal = (e)=>{ setStRegistro((prevState)=>({...prevState, valor:(e.target.value)})) }

    const hdlEstado = (b)=>{ setStRegistro((priorState)=>({...priorState, estado:b})) }
    

    const hdlCreation = async ()=>{
        const resp  =  await guardarDatabase('productos', stRegistro)
        setStRegistro({id:nanoidCA(), descripcion:'', valor:'', estado:null  })
        setTimeout(()=>(setStEnvio({isGood:true, dbid:resp.id, show:true})),100);
    }

    const hdlUpdating = async ()=>{
        const resp = await actualizarDocumentoDatabase('productos', myDbid, stRegistro)
        console.log(resp);
        setTimeout(()=>(setStEnvio({isGood:true, dbid:myDbid, show:true})),100);
    }

    const hdlForm = async (e)=>{

        e.preventDefault();
        if(!stRegistro.id || !stRegistro.descripcion.trim() || !stRegistro.valor.trim() || stRegistro.estado === null){
            setStEnvio({isGood:false, dbid:'', show:true});
            return;
        }

        if(isCreate) await hdlCreation();
        else await hdlUpdating();
        
        hdlAddListDBx();
    }

    useEffect(()=>{
        setStEnvio((prior)=>({...prior, show:false}))
    },[stRegistro.descripcion, stRegistro.valor, stRegistro.estado])

    return (
        <Fragment>
            <AlertAndres from={"Registro"} showMe={stEnvio.show} isGood={stEnvio.isGood} props={{DBid : stEnvio.dbid}}/>
            <form id="forma-registro-prod" onSubmit={hdlForm}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="inputProductID">
                        El registro <strong>quedará</strong> con la siguiente <strong>ID</strong> local </label>
                    <input value={stRegistro.id} disabled className="form-control"/>
                    {isCreate ? null:<label>---id en la DDBB : {myDbid}</label>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="modalInputProductName">
                        Descripción </label>
                    <input value={stRegistro.descripcion} onChange={hdlDesc} placeholder="" className="form-control" id="modalInputProductName" type="text" name="q"/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="modalInputProductPrice">
                        Valor Unitario </label>
                    <input value={stRegistro.valor} onChange={hdlVal} className="form-control" id="modalInputProductPrice" type="text"/>
                </div>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel onClick={()=>(hdlEstado(true))} value="yes" control={<Radio checked={!!stRegistro.estado} />} label="Disponible" />
                        <span>&nbsp;</span>
                        <FormControlLabel onClick={()=>(hdlEstado(false))} value="no" control={<Radio checked={stRegistro.estado === null? false:!stRegistro.estado}/>} label="No disponible" />
                    </RadioGroup>
                </FormControl>
                <div className="text-center">
                    <button className="btn btn-primary" type="submit">
                        Registrar </button>
                </div>
            </form>
        </Fragment>
    )
}
