import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import debounce from 'debounce';

import fetchWithAuth from '../../utils/fetch';

const error = new Error();

export default function Profile() {
  const { profile, setProfile } = useContext(AuthContext);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [pword_toggle, setPwordToggle] = useState(false);

  useEffect(() => {
    const firstName = profile.name.split(" ")[0];
    const lastName = profile.name.split(" ")[1];
    setFname(firstName);
    setLname(lastName);
    setEmail(profile.email)
  }, [])

  const changePwordToggleHandler = () => {
    setPwordToggle(!pword_toggle);
  }

  const onChangeHandler = debounce(e => {
    switch (e.target.name) {
      case "fname":
        setFname(e.target.value);
        break;
      case "lname":
        setLname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "current_password":
        setCurrentPassword(e.target.value);
        break;
      case "new_password":
        setNewPassword(e.target.value);
        break;
      case "confirm_password":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  }, 200);

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      if(!fname || !lname || !email ){
        error.message = "Fill out all fields";
        throw error;
      }
      if (current_password || new_password || confirm_password) {
        
        if( (new_password || confirm_password) && (new_password !== confirm_password)) {
          error.message = "Password and Password Confirmation are different. Please reenter both";
          throw error;
        }

        if(current_password && ( !new_password && !confirm_password)) {
          error.message = "Fill out all password fields";
          throw error;
        }
      }
      const response = await fetchWithAuth(
        '/general/user',
        'POST',
        {
          id: profile._id,
          name: fname + " " + lname,
          email: email,
          username: current_password,
          current_password: !!current_password ? current_password : null,
          new_password: !!new_password ? new_password : null
        }
      );

      setProfile(response);
      
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="am-body-content-content">
      <div className="am-form ">
        <form onSubmit={onSubmitHandler} id="profile" className="am-profile-form " noValidate="novalidate">
          <div className="am-row" id="row-name-0">
            <div className="am-element-title"> <label htmlFor="name-0"> <span className="required">* </span> First &amp; Last
              Name </label> </div>
            <div className="am-element group">
              <input onChange={onChangeHandler} style={{ "marginRight": "5px" }} type="text" id="name_f" name="fname" placeholder="First Name" defaultValue={fname} />

              <input onChange={onChangeHandler} type="text" id="name_l" name="lname" placeholder="Last Name" defaultValue={lname} />

            </div>
          </div>
          <div className="am-row" id="row-email-0">
            <div className="am-element-title"> <label htmlFor="email-0"> <span className="required">* </span> Your E-Mail
              Address </label>
              <div className="comment">a confirmation email will be sent to you at this address</div>
            </div>
            <div className="am-element">
              <input onChange={onChangeHandler} type="text" size="30" name="email" id="email-0" defaultValue={email} placeholder="Your E-Mail Address" />
            </div>
          </div>
          <div className="am-row" id="row-qfauto-1">
            <div className="am-element-title"> <label htmlFor="qfauto-1"> Password </label> </div>
            <div className="am-element"> <a onClick={changePwordToggleHandler} className="local-link am-change-pass-toggle">Change</a>
            </div>
          </div>
          {

            pword_toggle && (<>
              <div className="am-row" id="row-_oldpass-0">
                <div className="am-element-title"> <label htmlFor="_oldpass-0"> Your Current Password </label>
                  <div className="comment">if you are changing password, please<br />
                    enter your current password for validation</div>
                </div>
                <div className="am-element">
                  <input onChange={onChangeHandler} type="password" autoComplete="current-password" spellCheck="false"
                    className="am-change-pass" name="current_password" id="_oldpass-0" placeholder="Your Current Password" />
                </div>
              </div>
              <div className="am-row" id="row-pass-0">
                <div className="am-element-title"> <label htmlFor="pass-0"> New Password </label>
                  <div className="comment">you can choose new password here or keep it unchanged<br />
                    must be 6 or more characters</div>
                </div>
                <div className="am-element"> <input onChange={onChangeHandler} type="password" autoComplete="new-password" spellCheck="false"
                  maxLength="32" className="am-change-pass" name="new_password" id="pass-0" placeholder="New Password" /> </div>
              </div>
              <div className="am-row" id="row-pass-confirm">
                <div className="am-element-title"> <label htmlFor="pass-confirm"> Confirm New Password </label> </div>
                <div className="am-element"> <input onChange={onChangeHandler} type="password" autoComplete="new-password" spellCheck="false"
                  className="am-change-pass" name="confirm_password" id="pass-confirm" placeholder="Confirm New Password" /> </div>
              </div>
            </>)
          }
          <div className="am-row" id="row-_submit_-0">
            <div className="am-element"> <input type="submit" defaultValue="Save Profile" className="am-cta-profile"
              name="_submit_" id="_submit_-0" /> </div>
          </div>
        </form>
      </div>
    </div>
  )
}
