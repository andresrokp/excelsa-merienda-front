import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { crearUsuario, googleCreate } from '../../Functionalities/Firebase/Controllers/Producto/Productos';
import { useHistory, Link as RouterLink } from "react-router-dom";

import GoogleIcon from '@mui/icons-material/Google';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyleft ☺ '} Excelsa Merienda por @andresrokp {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

const theme = createTheme();

//---------------------------------------
export const SignUp = () => {

  const [stAlert, setStAlert] = useState({showMe: false});
  const [stAlertText, setStAlertText] = useState('');
  const history = useHistory();

  //Normalito SignUp
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get('email') , password: data.get('password') , username: data.get('username') });
    
    if(data.get('email').trim() === '' || data.get('password').trim() === '' || data.get('username').trim() === ''){
      setStAlert({showMe: true});
      setStAlertText('x x Todos los campos son obligatorios x x');
      return;
    }

    if(!validateEmail(data.get('email'))){
      setStAlert({showMe: true});
      setStAlertText('x x El email no es valido x x');
      return;
    }
    
    if(data.get('password').length < 7){
      setStAlert({showMe: true});
      setStAlertText('x x Contraseña de al menos 7 caracteres x x');
      return;
    }
        
    if(data.get('password') !== data.get('password2')){
      setStAlert({showMe: true});
      setStAlertText('x x Las contraseñas no coinciden x x');
      return;
    }

    const newUser = await crearUsuario(data.get('email'), data.get('password'), data.get('username'));
    if(newUser){
      console.log('Usuario creado');
      history.push('/login');
    }else{
      setStAlert({showMe: true});
      return;
    }
  };

  //Google SignUp
  const hdlGoogleUp = async () => {
    const newUser = await googleCreate();
    if(newUser){
      console.log('Usuario creado');
      history.push('/login');
    }else{
      setStAlert({showMe: true});
      return;
    }
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: '#10be3c' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mucho gusto!. Regístrate.
          </Typography>
          {/* Posible componente Alert - Sacar*/}
          <Box sx={{ width: '100%' }}>
              <Collapse in={stAlert.showMe}>
                  <Alert severity="warning">{stAlertText}</Alert>
              </Collapse>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField size='small' onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth name="username" label="Nombre personal" type="text" id="username" autoComplete="username"/>
            <TextField size='small'  onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth id="email" label="Email Address to register" name="email" autoComplete="email"/>
            <TextField size='small'  onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth name="password" label="Enter a password" type="password" id="password" autoComplete="current-password"/>
            <TextField size='small'  onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth name="password2" label="Re-enter Password" type="password" id="password2" autoComplete="current-password"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1, bgcolor: '#10be3c'   }}>
              Registrar
            </Button>
          </Box>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <button onClick={hdlGoogleUp} type='button' className="btn btn-danger btn-sm btn-block mt-2">
                  o Regístrate con <GoogleIcon />oogle
                </button>
              </div>
            </div>
          </div>
        </Box>
          <Typography component="h6" variant="h8">
              <hr />
          </Typography>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/login" variant="body2" sx={{color: '#0f7e2b'}}>
                {'<< volver a login'}
              </Link>
            </Grid>
            <Grid item>
              {/*Intentionally left blank*/}
            </Grid>
          </Grid>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
