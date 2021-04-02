import React, { useEffect, useState } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const burgerBuilder = () => {
  const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.3,
  };

  const [ingredients, setIngredient] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const [totalPrice, setTotalPrice] = useState(4);

  const addIngredientBuilder = (type) => {
    let oldIngredient = { ...ingredients };
    oldIngredient[type] += 1;
    setIngredient(oldIngredient);

    let oldTotalPrice = totalPrice;
    let ingredientPrice = INGREDIENT_PRICE[type];
    let newPrice = oldTotalPrice + ingredientPrice;
    setTotalPrice(newPrice);
  };

  const removeIngredientBuilder = (type) => {
    let oldIngredient = { ...ingredients };
    if (oldIngredient[type] <= 0) {
      return;
    }
    oldIngredient[type] -= 1;
    setIngredient(oldIngredient);

    let oldTotalPrice = totalPrice;
    let ingredientPrice = INGREDIENT_PRICE[type];
    let newPrice = oldTotalPrice - ingredientPrice;
    setTotalPrice(newPrice);
  };

  return (
    <Aux>
      <p>{totalPrice}</p>
      <Burger ingredients={ingredients} />
      <BuildControls addIngredient={addIngredientBuilder} removeIngredient={removeIngredientBuilder} />
    </Aux>
  );
};

export default burgerBuilder;
