import React from 'react'

export default function HelpDesk() {
  return (
    <div className="am-body-content-content">

      <div className="am-grid-wrap" id="grid-user">
        <h1 className="am-grid-title">Tickets <span className="am-grid-title-desc"><span
          className="am-grid-title-desc__total">no records</span></span></h1>
        <div className="am-norecord-actions">
          <a className="button" id="am-grid-wrap-ticket-button"
            href="/secure/helpdesk?_user_a=ticket&amp;_user_b=%2Fsecure%2Fhelpdesk">Submit New Ticket</a>
        </div>

      </div>
    </div>
  )
}
