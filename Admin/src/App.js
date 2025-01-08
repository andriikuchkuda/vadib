import { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import AuthContext from "context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import customFetch from 'utils/customFetch';

import routes from './route';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const [token, setToken] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (localStorage.adminAuthToken) {
          const bearerToken = localStorage.adminAuthToken;
          const adminAuthToken = bearerToken.startsWith('Bearer ') ? bearerToken.split(" ")[1] : bearerToken;
          const decodedToken = jwtDecode(adminAuthToken);

          if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
            setToken(bearerToken);

            const response = await customFetch(
              `general/user/${decodedToken.id}`
            );

            setProfile(response);
          } else {
            localStorage.removeItem('adminAuthToken');
            setToken(false);
            setProfile({});
          }
        }
      } catch (error) {
        console.log(error)
      }

    }
    initializeAuth();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {routes()}
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
