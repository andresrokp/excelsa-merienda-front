/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function AlertAndres( {from, showMe, isGood, props}) {
  const msg = isGood ? " > > Envío exitoso > > DDBB-ID: "+props.DBid
                     :" x x Envío fallido. Revise sus entradas o su conexión";

  return (
      <Box sx={{ width: '100%' }}>
      <Collapse in={showMe}>
        {isGood ? <Alert severity="success">{msg}</Alert>
                : <Alert severity="warning">{msg}</Alert>
        }
      </Collapse>
    </Box>
  );
}
