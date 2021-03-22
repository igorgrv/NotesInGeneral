import React from 'react';

const validation = (props) => {
  let lengthCondition = 'Text long enough';
  if (props.length <= 5) {
    lengthCondition = 'Text too short';
  }

  return (
    <div>
      <p>{lengthCondition}</p>
    </div>
  );
};

export default validation;
