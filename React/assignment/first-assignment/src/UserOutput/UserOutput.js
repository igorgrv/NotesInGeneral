import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>Usuário: {props.userName}</p>
      <p>Outro parágrafo</p>
    </div>
  );
};

export default userOutput;
