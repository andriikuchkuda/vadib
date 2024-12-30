import React from 'react'
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  return (
    <div className="am-body-content-content">
      <div className="am-sendpass-form-wrapper">
        <div className="am-form am-auth-form am-sendpass-form">
          <form name="sendpass" method="post" action="/secure/sendpass" className="am-sendpass-form-form"
            data-options="{&quot;show_recaptcha&quot;:false,&quot;recaptcha_key&quot;:&quot;6LcpsI4qAAAAAPpSfYSvdihfpbK6BSV3hAqk_QjV&quot;,&quot;recaptcha_theme&quot;:&quot;light&quot;,&quot;recaptcha_size&quot;:&quot;normal&quot;,&quot;recaptcha_hl&quot;:&quot;en_US&quot;}">
            <fieldset>
              <legend>Lost password?</legend>
              <div className="am-row am-row-wide am-row-sendpass-notice">
                <div className="am-element">
                  Enter either your email address or username and we will send you a link to reset your password.
                </div>
              </div>
              <div className="am-row am-row-sendpass-email">
                <div className="am-element-title">
                  <label htmlFor="sendpass">Username/Email</label>
                </div>
                <div className="am-element"><input type="text" name="login" id="sendpass" size="15"
                  placeholder="Username/Email" autoComplete="username" /></div>
              </div>
              <div className="am-row am-row-buttons">
                <div className="am-element">
                  <input type="submit" value="Reset Password" />
                  <span className="am-form-login-switch-wrapper"><Link to="/signin"
                    className="local-link am-form-login-switch">Log In</Link></span>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="am-signup-link">Not registered yet?
        <Link to="/signup">Signup here</Link>
      </div>
    </div>
  )
}

export default ForgotPass;