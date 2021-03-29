import React from 'react';
import Person from './Person/Person';

const Persons = (props) =>
  props.persons.map((person, index) => {
    return (
      <Person
        name={person.name}
        age={person.age}
        change={(event) => props.changed(event, person.id)}
        key={person.id}
        click={() => props.clicked(index)}
        isAuth={props.isAuthenticated}
      />
    );
  });

export default Persons;
