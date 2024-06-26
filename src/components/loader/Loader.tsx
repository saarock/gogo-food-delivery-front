import React from 'react'
import { Commet, LifeLine } from 'react-loading-indicators';
import "./loader.css"

const Loader = () => {
  return (
    <div className='gogo-loader-container'>
  <Commet color="#ff6347" size="medium" text="" textColor="" />
    </div>
  )
}

export default React.memo(Loader)