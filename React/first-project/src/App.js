import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Igor', age: 25 },
      { name: 'Igor2', age: 26 },
      { name: 'Igor3', age: 27 },
    ],
    showPerson: false,
  };

  switchingName = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: 'Igor5', age: 26 },
        { name: 'Igor6', age: 27 },
      ],
    });
  };

  changeNameHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 25 },
        { name: 'Igor5', age: 26 },
        { name: 'Igor6', age: 27 },
      ],
    });
  };

  togglePerson = () => {
    const doesShow = this.state.showPerson;
    this.setState({
      showPerson: !doesShow,
    });
  };

  render() {
    const inlineStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
    };

    let showPerson = null;

    if (this.state.showPerson) {
      showPerson = (
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
            click={this.switchingName.bind(this, 'IgorzinhoChildren')}
            change={this.changeNameHandler}
          >
            Testing child elemenet
          </Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Testing App.js</h1>
        <button style={inlineStyle} onClick={this.togglePerson}>
          Toggle Person
        </button>
        <button style={inlineStyle} onClick={this.switchingName.bind(this, 'Igorzinho')}>
          Switch names
        </button>
        
        {showPerson}
      </div>
    );
  }
}

export default App;
