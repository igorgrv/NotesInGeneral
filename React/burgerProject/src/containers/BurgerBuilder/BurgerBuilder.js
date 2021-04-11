import React, { useState } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';

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
  const [purchasable, setPurchasable] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const addIngredientBuilder = (type) => {
    let oldIngredient = { ...ingredients };
    oldIngredient[type] += 1;
    setIngredient(oldIngredient);

    let oldTotalPrice = totalPrice;
    let ingredientPrice = INGREDIENT_PRICE[type];
    let newPrice = oldTotalPrice + ingredientPrice;
    setTotalPrice(newPrice);
    updatePurchasable(oldIngredient);
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
    updatePurchasable(oldIngredient);
  };

  let disabledLessButton = { ...ingredients };
  for (const key in disabledLessButton) {
    disabledLessButton[key] = disabledLessButton[key] <= 0;
  }

  const updatePurchasable = (ingredients) => {
    let sum = 0;
    Object.keys(ingredients).map((ingredient) => {
      return (sum += ingredients[ingredient]);
    });
    setPurchasable(sum <= 0);
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  };

  const orderNowHandler = () => {
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name: 'Igor',
        address: {
          street: 'Teststreet 1',
          zipCode: '32131',
          country: 'Brazil',
        },
        email: 'igorgrv@hotmail.com',
      },
      deliveryMethod: 'fastest',
    };

    setLoading(true);
    axios
      .post('/orders.json', order)
      .then((response) => {
        setLoading(false);
        setPurchasing(false);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        setPurchasing(false);
        console.log(error);
      });
  };

  let orderSummary = (
    <OrderSummary
      ingredients={ingredients}
      totalPrice={totalPrice}
      modalClosed={cancelPurchaseHandler}
      orderNow={orderNowHandler}
    />
  );
  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={cancelPurchaseHandler} loading={loading}>
        {orderSummary}
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        addIngredient={addIngredientBuilder}
        removeIngredient={removeIngredientBuilder}
        disableButton={disabledLessButton}
        totalPrice={totalPrice}
        disablePurchase={purchasable}
        orderNow={purchaseHandler}
      />
    </Aux>
  );
};

export default burgerBuilder;
