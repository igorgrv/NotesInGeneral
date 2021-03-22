import React, { useState } from 'react';

import HomeForm from './components/form/HomeForm';

const Home = () => {
  const [userNameState, setUserName] = useState({
    userName: 'Igor',
  });

  const [showUser, setShowUser] = useState(true);

  const switchName = (event) => {
    setUserName({
      userName: event.target.value,
    });
  };

  const toggleUser = () => {
    setShowUser(!showUser)
  }

  return (
    <>
      <h1>Home</h1>
      <br />
      <HomeForm 
        userName={userNameState.userName} 
        change={switchName}
        showUser={showUser}
        toggleUser={toggleUser}
      >
        My content inside props.children
      </HomeForm>
    </>
  );
};

export default Home;
