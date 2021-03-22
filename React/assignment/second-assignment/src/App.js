import { useState } from 'react';
import './App.css';

import Validation from './components/Validation'
import Char from './components/Char'

const App = () => {
  const [text, setText] = useState('')

  const changeText = (event) => {
    setText(event.target.value)
  }

  const deleteCharacters = (index) => {
    console.log('called')
    const textArray = [...text]
    textArray.splice(index, 1)
    setText(textArray)
  }

  const eachChar = [...text]
  eachChar.map( (char,index) => {
    return <Char character={char} click={() => deleteCharacters(index)} />
  })


  return (
    <div className="App">
      <input type="text" value={text} onChange={changeText}/>
      <p>{text.length}</p>
      <Validation length={text.length} />
      {eachChar}
    </div>
  );
}

export default App;
