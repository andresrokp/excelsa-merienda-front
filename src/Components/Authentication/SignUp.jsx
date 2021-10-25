import React, {useState} from 'react';
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

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { useHistory } from 'react-router-dom';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} Excelsa Merienda {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

const theme = createTheme();

export const SignUp = () => {

  const [stAlert, setStAlert] = useState({showMe: false});
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get('email') , password: data.get('password')});
    
    if(data.get('email').trim() === '' || data.get('password').trim() === '' || validateEmail(data.get('email')) === false) {
      setStAlert({showMe: true, isGood: false, msg: 'Please fill all the fields'});
      return;
    }
    
    if(data.get('password') !== data.get('password2')){
      setStAlert({showMe: true, isGood: false, msg: 'Passwords do not match'});
      return;
    }

    history.push('/productos');
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
            Sign up
          </Typography>
          {/* Posible componente Alert - Sacar*/}
          <Box sx={{ width: '100%' }}>
              <Collapse in={stAlert.showMe}>
                  <Alert severity="warning"> x x x Algo está mal, revisa. x x x</Alert>
              </Collapse>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth id="email" label="Email Address to register" name="email" autoComplete="email"/>
            <TextField onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth name="password" label="Enter a password" type="password" id="password" autoComplete="current-password"/>
            <TextField onFocus={(e)=>{setStAlert(false)}} margin="normal" required fullWidth name="password2" label="Re-enter Password" type="password" id="password2" autoComplete="current-password"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Registrarme {'>>'}
              </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
