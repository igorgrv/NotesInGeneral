import React, { useState } from 'react';
import Validation from '../Validation/Validation';
import Char from '../Char/Char';

const LandingPage = () => {
  const [textEntered, setTextEntered] = useState('');

  const listenForChanges = (event) => {
    setTextEntered(event.target.value);
  };

  const removeCharacter = (index) => {
    const text = [...textEntered];
    text.splice(index, 1);
    const updatedText = text.join('')
    setTextEntered(updatedText)
  };

  let character = textEntered.split('').map((character, index) => {
    return <Char character={character} key={index} click={() => removeCharacter(index)} />;
  });

  return (
    <>
      <input type="text" onChange={(event) => listenForChanges(event)} value={textEntered}/>
      <p>{textEntered.length}</p>
      <Validation length={textEntered.length} />
      {character}
    </>
  );
};

export default LandingPage;
