import React, {useEffect, useContext} from "react";
import PrivateRoute from "./private_route";
import PopulateRoute from "./populate_route";
import { Route, Navigate } from 'react-router-dom';

import Dashboard from "../page/dashboard/Dashboard";
import Profile from "../page/profile/Profile";
import HelpDesk from "../page/helpdesk/HelpDesk";
import Chatgpt from "../page/chatgpt/Chatgpt";

import Signin from "../page/authentication/Signin";
import Signup from "../page/authentication/Signup";
import ForgotPass from "../page/authentication/ForgotPass";


const route = () => {

  return (
    <>
      <Route exact path="/" element={<PrivateRoute/>}>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/helpdesk" element={<HelpDesk/>}/>
        <Route exact path="/chatgpt" element={<Chatgpt/>}/>
      </Route>
      <Route exact path="/" element={<PopulateRoute/>}>
        <Route exact path="/signin" element={<Signin/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/forgot-password" element={<ForgotPass/>}/>
      </Route>
      <Route exact path="*" element={<Navigate to="/dashboard"/>}/>
    </>
  )
}

export default route;