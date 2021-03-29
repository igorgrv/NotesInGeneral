import React, { useEffect, Fragment } from 'react';
// import Aux from '../../HOC/Aux';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('Executado para todo lifeCycle');
  }, []);

  return (
    <Fragment>
      <h1>Testing App.js</h1>
      <h3>{props.title}</h3>
      <button style={props.inlineStyle} onClick={() => props.togglePerson()}>
        Toggle Person
      </button>
      <button style={props.inlineStyle} onClick={() => props.switchingName('Igorzinho')}>
        Switch names
      </button>
    </Fragment>
  );
};

export default Cockpit;
