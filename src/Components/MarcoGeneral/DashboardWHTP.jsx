import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, SecondaryListItems } from './ListItems';


import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

//MisImportaciones
import { orange } from '@mui/material/colors';
import { MainContentProductos } from '../Productos/MainContentProductos';
import { MainContentVentas } from '../Ventas/MainContentVentas';
import { globalUser } from '../../Functionalities/Firebase/Controllers/Producto/Productos';
import { MainContentRoles } from '../Roles/MainContentRoles'
import { UserContext } from '../Context/UserContext';
import { Paper } from '@mui/material';
import './dshb.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#0f7e2b',
    },
    secondary: {
      main: orange[500],
    },
  },
});

export const DashboardWHTP = () => {
  const [open, setOpen] = React.useState(window.innerWidth < 570 ? false : true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [boardCounter, setBoardCounter] = React.useState(1);
  const toggleContenido = (b) => {
    setBoardCounter(b);
  };

  React.useEffect(() =>{
    console.log('globalU desde loading en DSHB ~~',globalUser);
    setBoardCounter(1)
  },[]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="row col-9 col-sm-11 justify-content-around">
              <div className="col-6">
                <img width='150px' src={'https://firebasestorage.googleapis.com/v0/b/db-bocadopoder.appspot.com/o/logo-excelsa-edit.PNG?alt=media&token=16cccc6a-b1cb-4b5d-83ed-08f5175f4ae1'} alt="logo"/>
              </div>
              <div className="col-1">
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <MainListItems clickAction={toggleContenido}/>
          <Divider />
          <SecondaryListItems/>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
          {/* INICIA cuerpo módulos nuestros*/}
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {boardCounter === 1 ? <CuadritoHome/> : null}
              {boardCounter === 2 ? <MainContentVentas/> : null}
              {boardCounter === 3 ? <MainContentProductos/> : null}
              {boardCounter === 4 ? <MainContentRoles/> : null}
            </Grid>
          </Container>

          {/* FIN cuerpo módulos nuestros*/}
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

//https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/dashboard

const CuadritoHome = () => {

  const { user } = React.useContext(UserContext)

  return (
    <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          

          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Hola
          </Typography>
          <Typography component="p" variant="h4">
            {user.name} &#128512;
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Tienes Rol de: {user.role}
          </Typography>
          
          <Link color="primary" href="#">
            MisiónTIC 2022
          </Link>


        </Paper>
      </Grid>

  );
}