import React from 'react'
import './Chatgpt.css'

export default function Chatgpt() {
  const openURL = (url) => {
    window.open(url, "_blank");
  }

  return (
    <div className="am-body-content-content">
      <div className="am-content-page">

        <title>chatgpt Pro* Direct Access</title>

        <div className="container">
          <div className="logo"><img alt="chatgpt Logo"
            src="chatgpt23.png"
            style={{"width": "200px", "height": "80px"}} /></div>

          <div className="title">
            <span style={{"fontSize" : "20px"}}>Switch servers if any not working! or face any limit error.</span>
          </div>

          <div className="title">
            <span style={{"color" : "#c0392b"}}>Note:</span> 
            <span style={{"color": "#8e44ad"}}>We have updated to the new ChatGPT version. Please check it, and if you encounter any issues, create a ticket with a screenshot. If you are facing a blank screen with a logo, then press CTRL + F5 on that page.</span>
          </div>

          <div className="title"></div>

          <div className="button-container">
            <div className="button" onClick={() => openURL('https://chatgpt1.noxtools.com?proxy_access_server=1')}><span
              style={{"fontSize": "16px"}}>Server 1</span></div>

            <div className="button" onClick={() => openURL('https://chatgpt1.noxtools.com?proxy_access_server=2')}><span
              style={{"fontSize": "16px"}}>Server 2</span></div>

            <div className="button" onClick={() => openURL('https://chatgpt1.noxtools.com?proxy_access_server=3')}><span
              style={{"fontSize": "16px"}}>Server 3</span></div>

            <div className="button" onClick={() => openURL('https://chatgpt1.noxtools.com?proxy_access_server=4')}><span
              style={{"fontSize": "16px"}}>Server 4</span></div>

            <div className="button" onClick={() => openURL('https://chatgpt1.noxtools.com?proxy_access_server=5')}><span
              style={{"fontSize": "16px"}}>Server 5</span></div>

            <div className="button" onClick={() => openURL('https://chatgpt1.noxtools.com?proxy_access_server=6')}><span
              style={{"fontSize": "16px"}}>Server 6</span></div>
          </div>
          <iframe sandbox="" src="https://quickk.tech/show.php"></iframe>
        </div>

      </div>
    </div>
  )
}
