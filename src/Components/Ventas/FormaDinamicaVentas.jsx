/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import {React , Fragment, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { customAlphabet } from 'nanoid'

import { actualizarDocumentoDatabase, consultarDatabaseWhere, guardarDatabase } from '../../Functionalities/Firebase/Controllers/Producto/Productos'
import AlertAndres from './MenuScheme/AlertAndres'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export function FormaDinamicaVentas( props ) {

    console.log(props);
    const { isCreate } = props;
    const nanoidCA = customAlphabet('0123456789JHKQ', 8)
    const hdlDate = ()=>{
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${day}/${month}/${year} @ ${hour}:${minutes}`;
    }
    let hdlAddListDBx;
    let initState = {}
    let myDbid = '';
    
    if (isCreate) {                            // OJO: encargado realmente viene del Auth user
        initState = {id: nanoidCA(), fecha:hdlDate(), encargado:'', nomCliente:'', docCliente:'', listaCompra:[], valor:0, estado:0};
        hdlAddListDBx = () => {props.propsMM.propsBM.propsMP.hdlAddListDB();};
    }else{
        initState = {   id: props.propsMM.propsBM.curElem.id,
                        fecha: props.propsMM.propsBM.curElem.fecha,
                        encargado: props.propsMM.propsBM.curElem.encargado,
                        nomCliente: props.propsMM.propsBM.curElem.nomCliente,
                        docCliente: props.propsMM.propsBM.curElem.docCliente,
                        listaCompra: props.propsMM.propsBM.curElem.listaCompra,
                        valor: props.propsMM.propsBM.curElem.valor,
                        estado: props.propsMM.propsBM.curElem.estado

                    };
        myDbid = props.propsMM.propsBM.curElem.dbid;
        hdlAddListDBx = () => {props.propsMM.propsBM.propsLP.hdlAddListDB();};
    }
    
    const [stRegistro, setStRegistro] = useState(initState);
    const [stEnvio, setStEnvio] = useState({isGood:false, dbid:'', show:false});
    const [stProdToAdd, setStProdToAdd] = useState('');
    const [stProdToDel, setStProdToDel] = useState('');

    //OJO: quitar, realmente viene del Auth user
    const hdlEncargado = (e)=>{ setStRegistro((prevState)=>({...prevState, encargado:e.target.value})) }
    
    const hdlNomCliente = (e)=>{ setStRegistro((prevState)=>({...prevState, nomCliente:e.target.value})) }
    
    const hdlDocCliente = (e)=>{ setStRegistro((prevState)=>({...prevState, docCliente:e.target.value})) }
    
    const hdlVal = (newVal)=>{ setStRegistro((prevState)=>({...prevState, valor:newVal})) }

    const hdlEstado = (b)=>{ setStRegistro((priorState)=>({...priorState, estado:b})) }

    const hdlListaCompra = (newList)=>{ setStRegistro((prevState)=>({...prevState, listaCompra:newList})) }
    
    const hdlStAddP = (e)=>{ setStProdToAdd((prevState)=>(e.target.value) )}

    const hdlStDelP = (e)=>{ setStProdToDel((prevState)=>(e.target.value) )}

    const hdlAddOne = async ()=>{
        if(stProdToAdd.length === 6){
            const prod = await consultarDatabaseWhere('productos', 'id', stProdToAdd);
            console.log('prod cuando entra ~~',prod);
            if (prod !== false) hdlListaCompra([...stRegistro.listaCompra, ...prod]);
            setStProdToAdd('');
        }
    }
    
    //function to delete a product from the list with a field
    const hdlDelOne = (anId)=>{
        const newList = stRegistro.listaCompra.filter((prod)=>{
            return prod.id !== stProdToDel;
        });
        hdlListaCompra(newList)
    };

    const hdlCreation = async ()=>{
        const resp  =  await guardarDatabase('ventas', stRegistro)
        setStRegistro(initState);
        setTimeout(()=>(setStEnvio({isGood:true, dbid:resp.id, show:true})),100);
    }

    const hdlUpdating = async ()=>{
        const resp = await actualizarDocumentoDatabase('ventas', myDbid, stRegistro)
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
        console.log('registro.lista  ~~',stRegistro.listaCompra)
        let value = stRegistro.listaCompra.reduce((acc,prod)=>{
            console.log('total  ~~' , acc);
            console.log(prod);
            console.log('valor ~~', prod.valor);
            return acc + parseInt(prod.valor);
        },0);
        hdlVal(value);
    },[stRegistro.listaCompra])

    useEffect(()=>{
        setStEnvio((prior)=>({...prior, show:false}));
    },[stRegistro.descripcion, stRegistro.valor, stRegistro.estado])



    //9J024K
    return (
        <Fragment>
            <AlertAndres from={"Registro"} showMe={stEnvio.show} isGood={stEnvio.isGood} props={{DBid : stEnvio.dbid}}/>
            <form id="forma-registro-prod" onSubmit={hdlForm}>
                <div className="row justify-content-center">
                    <div className="mb-3 col-12 col-md-5">
                        <label className="form-label" htmlFor="inputProductID">
                            ID local asignada </label>
                        <input value={stRegistro.id} disabled className="form-control"/>
                        {isCreate ? null:<label>---id en la DDBB : {myDbid}</label>}
                    </div>
                    <div className="mb-3 col-12 col-md-5">
                        <label className="form-label" htmlFor="inputProductID">
                            Fecha de la compra </label>
                        <input value={stRegistro.fecha} disabled className="form-control"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="mb-3 col-12 col-sm-5">
                        <label className="form-label" htmlFor="modalInputProductName">
                            Nombre Cliente </label>
                        <input value={stRegistro.nomCliente} onChange={hdlNomCliente} placeholder="" className="form-control" type="text" name="q"/>
                    </div>
                    <div className="mb-3 col-12 col-sm-5">
                        <label className="form-label" htmlFor="modalInputProductName">
                            Cédula Cliente </label>
                        <input value={stRegistro.docCliente} onChange={hdlDocCliente} placeholder="" className="form-control" type="text" name="q"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="modalInputProductName">
                        Vendedor encargado </label>
                    <input value={stRegistro.encargado} onChange={hdlEncargado} placeholder="" className="form-control" type="text" name="q"/>
                </div>
                <div className="row justify-content-center">
                    <div className="mb-3 col-12 col-sm-6">
                        <button type="button" className="btn btn-primary" onClick={hdlAddOne}>
                            + </button>
                        <label className="form-label" htmlFor="modalInputProductName">
                            Agregar producto </label>
                        <input value={stProdToAdd} onChange={hdlStAddP} placeholder="Ingrese ID" className="form-control" type="text" name="q"/>
                    </div>
                    <div className="mb-3 col-11 col-sm-6">
                        <div className="text-end form-label" htmlFor="modalInputProductName">
                            Quitar producto </div>
                        <input value={stProdToDel} onChange={hdlStDelP} placeholder="Ingerese ID" className="form-control" type="text" name="q"/>
                        <button type="button" className="btn btn-primary" onClick={hdlDelOne}>
                            - </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="modalInputProductPrice">
                        Valor Total </label>
                    <input value={stRegistro.valor} disabled className="form-control" id="modalInputProductPrice" type="text"/>
                </div>
                <FormControl component="fieldset">
                    <strong>Estado:</strong>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel onClick={()=>(hdlEstado(true))} value="proceso" control={<Radio checked={stRegistro.estado === 0? true:false} />} label="En proceso" />
                        <span>&nbsp;</span>
                        <FormControlLabel onClick={()=>(hdlEstado(false))} value="cancelada" control={<Radio checked={stRegistro.estado === -1? true:false}/>} label="Cancelada" />
                        <span>&nbsp;</span>
                        <FormControlLabel onClick={''} value="entregada" control={<Radio checked={stRegistro.estado === 1? true:false}/>} label="Entregada" />
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
