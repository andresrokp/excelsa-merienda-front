import React, { useContext, useEffect, useState } from 'react';
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
 
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { loginUsuario, logOutUsuario } from '../../Functionalities/Firebase/Controllers/Producto/Productos'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { UserContext } from '../Context/UserContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} Excelsa Merienda {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

const theme = createTheme();

export const LogIn = () => {

  const { setUser } = useContext(UserContext)

  const [stAlert, setStAlert] = useState({showMe: false});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get('email') , password: data.get('password')});
    
    if(data.get('email').trim() === '' || data.get('password').trim() === '') {
      setStAlert({showMe: true});
      return;
    }

    const user = await loginUsuario(data.get('email'), data.get('password'));

    if(user){
      console.log('login bueno, devolvió user ~~', user);
      setUser(user);
      localStorage.setItem('elsujetoencuestion', JSON.stringify(user));
      localStorage.setItem('boardCounter', '1');
      history.push(`/${user.uid}/home`);
    }else{
      console.log('login malo');
      setStAlert({showMe: true});
    }

  };
  
  
  useEffect(() => {
    logOutUsuario();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          {/* Posible componente Alert - Sacar*/}
          <Box sx={{ width: '100%' }}>
              <Collapse in={stAlert.showMe}>
                  <Alert severity="warning"> x x x Algo está mal, revisa. x x x</Alert>
              </Collapse>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth id="email" name="email"/>
            <TextField onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth name="password" type="password" id="password"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Ingresar
              </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"¿No tienes cuenta?, Regístrate."}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {/* <Typography component="h6" variant="h8">
            <hr />
            O ingresa con tu cuenta de Google:
          </Typography>
            <button className="btn btn-danger btn-block mt-2" type="button">
            Ingresar con Google
          </button> */}
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
