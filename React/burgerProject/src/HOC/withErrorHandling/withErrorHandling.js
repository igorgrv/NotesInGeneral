import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandling = (WrappedComponent, axios) => {
  return (props) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
      axios.interceptors.request.use(null, (error) => {
        setResponse(null);
      });
      axios.interceptors.response.use(null, (error) => {
        setResponse(error);
      });
    });

    const errorHandling = () => {
      setResponse(null);
    };

    return (
      <Aux>
        <Modal show={response} modalClosed={errorHandling}>
          {response ? response.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandling;
