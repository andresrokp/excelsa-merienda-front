/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { UserContext } from '../Context/UserContext';



function preventDefault(event) {
  event.preventDefault();
}

export default function CuadritoDerecha() {

  const { user } = React.useContext(UserContext)

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Hola
      </Typography>
      <Typography component="p" variant="h4">
        {user.name}
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