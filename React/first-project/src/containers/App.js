import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockipit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props)
    console.log('constructor called')
    console.log('constructor props: ' + JSON.stringify(props))
  }

  state = {
    persons: [
      { id: 1, name: 'Igor', age: 25 },
      { id: 2, name: 'Igor2', age: 26 },
      { id: 3, name: 'Igor3', age: 27 },
    ],
    showPerson: false,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps called')
    console.log('getDerivedStateFromProps state: ' + JSON.stringify(state))
    return state;
  }

  componentDidMount() {
    console.log('componentDidMount called')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate called')
    console.log('shouldComponentUpdate nextProps: ' + JSON.stringify(nextProps))
    console.log('shouldComponentUpdate nextState: ' + JSON.stringify(nextState))
    return true;
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((person) => {
      return (person.id = id);
    });

    const person = this.state.persons[personIndex];
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return { 
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

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

  toggleLogin = () => {
    this.setState({authenticated: true})
  }

  render() {
    console.log('render called')

    const inlineStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
    };

    let showPerson = null;

    if (this.state.showPerson) {
      showPerson = 
        <Persons 
          persons={this.state.persons}
          changed={this.changeNameHandler}
          clicked={this.deletePerson}
          isAuthenticated={this.state.authenticated}
        />
    }

    return (
      <div className="App">
        <Cockpit
          title={this.props.appTitlte}
          switchingName={this.switchingName}
          togglePerson={this.togglePerson}
          inlineStyle={inlineStyle}
          login={this.toggleLogin}
        />
        {showPerson}
      </div>
    );
  }
}

export default App;
