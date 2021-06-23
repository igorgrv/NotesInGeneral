import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/welcome" activeClassName={classes.active}>
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName={classes.active}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
