import { Fragment } from 'react';
import classes from './Header.module.css';
import meals from '../../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton/HeaderCartButton';

const Header = (props) => {
  return <Fragment>
    <header className={classes.header}>
      <h1>IgorFood</h1>
      <HeaderCartButton onClick={props.showCartClick} />
    </header>
    <div className={classes['main-image']}>
      <img src={meals} alt="Meals background"/>
    </div>
  </Fragment>
}

export default Header;