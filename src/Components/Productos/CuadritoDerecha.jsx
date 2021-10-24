/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


function preventDefault(event) {
  event.preventDefault();
}

export default function CuadritoDerecha() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Por:
      </Typography>
      <Typography component="p" variant="h4">
        Andrés Roca P.
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        WeHaveThePower
      </Typography>
      
      <Link color="primary" href="#" onClick={preventDefault}>
        MisiónTIC 2022
      </Link>
    </React.Fragment>
  );
}