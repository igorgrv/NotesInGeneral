import React from 'react';

const Validation = (props) => {
  let lengthMessage = 'Text too short'
  if (props.length > 5) {
    lengthMessage = 'Text long enough'
  } 

  return <p>{lengthMessage}</p>
}

export default Validation;