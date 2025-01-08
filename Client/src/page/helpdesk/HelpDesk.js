import React, { useState } from 'react'

const HelpDesk = () => {
  const [ticketState, setTicketState] = useState(true);

  return (
    <div className="am-body-content-content">

      {ticketState ? (<div className="am-grid-wrap" id="grid-user">
        <h1 className="am-grid-title">Tickets <span className="am-grid-title-desc"><span
          className="am-grid-title-desc__total">no records</span></span></h1>
        <div className="am-norecord-actions">
          <a onClick={() => setTicketState(false)} className="button" id="am-grid-wrap-ticket-button">Submit New Ticket</a>
        </div>

      </div>) :
        (
          <div className="am-grid-wrap" id="grid-user">
            <h1><span className="am-grid-back-wrapper"><a onClick={() => setTicketState(true)} className="am-grid-back"
              title="return"></a></span> <span className="am-grid-title-text">Submit New Ticket</span></h1>
            <div className="am-form ">
              <form id="Am_Form" method="post" className="am-helpdesk-form" noValidate="novalidate">
                <div className="am-row am-row-wide" id="row-subject-0">
                  <div className="am-element-title"> <label htmlFor="subject-0"> <span className="required">* </span> Subject
                  </label> </div>
                  <div className="am-element"> <input type="text" className="am-row-wide am-el-wide" name="subject" id="subject-0" placeholder="Subject" /> </div>
                </div>
                <div className="am-row am-row-wide" id="row-am-helpdesk-msg-area">
                  <div className="am-element-title"> <label htmlFor="am-helpdesk-msg-area"> <span className="required">* </span>
                    Message </label> </div>
                  <div className="am-element"> <textarea id="am-helpdesk-msg-area" className="am-row-wide am-el-wide" rows="12"
                    name="content"></textarea> </div>
                </div>
                <div className="am-row" id="row-qfauto-0">
                  <div className="am-element"> <a className="local am-helpdesk-attachment-expand">Add Attachments</a> </div>
                </div>
                <div className="am-row" id="row-attachments-0">
                  <div className="am-element-title"> <label htmlFor="attachments-0"> Attachments </label> </div>
                  <div className="am-element"><input type="hidden" value="-1" name="attachments[]" />
                    <div className="upload-control">
                      <div className="upload-control-upload upload-control-upload-single"
                        style={{ "display": "inline-block", "overflow": "hidden", "float": "left" }}><span>upload</span></div>
                    </div>
                      <input type="text" multiple="1" className="custom-attachments-0" data-prefix="helpdesk-attachment"
                      data-secure="1" data-info="[]" data-error="[]" name="attachments[]" id="attachments-0"
                      placeholder="Attachments" disabled="disabled" style={{ "display": "none" }} />
                      <input type="text" name="_attachments" style={{ "opacity": "0", "width": "0px", "height": "0px", "padding": "0px", "visibility": "hidden" }} />
                  </div>
                </div>
                <div className="am-row" id="row-save-0">
                  <div className="am-element"> <input type="submit" value="Submit Ticket" name="save" id="save-0" /> </div>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default HelpDesk;