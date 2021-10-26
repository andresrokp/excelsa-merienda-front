import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';

//Mis Importaciones
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { logOutUsuario } from '../../Functionalities/Firebase/Controllers/Producto/Productos';



export function MainListItems({ clickAction }){

  const history = useHistory();

  let { id } = useParams();
  
  const { user } = React.useContext(UserContext)

  const hdlClickDashboard = ()=>{
    localStorage.setItem('boardCounter', 1)
    clickAction(1);
    history.push(`/${id}/home`);
  };
  const hdlClickVentas = ()=>{
    localStorage.setItem('boardCounter', 2)
    clickAction(2);
    history.push(`/${id}/ventas`);
  };
  const hdlClickProductos = ()=>{
    localStorage.setItem('boardCounter', 3)
    clickAction(3);
    history.push(`/${id}/productos`);
  };
  const hdlClickRoles = ()=>{
    localStorage.setItem('boardCounter', 4)
    clickAction(4);
    history.push(`/${id}/roles`);
  };

  return(
    <div>
        <ListItem button onClick={hdlClickDashboard}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      {user.role === 'vendedor'|| user.role === 'admin' || user.role === 'root' ? 
        <ListItem button onClick={hdlClickVentas}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Ventas" />
        </ListItem> : null}

      {user.role === 'admin' || user.role === 'root' ? 
        <ListItem button onClick={hdlClickProductos}> 
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
        </ListItem> : null}

      {user.role === 'root' ?
        <ListItem button onClick={hdlClickRoles}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Roles" />
        </ListItem>: null}
    </div>
  )
};

export function SecondaryListItems() {

  const hdlLogOut = ()=>{
    localStorage.setItem('boardCounter', '1');
    localStorage.removeItem('elsujetoencuestion');
    logOutUsuario();
  }

  
  return(
    <div>
      <ListSubheader inset>Controles</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Personalizar cuenta" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Conquistar el mundo" />
      </ListItem>
      <ListItem button component={Link} to='/login' onClick={hdlLogOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión"/>
      </ListItem>
    </div>
  )
};