/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MenuPanel } from './MenuScheme/MenuPanel';
import { ListaVentas } from './ListaVentas';
import CuadritoDerecha from './CuadritoDerecha';
import { consultarDatabase } from '../../Functionalities/Firebase/Controllers/Producto/Productos';


/*  x   x   x
VERY IMPORTANT SHIT : BROKEN CONNECTION HANDLING ¿¿¿???
VERY IMPORTANT SHIT : EMPTY COLLECTION HANDLING ¿¿¿???  --> stupid approach: remove the async await in productos.js
x   x   x*/

export function MainContentVentas(){
  const [appListDB, setAppListDB] = useState([])
  const [searchKey, setSearchKey] = useState('');
  const [refreshFlag, setRefFlag] = useState(false);

  const loadElems = async ()=>{
      const currentList = await consultarDatabase('ventas');
      setAppListDB(currentList);
  }

  const hdlAddListDBd = ()=>{setRefFlag(!refreshFlag);};

  useEffect(()=>{
    loadElems();
  },[refreshFlag])

  const filteredList = appListDB.filter((prod)=>(prod.encargado.toLowerCase().includes(searchKey.toLowerCase())
                                                || prod.id.toLowerCase().includes(searchKey.toLowerCase())
                                                || prod.docCliente.toLowerCase().includes(searchKey.toLowerCase())
                                                || prod.nomCliente.toLowerCase().includes(searchKey.toLowerCase())
                                                ))
  
   
  
  
  return (
    <React.Fragment>
      <Grid item xs={12} md={9}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          <MenuPanel hdlAddListDB={hdlAddListDBd} setSearchKey={setSearchKey}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper
          sx={{p: 2, display: 'flex', flexDirection: 'column'}}
        >
          <CuadritoDerecha />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <ListaVentas hdlAddListDB={hdlAddListDBd} totalList={filteredList} searchKey={searchKey} />
        </Paper>
      </Grid>
    </React.Fragment>
  )
}