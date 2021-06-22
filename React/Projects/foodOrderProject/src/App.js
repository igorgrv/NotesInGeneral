import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './state/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart hideCartClick={hideCartHandler} />}
      <Header showCartClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
