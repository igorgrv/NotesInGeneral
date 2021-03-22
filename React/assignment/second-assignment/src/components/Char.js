import React from 'react';
import './char.css'

const char = (props) => {
  return (
    <div className="myClass" onClick={props.click}>
      <p>{props.character}</p>
    </div>
  )
}
export default char