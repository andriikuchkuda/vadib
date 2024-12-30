import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { profile, setToken, setProfile} = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    setToken(false);
    setProfile({});
  }

  return (
    <div className="am-body-content-content">
      <div className="am-layout-two-coll">
        <div className="am-layout-two-coll-top"></div>
        <div className="am-coll-left">
          <div className="am-coll-content">
            <div className="am-widget" id="widget-member-main-subscriptions">
              <h2 id="member-main-subscriptions-head">Active Subscriptions</h2>
              { profile.transaction ?
                (<div className="am-block" id="member-main-subscriptions">
                  <ul id="member-subscriptions" className="am-widget-list am-list-subscriptions">
                    <li data-search-target="subscription" data-title="chatgpt plus" id="product-item-87">
                      <span className="am-list-subscriptions-title">
                        <strong>ChatGPT Plus</strong>
                      </span><span className="am-list-subscriptions-date">
                        <span className="am-list-subscriptions-date_expires">expires <span
                          className="am-list-subscriptions-date_expires_date" data-date="2025-01-13">13 Jan
                          2025</span></span>
                      </span><span className="am-list-subscriptions-link">
                      </span>
                      <div className="am-list-subscriptions-desc"></div>
                    </li>
                  </ul>
                  <div className="cancel-subscription-popup" data-popup-title="Cancel Subscription"
                    style={{ "display": "none" }}>
                    <div className="cancel-subscription-popup-text">
                      Do you really want to cancel subscription?</div>
                    <div className="cancel-subscription-buttons">
                      <input type="button" id="cancel-subscription-yes" value="Yes, I want to cancel subscription"
                        className="am-cta-cancel" />
                      <a className="am-popup-close local-link" id="cancel-subscription-no">No,
                        please keep me subscribed</a>
                    </div>
                  </div>
                </div>) :
                  (<div className="am-block" id="member-main-subscriptions"><div className="member-subscriptions-no">
                    <h3>You have no active subscriptions</h3>
                    <p>Please use <Link to="/signup">Add/Renew subscription</Link> form to order or renew subscription.</p>
                  </div>
                    <div className="cancel-subscription-popup" data-popup-title="Cancel Subscription" style={{"display":"none"}}>
                      <div className="cancel-subscription-popup-text">
                        Do you really want to cancel subscription?</div>
                      <div className="cancel-subscription-buttons">
                        <input type="button" id="cancel-subscription-yes" value="Yes, I want to cancel subscription" className="am-cta-cancel" />
                          <a className="am-popup-close local-link" id="cancel-subscription-no">No, please keep me subscribed</a>
                      </div></div>
                  </div>
                  )
              }
            </div>
            {profile.transaction && (<div className="am-widget" id="widget-member-main-resources">
              <h2 id="member-main-resources-head">Active Resources</h2>
              <div className="am-block" id="member-main-resources">
                <ul id="member-resources" className="am-widget-list am-list-resources">
                  <li data-search-target="resources-link" data-title="chatgpt new"
                    id="resource-link-page-152-wrapper">
                    <Link to="/chatgpt"
                      className="am-resource-page" id="resource-link-page-152" title="ChatGPT NEW">ChatGPT NEW</Link>
                    <div className="am-list-resources-desc">ChatGpt by NoxTools</div>
                  </li>
                  <li data-search-target="resources-link" data-title="you ai" id="resource-link-page-167-wrapper">
                    <a href="/secure/page/youai" className="am-resource-page" id="resource-link-page-167"
                      title="You Ai">You Ai</a>
                    <div className="am-list-resources-desc">Youai by NoxTools</div>
                  </li>
                </ul>
              </div>
            </div>)}
          </div>
        </div>
        <div className="am-coll-right">
          <div className="am-coll-content">
            <div className="am-widget" id="widget-member-main-links">
              <h2 id="member-main-links-head">Useful Links</h2>
              <div className="am-block" id="member-main-links">
                <ul className="am-widget-list am-list-links">
                  <li>
                    <a onClick={logoutHandler}>Logout</a>
                  </li>
                  <li>
                    <Link to="/profile">Change Password/Edit Profile</Link>
                  </li>
                  <li>
                    <a href="/secure/member/payment-history">Payments History</a>
                  </li>
                  <li>
                    <a href="/secure/aff/aff/enable-aff">Advertise our website to your friends and earn money</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="am-layout-two-coll-bottom"></div>
      </div>
    </div>
  )
}

export default Dashboard;
