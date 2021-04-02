import React from 'react';
import classes from './BuildControls.css';
import BuildControls from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((control) => (
        <BuildControls
          label={control.label}
          key={control.label}
          addIngredientControls={() => props.addIngredient(control.type)}
          removeIngredientControls={() => props.removeIngredient(control.type)}
        />
      ))}
    </div>
  );
};

export default buildControls;
