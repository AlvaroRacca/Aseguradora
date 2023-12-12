import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MenuAdmin from '../Menu-admin/menu-admin';
import Menu from '../Menu/Menu';



const ProtectedRoute = ({ element, allowedLevels, userLevel }) => {

  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  if (allowedLevels.includes(userLevel)) {
    /* return <Routes> <Route element={element} /></Routes>; */
    return element;
  } else {
      MySwal.fire({
        icon: 'error',
        title: 'Ruta Invalida!',
      })
      return <Navigate to="/iniciar-sesion" />;
      
  }
};

export default ProtectedRoute;
