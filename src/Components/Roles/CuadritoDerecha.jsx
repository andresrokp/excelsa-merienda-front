/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function CuadritoDerecha() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Roles:
      </Typography>
      <Typography component="p" variant="h4">
        Hola Admin Root
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Aquí puedes ver, autorizar y cambiar roles de los usuarios.
      </Typography>
    </React.Fragment>
  );
}