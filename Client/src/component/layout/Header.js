import React from 'react'

export default function Header() {
  return (
    <>
      <div className="am-header">
        <div className="am-header-content-wrapper am-main">
          <div className="am-header-content">
            <div className="am-header-logo-wrapper">
              <a href="/secure">
                <img style={{"width" : "141px", "height" : "26px"}} className="am-header-content-logo" src="/assets/logo.png"
                  alt="NoxTools" />
              </a>
            </div>
            <div className="am-header-content-content">
            </div>
          </div>
        </div>
      </div>
      <div className="am-header-line">

      </div>
    </>
  )
}
