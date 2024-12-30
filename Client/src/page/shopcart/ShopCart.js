import React from 'react'

const ShopCart = () => {
  return (
    <div className="am-body-content-content">
      <div className="am-form ">
        <form action="/secure/profile" id="profile" method="post"
          data-bricks="{&quot;name&quot;:{&quot;class&quot;:&quot;name&quot;},&quot;email&quot;:{&quot;class&quot;:&quot;email&quot;,&quot;do_not_allow_copy_paste&quot;:false},&quot;new-password&quot;:{&quot;class&quot;:&quot;new-password&quot;,&quot;do_not_allow_copy_paste&quot;:false}}"
          className="am-profile-form " noValidate="novalidate">
          <div className="am-row" id="row-name-0">
            <div className="am-element-title"> <label htmlFor="name-0"> <span className="required">* </span> First &amp; Last
              Name </label> </div>
            <div className="am-element group"> <input type="text" id="name_f" name="name_f" placeholder="First Name"
              defaultValue="rachid" /> <input type="text" id="name_l" name="name_l" placeholder="Last Name"
                defaultValue="hamza" /> </div>
          </div>
          <div className="am-row" id="row-email-0">
            <div className="am-element-title"> <label htmlFor="email-0"> <span className="required">* </span> Your E-Mail
              Address </label>
              <div className="comment">a confirmation email will be sent to you at this address</div>
            </div>
            <div className="am-element"> <input type="text" size="30" name="email" id="email-0"
              defaultValue="rachidelhamzaoui112345@gmail.com" placeholder="Your E-Mail Address" /> </div>
          </div>
          <div className="am-row" id="row-qfauto-1">
            <div className="am-element-title"> <label htmlFor="qfauto-1"> Password </label> </div>
            <div className="am-element"> <a href="#" className="local-link am-change-pass-toggle">Change</a>
            </div>
          </div>
          <div className="am-row" id="row-_oldpass-0" style={{ "display": "none" }}>
            <div className="am-element-title"> <label htmlFor="_oldpass-0"> Your Current Password </label>
              <div className="comment">if you are changing password, please<br />
                enter your current password for validation</div>
            </div>
            <div className="am-element"> <input type="password" autoComplete="current-password" spellCheck="false"
              className="am-change-pass" name="_oldpass" id="_oldpass-0" placeholder="Your Current Password" /> </div>
          </div>
          <div className="am-row" id="row-pass-0" style={{ "display": "none" }}>
            <div className="am-element-title"> <label htmlFor="pass-0"> New Password </label>
              <div className="comment">you can choose new password here or keep it unchanged<br />
                must be 6 or more characters</div>
            </div>
            <div className="am-element"> <input type="password" autoComplete="new-password" spellCheck="false"
              maxLength="32" className="am-change-pass" name="pass" id="pass-0" placeholder="New Password" /> </div>
          </div>
          <div className="am-row" id="row-pass-confirm" style={{ "display": "none" }}>
            <div className="am-element-title"> <label htmlFor="pass-confirm"> Confirm New Password </label> </div>
            <div className="am-element"> <input type="password" autoComplete="new-password" spellCheck="false"
              className="am-change-pass" name="_pass" id="pass-confirm" placeholder="Confirm New Password" /> </div>
          </div>
          <div className="am-row" id="row-_submit_-0">
            <div className="am-element"> <input type="submit" defaultValue="Save Profile" className="am-cta-profile"
              name="_submit_" id="_submit_-0" /> </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShopCart;
