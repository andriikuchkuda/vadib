import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import useAsync from "./useAsync";

const useFetch = (endpoint, method = "GET", body = {}, dependencies = []) => {
  const {token} = useContext(AuthContext);
  const url = process.env.REACT_APP_BACKEND_URL + endpoint;

  const headers = {
    "Content-Type" : "application/json",
    "Authentication" : token || ""
  }
  const option = {
    method : method,
    headers,
    body : method === "POST" || method === "PUT" ? JSON.stringify(body) : null
  };
  
  return useAsync(() => {
    return fetch(url, option).then(res => {
      if(res.ok) return res.json();
      return res.json().then(json => Promise.reject(json))
    })
  }, dependencies)
}

export default useFetch;
