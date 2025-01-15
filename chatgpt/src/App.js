import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import Content from './component/layout/Content';
import SideBar from './component/layout/SideBar';

import LayoutContext from './context/AuthContext';

import fetchWithAuth from "./utils/fetch";


const App = () => {
  const [sideBarToggleBtnShow, setSideBarToggleBtnShow] = useState(false);
  const [sideBarWidth, setSideBarWidth] = useState(260);
  const [transaction, setTransaction] = useState(false);

  useEffect(() => {
    if (localStorage.transactionData) {
      const data = JSON.parse(localStorage.getItem('transactionData'));
      const expiredDate = Date.parse(data.usePeriod);

      if(expiredDate >= Date.now()) {
        setTransaction(data)
      } else {
        localStorage.removeItem('transacionData');
        setTransaction(false);
      }
    }
  }, [])

  useEffect(() => {

    const handleMessage = (event) => {
      const expectedOrigin = "http://localhost:3001";

      // Verify the origin for security
      if (event.origin === expectedOrigin) {
        const receivedData = event.data;
        // Store the data in localStorage
        if(receivedData.action === 'logout'){
          localStorage.clear();
          setTransaction(false);
        } else {
          localStorage.setItem("transactionData", JSON.stringify(receivedData));
          setTransaction(receivedData);
        }
      } else {
        console.log("Unexpected origin:", event.origin);
      }
    };

    // Add event listener for messages
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ sideBarToggleBtnShow, setSideBarToggleBtnShow, sideBarWidth, setSideBarWidth }}>

      {
        transaction ?
        (
          <div className="relative flex h-full w-full overflow-hidden transition-colors z-0">
            <SideBar />
            <Content />
          </div>
        ) : 
        (
          <p>Session expired</p>
        )
      }

    </LayoutContext.Provider>

  );
}

export default App;
