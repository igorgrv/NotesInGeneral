import React, { useContext, useEffect, useRef } from 'react';
import './Person.css';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

const person = (props) => {
  const authContext = useContext(AuthContext);
  const focusInput = useRef(null);

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  return (
    <div className="Person">
      { authContext.authenticated ? <p>Authenticated</p> : <p>Please Log in</p> }

      <h1 onClick={props.click}>
        I'm {props.name} and I'm {props.age} years old
      </h1>
      <p>{props.children}</p>
      <input type="text" onChange={props.change} value={props.name} ref={focusInput} />
    </div>
  );
};

person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  change: PropTypes.func,
  age: PropTypes.number,
};

export default person;
