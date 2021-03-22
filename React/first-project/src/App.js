import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Igor', age: 25 },
      { id: 2, name: 'Igor2', age: 26 },
      { id: 3, name: 'Igor3', age: 27 },
    ],
    showPerson: false,
  };

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((person) => {
      return (person.id = id);
    });

    const person = this.state.persons[personIndex];
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
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

  deletePerson = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
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
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                change={(event) => this.changeNameHandler(event, person.id)}
                key={person.id}
                click={() => this.deletePerson(index)}
              />
            );
          })}
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
