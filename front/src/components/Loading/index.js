import React from 'react';

import './style.scss';

const Loading = () => (
  <>
  <div className='body'>
    <span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </span>
    <div className='base'>
      <span></span>
      <div className='face'></div>
    </div>
  </div>
  {/* <div className='longfazers'>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div> */}
  <h1 className="title">Chargement...</h1>
  </>
);

export default Loading;
