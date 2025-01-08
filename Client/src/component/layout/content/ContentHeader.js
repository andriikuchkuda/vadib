import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AuthContext from '../../../context/AuthContext';

const ContentHeader = () => {
  const [subTitle, setSubTitle] = useState('');
  const {pathname} = useLocation();
  const {token, profile, setToken, setProfile} = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    setToken(false);
    setProfile({});
  }

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setSubTitle('Your Membership Information');
        break;
      case "/profile":
        setSubTitle('Customer Profile');
        break;
      case "/shopcart":
        setSubTitle('Shopping Cart');
        break;
      case "/helpdesk":
        setSubTitle('');
        break;
      default:
        break;
    }
  }, [pathname])

  
  return (
    <div className="am-body-content-top">
      {
        token && (
          <>
            <div className="am-account-toolbar">
              <div className="am-account-toolbar-items">
                <a className="am-tabs-narrow-dashboard" href="/secure/member"></a>
                <a className="am-tabs-narrow-switch"></a>
                <div className="am-user-identity-block-avatar">
                  <div className="am-user-identity-block-avatar-pic">
                    <img src="//www.gravatar.com/avatar/0e90f72dd3a2da13f8c778accb7982fb?s=24&amp;d=mm" />
                  </div>
                  <span className="am-user-identity-block_login">{profile.name}</span> <a onClick={logoutHandler}>Logout</a>
                </div>
              </div>
            </div>
            <div className="am-tabs-wrapper">
              <ul className="am-tabs">
                <li className={pathname == "/dashboard" ? "active" : "normal"}>
                  <Link id="menu-member" title="Dashboard" to="/dashboard">Dashboard</Link>
                </li>
                <li className={pathname == "/profile" ? "active" : "normal"}>
                  <Link id="menu-profile-default" to="/profile">Customer Profile</Link>
                </li>
                <li className={pathname == "/shopcart" ? "active" : "normal"}>
                  <Link id="menu-custom-link-13141761" to="/shopcart">Shopping Cart</Link>
                </li>
                <li className={pathname == "/helpdesk" ? "active" : "normal"}>
                  <Link id="menu-helpdesk" to="/helpdesk">Helpdesk</Link>
                </li>
              </ul>
            </div>
            <h1>{subTitle}</h1>
          </>
        )
      }
    </div>
  )
}

export default ContentHeader;
