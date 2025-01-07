import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import fetchWithAuth from '../../utils/fetch';
import debounce from 'debounce';

import AuthContext from '../../context/AuthContext';


const Signin = () => {
  const { setToken, setProfile } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const onChangeHandler = debounce(e => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }, 200);

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await fetchWithAuth(
          '/auth/signin',
          'POST',
          {
            email: email,
            password: password
          }
        )
        const { message, data } = response;

        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setProfile(data.profile);
        navigate('/dashboard');
      } else {
        setError("The user name or password is incorrect")
      }

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="am-body-content-content">
      <div className="am-login-form-wrapper">
        <div className="am-form am-auth-form am-login-form">
          {
            error && (
              <ul className="am-errors am-login-errors">
                <li>{error}</li>
              </ul>
            )
          }
          <form onSubmit={onSubmitHandler} name="login" className="am-login-form-form">
            <fieldset>
              <legend>Login to your Account</legend>
              <div className="am-row am-row-wide am-row-login-recaptcha am-row-recaptcha" id="login-recaptcha-row"
                style={{ "display": "none" }}>
                <div className="am-element am-element-recaptcha">
                  <div className="am-recaptcha-element"></div>
                </div>
              </div>
              <div className="am-row am-row-login-login">
                <div className="am-element-title">
                  <label className="am-element-title" htmlFor="amember-login">User Email</label>
                </div>
                <div className="am-element">
                  <input onChange={onChangeHandler} type="text" id="amember-login" name="email" size="15" defaultValue=""
                    autoFocus="autofocus" placeholder="User Email" autoComplete="email" />
                </div>
              </div>
              <div className="am-row am-row-login-pass">
                <div className="am-element-title">
                  <label className="am-element-title" htmlFor="amember-pass">Password</label>
                </div>
                <div className="am-element">
                  <input onChange={onChangeHandler} type="password" id="amember-pass" name="password" className="am-pass-reveal" size="15" placeholder="Password" autoComplete="current-password" spellCheck="false" /><span className="am-switch-reveal am-switch-reveal-off" title="Toggle Password Visibility"></span>
                </div>
              </div>
              <div className="am-row am-row-buttons">
                <div className="am-element">
                  <input type="submit" value="Login" />
                  <span className="am-form-login-switch-wrapper"><Link to="/forgot-password"
                    className="local-link am-form-login-switch">Forgot password?</Link></span>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="am-signup-link">Not registered yet? <Link to="/signup">Signup here</Link> </div>
    </div>
  )
}

export default Signin;