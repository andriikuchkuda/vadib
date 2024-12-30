import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PopulateeRoute = () => {
  const {token} = useContext(AuthContext);
  
  return !token ? <Outlet/> : <Navigate to="/dashboard"/>

}

export default PopulateeRoute;