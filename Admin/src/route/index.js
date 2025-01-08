import React, {useEffect, useContext} from "react";
import PrivateRoute from "./private_route";
import PopulateRoute from "./populate_route";
import { Route, Navigate } from 'react-router-dom';

import Layout from "../scenes/layout";
import Dashboard from "../scenes/dashboard";
import Customers from "../scenes/customers";
import Admin from "../scenes/admin";

import Signin from "../scenes/authentication/Signin";


const route = () => {

  return (
    <>
      <Route element={<Layout />}>
        <Route exact path="/" element={<PrivateRoute/>}>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/customers" element={<Customers/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
        </Route>
      </Route>
      <Route exact path="/" element={<PopulateRoute/>}>
        <Route exact path="/signin" element={<Signin/>}/>
      </Route>
      <Route exact path="*" element={<Navigate to="/dashboard"/>}/>
    </>
  )
}

export default route;