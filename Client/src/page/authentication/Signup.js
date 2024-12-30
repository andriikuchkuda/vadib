import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import debounce from 'debounce';

import fetchWithAuth from '../../utils/fetch';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  
  const navigate = useNavigate();

  const [error, setError] = useState({
    fname : '',
    lname : '',
    email : '',
    username : '',
    password : '',
    confirmpass : ''
  })

  const onChangeHandler = debounce( e => {
    switch (e.target.name){
      case "fname":
      setFname(e.target.value);
      break;
      case "lname":
      setLname(e.target.value);
      break;
      case "email":
      setEmail(e.target.value);
      break;
      case "username":
      setUsername(e.target.value);
      break;
      case "password":
      setPassword(e.target.value);
      break;
      case "confirmpass":
      setConfirmpass(e.target.value);
      break;
      default:
        break;
    }
  },200);

  const onSubmitHandler = async e => {
    e.preventDefault();
    try{
      if(fname && lname && email && username && password && confirmpass) {
        if(password === confirmpass) {
          const response = await fetchWithAuth(
            '/auth/signup',
            'POST',
            {
              name : fname + " " + lname,
              email : email,
              username : username,
              password : password
            }
          )
          
          navigate('/siginin');

        } else {
          console.log('Input error')
        }
      } else {
        console.log('error')
      }
      
    } catch (error) {
      console.log('error')      
    }
  }

  return (
    <div className="am-body-content-content">

      <div className="am-signup">

        <div className="am-info am-login-text">If you already have an account on our website, please&nbsp;
          <Link to="/signin" className="ajax-link" title="NoxTools">
            log in
          </Link> 
          &nbsp;to continue
        </div>


        <div className="am-form ">
          <form onSubmit={onSubmitHandler} id="page-0" className="am-signup-form" noValidate="novalidate">

            <div className="am-row" id="row-name-0">
              <div className="am-element-title"> <label htmlFor="name-0"> <span className="required">* </span> First &amp;
                Last Name </label> </div>
              <div className="am-element group"> 
                <input onChange={onChangeHandler} type="text" id="name_f" name="fname" placeholder="First Name" /> <input onChange={onChangeHandler} type="text" id="name_l" name="lname" placeholder="Last Name" />
              </div>
            </div>
            <div className="am-row" id="row-email-0">
              <div className="am-element-title"> <label htmlFor="email-0"> <span className="required">* </span> Your E-Mail
                Address </label>
              </div>
              <div className="am-element"> <input onChange={onChangeHandler} type="email" size="30" name="email" id="email-0"
                placeholder="Your E-Mail Address" /> </div>
            </div>
            <div className="am-row" id="row-login-0">
              <div className="am-element-title"> <label htmlFor="login-0"> <span className="required">* </span> Choose a
                Username </label>
              </div>
              <div className="am-element"> <input onChange={onChangeHandler} type="text" size="30" maxLength="32" name="username" id="login-0" placeholder="Choose a Username" /> </div>
            </div>
            <div className="am-row" id="row-pass-0">
              <div className="am-element-title"> <label htmlFor="pass-0"> <span className="required">* </span> Choose a
                Password </label>
              </div>
              <div className="am-element">
                <div className="am-pass-indicator-wrap"><input onChange={onChangeHandler} type="password" autoComplete="password" spellCheck="false" maxLength="32" className="am-pass-indicator" name="password" id="pass-0" placeholder="Choose a Password" />
                  <div className="am-pass-indicator-bar" title="Password Strength">
                    <div className="am-pass-indicator-bar_bar"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="am-row" id="row-pass-confirm">
              <div className="am-element-title"> <label htmlFor="pass-confirm"> <span className="required">* </span> Confirm
                Your Password </label> </div>
              <div className="am-element"> <input onChange={onChangeHandler} type="password" autoComplete="new-password" spellCheck="false" maxLength="32" name="confirmpass" id="pass-confirm" placeholder="Confirm Your Password" /> </div>
            </div>
            <div className="am-row" id="row-grp-captcha">
              <div className="am-element-title"> <label htmlFor="grp-captcha"> Anti Spam </label> </div>
              <div className="am-element group">
                <script type="text/javascript" src="//www.google.com/recaptcha/api.js?hl=en_US" async=""
                  defer=""></script>
                <div className="g-recaptcha" data-sitekey="6LcpsI4qAAAAAPpSfYSvdihfpbK6BSV3hAqk_QjV"
                  data-theme="light" data-size="normal">
                  <div style={{"width": "304px","height" : "78px"}}>
                    <div><iframe title="reCAPTCHA" width="304" height="78" role="presentation"
                      name="a-478q14v3005n" frameBorder="0" scrolling="no"
                      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                      src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcpsI4qAAAAAPpSfYSvdihfpbK6BSV3hAqk_QjV&amp;co=aHR0cHM6Ly9ub3h0b29scy5jb206NDQz&amp;hl=en&amp;v=zIriijn3uj5Vpknvt_LnfNbF&amp;theme=light&amp;size=normal&amp;cb=clzcfky7gdpl"></iframe>
                    </div><textarea id="g-recaptcha-response" name="g-recaptcha-response"
                      className="g-recaptcha-response"
                      style={{"width": "250px", "height": "40px", "border": "1px solid rgb(193, 193, 193)", "margin": "10px 25px", "padding" : "0px", "resize": "none", "display": "none"}}></textarea>
                  </div><iframe style={{"display": "none"}}></iframe>
                </div>
              </div>
            </div>
            <div className="am-row" id="row-buttons">
              <div className="am-element group"> <input type="submit" value="Next" className="am-cta-signup"
                name="_qf_page-0_next" id="_qf_page-0_next-0" /> </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
