import React, { useState } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls';

const burgerBuilder = () => {
  const [ingredientsState] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  })

  return (
    <Aux>
      <Burger ingredients={ingredientsState}/>
      <BuildControls />
    </Aux>
  )
}

export default burgerBuilder;