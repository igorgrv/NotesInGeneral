import React, { useEffect } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../HOC/Aux';

const showIsEqual = (prevModal, nextModal) => prevModal.show === nextModal.show;

const modal = (props) => {
  useEffect(() => {
    console.log('[modal called');
  }, [props.show]);

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(modal, showIsEqual);
