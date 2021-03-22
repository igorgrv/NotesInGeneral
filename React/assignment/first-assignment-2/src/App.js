import React, { useState } from 'react';

import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

const App = () => {
  const [userName, setUserName] = useState('IgorState');

  const [age, setAge] = useState('24');

  const changeName = (event) => {
    setUserName(event.target.value);
  };

  const switchValue = (age) => {
    setUserName('switchNameCalled');
    setAge('25');
  };

  return (
    <div className="App">
      <button onClick={switchValue.bind(this, '25')}>SwitchName</button>
      <UserInput chagingName={changeName} userName={userName} />
      <UserOutput userName={userName} />
      <UserOutput userName={userName}>{age} test</UserOutput>
    </div>
  );
};

export default App;