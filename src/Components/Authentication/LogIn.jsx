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

import GoogleIcon from '@mui/icons-material/Google';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { googleLogin, loginUsuario, logOutUsuario } from '../../Functionalities/Firebase/Controllers/Producto/Productos'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { UserContext } from '../Context/UserContext';
import './login.css';
import { Spinner } from './Spinner';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyleft ☺ '} Excelsa Merienda por Andrés FRP, {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

const theme = createTheme();

export const LogIn = () => {

  const { setUser } = useContext(UserContext)

  const [stAlert, setStAlert] = useState({showMe: false});
  const [stAlertText, setStAlertText] = useState('');
  const [stLoading, setStLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get('email') , password: data.get('password')});
    
    if(data.get('email').trim() === '' || data.get('password').trim() === '') {
      setStAlert({showMe: true});
      setStAlertText('x x Ingrese un email y una contraseña  x x');
      return;
    }
    
    setStLoading(true);
    const user = await loginUsuario(data.get('email'), data.get('password'));
    if(user){
      setUser(user);
      localStorage.setItem('elsujetoencuestion', JSON.stringify(user));
      localStorage.setItem('boardCounter', '1');
      history.push(`/${user.uid}/home`);
    }else{
      setStAlert({showMe: true});
      setStAlertText('x x  Email o contraseña incorrectos  x x');
      setStLoading(false);
    }
  };
  
  const hdlGoogleIn = async () => {
    
    const user = await googleLogin();
    if(user){
      setUser(user);
      localStorage.setItem('elsujetoencuestion', JSON.stringify(user));
      localStorage.setItem('boardCounter', '1');
      history.push(`/${user.uid}/home`);
    }else{
      setStAlert({showMe: true});
      setStAlertText('Credenciales de Google no registradas');
    }
  };
  
  
  useEffect(() => {
    logOutUsuario();
  }, []);

return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Avatar sx={{ m: 1, bgcolor: '#10be3c' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Bienvenid@!. Ingresa a tu cuenta.
            </Typography>
            {/* Invisible Alert*/}
            <Box sx={{ width: '100%' }}>
                <Collapse in={stAlert.showMe}>
                    <Alert severity="warning">{stAlertText}</Alert>
                </Collapse>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField onFocus={(e)=>{setStAlert(false)}} label="Escribe tu correo" margin="normal" required fullWidth id="email" name="email"/>
              <TextField onFocus={(e)=>{setStAlert(false)}} label="Escribe tu contraseña" margin="normal" required fullWidth name="password" type="password" id="password"/>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#10be3c'  }}>
                {stLoading ? <Spinner/> : 'Ingresar'}
                </Button>
            </Box>
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <button onClick={hdlGoogleIn} type='button' className="btn btn-danger btn-sm btn-block mt-2">
                    o Ingresa con <GoogleIcon />oogle
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
              {/*intentionally blank*/}
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2" sx={{color: '#0f7e2b'}}>
                ¿No tienes cuenta?, Regístrate.
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 3, mb: 4 }} />
        </Container>
      </ThemeProvider>
      
  );
}
