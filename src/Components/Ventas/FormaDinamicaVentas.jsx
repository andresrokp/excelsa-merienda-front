/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import {React , Fragment, useState, useEffect, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { customAlphabet } from 'nanoid'

import { actualizarDocumentoDatabase, consultarDatabase, consultarDocumentoDatabase, guardarDatabase } from '../../Functionalities/Firebase/Controllers/Producto/Productos'
import AlertAndres from './MenuScheme/AlertAndres'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { UserContext } from '../Context/UserContext'

import { BotonRest } from './PruebaRest/BotonRest'


export function FormaDinamicaVentas( props ) {

    const { user } = useContext(UserContext);
    const theUser = user;

    // console.log(props);
    const { isCreate } = props;
    const nanoidCA = customAlphabet('0123456789JHKQ', 8)
    const hdlDate = ()=>{
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${day}/${month}/${year} . ${hour}:${minutes}`;
    }
    let hdlAddListDBx;
    let initState = {}
    let myDbid = '';
    
    if (isCreate) {                            // OJO: encargado realmente viene del Auth user
        initState = {id: nanoidCA(), fecha:hdlDate(), encargado: theUser.name, nomCliente:'', docCliente:'', listaCompra:[], valor:0, estado:'En proceso'};
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
    // const [stViewModalAdd, setStViewModalAdd] = useState(false);
    // const [stViewModalCarrito, setStViewModalCarrito] = useState(false);
    const [listaProductos, setListaProductos] = useState([]);

    const hdlNomCliente = (e)=>{ setStRegistro((prevState)=>({...prevState, nomCliente:e.target.value})) }
    
    const hdlDocCliente = (e)=>{ setStRegistro((prevState)=>({...prevState, docCliente:e.target.value})) }
    
    const hdlVal = (newVal)=>{ setStRegistro((prevState)=>({...prevState, valor:newVal})) }

    const hdlEstado = (b)=>{ setStRegistro((priorState)=>({...priorState, estado:b})) }

    const hdlListaCompra = (newList)=>{ setStRegistro((prevState)=>({...prevState, listaCompra:newList})) }
    
    const hdlAddOne = async (dbid)=>{
        const prod = await consultarDocumentoDatabase('productos', dbid);
        if (prod) hdlListaCompra([...stRegistro.listaCompra, prod]);
        console.log('ListaCompra luego de Add ~~' , stRegistro.listaCompra);
    }
            
    
    //function to delete a product from the list with a field
    const hdlDeleteOne = (anId)=>{
        const newList = stRegistro.listaCompra.filter((prod)=>{
            return prod.dbid !== anId;
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
        if(!stRegistro.id || !stRegistro.nomCliente.trim() || !stRegistro.docCliente.trim()){
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
    },[stRegistro.nomCliente, stRegistro.valor, stRegistro.estado, stRegistro.docCliente])

    useEffect(()=>{
        async function loadProds(){
            const prods = await consultarDatabase('productos');
            setListaProductos(prods)
        }
        loadProds();
    },[])

    



    //9J024K
    return (
        <Fragment>
            <AlertAndres from={"Registro"} showMe={stEnvio.show} isGood={stEnvio.isGood} props={{DBid : stEnvio.dbid}}/>
            <form id="forma-registro-prod" onSubmit={hdlForm}>
                <div className="row justify-content-center">
                    <div className="mb-3 col-5 col-md-6">
                        <label className="form-label" htmlFor="inputProductID">
                            ID local </label>
                        <input value={stRegistro.id} disabled className="form-control"/>
                        {isCreate ? null:<label>---id en la DDBB : {myDbid}</label>}
                    </div>
                    <div className="mb-3 col-5 col-md-6">
                        <label className="form-label" htmlFor="inputProductID">
                            Fecha compra </label>
                        <input value={stRegistro.fecha} disabled className="form-control"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="mb-3 col-6 col-sm-6">
                        <label className="form-label" htmlFor="modalInputProductName">
                            Nombre Cliente </label>
                        <input value={stRegistro.nomCliente} onChange={hdlNomCliente} placeholder="..Ingrese Nombre" className="form-control" type="text" name="q"/>
                    </div>
                    <div className="mb-3 col-6 col-sm-6">
                        <label className="form-label" htmlFor="modalInputProductName">
                            Cédula Cliente </label>
                        <input value={stRegistro.docCliente} onChange={hdlDocCliente} placeholder="..Ingrese cédula" className="form-control" type="text" name="q"/>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="mb-1 col-5 col-sm-4">
                        <BotonRest btnNumber={3} btnName={"Agregar"} totalList={listaProductos} hdlAddOne={hdlAddOne}/>
                    </div>
                    <div className="mb-1 col-5 col-sm-4">
                        <BotonRest isCarrito={true} btnNumber={4} btnName={"Ver Carrito"} totalList={stRegistro.listaCompra} hdlAddOne={hdlAddOne} hdlDeleteOne={hdlDeleteOne}/>
                    </div>
                    <div className="mb-3 col-12 col-sm-4">
                        <label className="form-label" htmlFor="modalInputProductPrice">
                            Valor Total </label>
                        <input value={stRegistro.valor} disabled className="form-control" id="modalInputProductPrice" type="text"/>
                    </div>
                </div>
                <FormControl component="fieldset">
                    <strong>Estado:</strong>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel onClick={()=>(hdlEstado('En proceso'))} value="proceso" control={<Radio checked={stRegistro.estado === 'En proceso'? true:false} />} label="En proceso" />
                        <span>&nbsp;</span>
                        <FormControlLabel onClick={()=>(hdlEstado('Cancelada'))} value="cancelada" control={<Radio checked={stRegistro.estado === 'Cancelada'? true:false}/>} label="Cancelada" />
                        <span>&nbsp;</span>
                        <FormControlLabel onClick={()=>(hdlEstado('Entregada'))} value="entregada" control={<Radio checked={stRegistro.estado === 'Entregada'? true:false}/>} label="Entregada" />
                    </RadioGroup>
                </FormControl>
                <label className="form-label" htmlFor="modalInputProductName">
                    Venta hecha por: </label>
                <div className="row justify-content-center">
                    <div className="mb-3 col-6 col-sm-6">
                        <input value={stRegistro.encargado} disabled placeholder="" className="form-control" type="text" name="q"/>
                    </div>
                    <div className="mb-3 col-6 col-sm-6">
                        <button className="btn btn-primary float-end" type="submit">
                            Registrar </button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
