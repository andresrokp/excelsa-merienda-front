import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link as RouterLink } from 'react-router-dom';
import { loginGoogle } from '../../Functionalities/Firebase/Controllers/Producto/Productos'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} Excelsa Merienda {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

const theme = createTheme();

export const LogIn = () => {

  let user = null;

  const hdlGoogleAuth = () => {
    user = loginGoogle();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({ email: data.get('email') , password: data.get('password')});
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
            <Button component={RouterLink} to='/productos' type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {/* >> OJO el type debe ser submit y los TextField 'required'*/}
              Ingresar
              </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Registra una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Typography component="h6" variant="h8">
            <hr />
            O ingresa con tu cuenta de Google:
          </Typography>
            <button onClick={()=>hdlGoogleAuth()} className="btn btn-danger btn-block mt-2" type="button">
            Ingresar con Google
          </button>
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
