import React from 'react';

import ContentHeader from './ContentHeader';

const Content = (props) => {

  return (
    <div className="am-body">
      <div className="am-body-content-wrapper am-main">
        <div className="am-body-content">
          
          <ContentHeader/>

          {props.children}
        </div>
        <div id="am-flash" className="am-flash">
          <div className="am-flash-mask"></div>
          <div className="am-flash-content"></div>
        </div>
      </div>
    </div>
  )
}

export default Content;
