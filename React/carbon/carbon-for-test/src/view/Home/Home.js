import React, { useState } from 'react';

import HomeForm from './components/form/HomeForm';

const Home = () => {
  const [userNameState, setUserName] = useState({
    userName: 'IgorUseState',
  });

  const switchName = (event) => {
    setUserName({
      userName: event.target.value,
    });
  };

  return (
    <>
      <h1>Home</h1>
      <br />
      <HomeForm userName={userNameState.userName} change={switchName}>
        My content inside props.children
      </HomeForm>
    </>
  );
};

export default Home;
