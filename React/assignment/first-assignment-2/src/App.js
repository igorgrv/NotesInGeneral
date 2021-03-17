import React, { useState } from 'react';

import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

const App = () => {
  const [userNameState, setUserName] = useState({
    userName: 'IgorState',
  });

  const [ageState, setAge] = useState({
    age: '24',
  });

  const changeName = (event) => {
    setUserName({
      userName: event.target.value,
    });
  };

  const switchValue = (age) => {
    setUserName({
      userName: 'switchNameCalled',
    });
    setAge({
      age: '25',
    });
  };

  return (
    <div className="App">
      <button onClick={switchValue.bind(this, '25')}>SwitchName</button>
      <UserInput chagingName={changeName} userName={userNameState.userName} />
      <UserOutput userName={userNameState.userName} />
      <UserOutput userName={userNameState.userName}>{ageState.age} test</UserOutput>
    </div>
  );
};

export default App;
