import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

import AuthContext from "./context/AuthContext";
import fetchWithAuth from "./utils/fetch";

import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Content from "./component/layout/content/Content";


import route from "./route";

const App = () => {
  const [token, setToken] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const initializeAuth = async () => {
      try{
        if(localStorage.authToken) {
          const bearerToken = localStorage.authToken;
          const authToken = bearerToken.startsWith('Bearer ') ? bearerToken.split(" ")[1] : bearerToken;
          const decodedToken = jwtDecode(authToken);
          
          if(decodedToken.exp > Math.floor(Date.now()/1000)){
            setToken(bearerToken);

            const response = await fetchWithAuth(
              `/general/user/${decodedToken.id}`
            );

            setProfile(response);
          } else {
            localStorage.removeItem('authToken');
            setToken(false);
            setProfile({});
          }
        }
      } catch (error) {
        console.log(error)
      }

    }
    initializeAuth();
  },[token]);

  return (
    <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
      <div className="am-layout am-common">
        <Header />
        <BrowserRouter>
          <Content>
            <Routes>
              {route()}
            </Routes>
          </Content>
        </BrowserRouter>
      </div>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
