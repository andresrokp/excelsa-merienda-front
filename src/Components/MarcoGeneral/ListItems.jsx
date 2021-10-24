import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

//Mis Importaciones
import LogoutIcon from '@mui/icons-material/Logout';



export function MainListItems({ clickAction }){
  const hdlClickDashboard = ()=>{
    clickAction(1);
  };
  const hdlClickVentas = ()=>{
    clickAction(2);
  };
  const hdlClickProductos = ()=>{
    clickAction(3);
  };
  const hdlClickRoles = ()=>{
    clickAction(4);
  };

  return(
    <div>
      <ListItem button onClick={hdlClickDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={hdlClickVentas}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Ventas" />
      </ListItem>
      <ListItem button onClick={hdlClickProductos}> 
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
      </ListItem>
      <ListItem button onClick={hdlClickRoles}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
      </ListItem>
      <ListItem button>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="zz zz zz" />
      </ListItem>
    </div>
  )
};

export function SecondaryListItems() {
  
  const hdlClickCerrar = ()=>{
    window.open("https://lms.misiontic2022udea.com/","_self");
  }

  return(
    <div>
      <ListSubheader inset>Controles</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Cambiar credenciales" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Conquistar el mundo" />
      </ListItem>
      <ListItem button onClick={hdlClickCerrar}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión"/>
      </ListItem>
    </div>
  )
};