import React, { useEffect, Fragment, useRef } from 'react';
// import Aux from '../../HOC/Aux';

const Cockpit = (props) => {
  const toogleButton = useRef(null);

  useEffect(() => {
    toogleButton.current.click();
  }, []);

  return (
    <Fragment>
      <h1>Testing App.js</h1>
      <h3>{props.title}</h3>
      <button ref={toogleButton} style={props.inlineStyle} onClick={() => props.togglePerson()}>
        Toggle Person
      </button>
      <button style={props.inlineStyle} onClick={() => props.switchingName('Igorzinho')}>
        Switch names
      </button>
      <button style={props.inlineStyle} onClick={props.login}>Log in</button>
    </Fragment>
  );
};

export default Cockpit;
