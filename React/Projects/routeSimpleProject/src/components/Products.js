import { NavLink } from 'react-router-dom';

const Products = () => {
  return (
    <div>
      <h1>Product page</h1>
      <ul>
        <li>
          <NavLink to="/products/1">Product 1</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Products;
